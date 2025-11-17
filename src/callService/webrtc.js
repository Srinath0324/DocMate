import {
  RTCPeerConnection,
  RTCSessionDescription,
  RTCIceCandidate,
  mediaDevices,
} from 'react-native-webrtc';
import * as FirebaseService from './firebase';

export default class WebRTCService {
  constructor(meetingId, localParticipantId) {
    this.meetingId = meetingId;
    this.localParticipantId = localParticipantId;
    this.peerConnections = {};
    this.localStream = null;
    this.onRemoteStreamUpdate = null;
    this.unsubscribeSignaling = null;
    this.facingMode = 'user'; // Track current camera facing mode
    
    // Use public STUN servers
    this.configuration = { 
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' },
        { urls: 'stun:stun2.l.google.com:19302' },
        { urls: 'stun:stun3.l.google.com:19302' },
        { urls: 'stun:stun4.l.google.com:19302' },
      ] 
    };
    
    // Queue for ICE candidates received before remote description is set
    this.pendingIceCandidates = {};
    
    console.log('WebRTC service created for meeting:', meetingId, 'participant:', localParticipantId);
  }

  async setupLocalStream(useVideo = true) {
    try {
      // Ensure any previous streams are cleaned up first
      if (this.localStream) {
        console.log('Cleaning up previous stream before creating a new one');
        this.stopLocalTracks();
      }
      
      // Request permissions first
      const mediaConstraints = {
        audio: true,
        video: useVideo ? {
          facingMode: this.facingMode,
          width: { min: 640, ideal: 1280, max: 1920 },
          height: { min: 480, ideal: 720, max: 1080 }
        } : false,
      };
      
      console.log('Getting user media with constraints:', mediaConstraints);
      const stream = await mediaDevices.getUserMedia(mediaConstraints);
      console.log('Stream obtained successfully:', 
        stream.getTracks().map(t => `${t.kind}: ${t.id}, enabled: ${t.enabled}`));
      
      this.localStream = stream;
      return stream;
    } catch (error) {
      console.error('Error accessing media devices:', error);
      throw error;
    }
  }

  stopLocalTracks() {
    if (!this.localStream) return;
    
    console.log('Stopping all local tracks');
    try {
      const tracks = this.localStream.getTracks();
      tracks.forEach(track => {
        console.log(`Stopping ${track.kind} track: ${track.id}`);
        track.stop();
        this.localStream.removeTrack(track);
      });
    } catch (error) {
      console.error('Error stopping local tracks:', error);
    }
  }

  async switchCamera() {
    if (!this.localStream) {
      console.log('No local stream available for camera switch');
      return null;
    }

    const videoTrack = this.localStream.getVideoTracks()[0];
    if (!videoTrack) {
      console.log('No video track available for camera switch');
      return null;
    }

    try {
      // First attempt with standard method
      if (typeof videoTrack.switchCamera === 'function') {
        console.log('Using standard switchCamera method');
        videoTrack.switchCamera();
        return this.localStream;
      } 
      // Fallback for older API versions
      else if (typeof videoTrack._switchCamera === 'function') {
        console.log('Using legacy _switchCamera method');
        videoTrack._switchCamera();
        return this.localStream;
      } 
      else {
        throw new Error('No switchCamera method available on video track');
      }
    } catch (error) {
      console.error('Failed to switch camera:', error);
      return null;
    }
  }

  toggleMute(shouldMute) {
    if (!this.localStream) {
      console.log('No local stream available for audio toggle');
      return false;
    }
    
    const audioTracks = this.localStream.getAudioTracks();
    if (audioTracks.length === 0) {
      console.log('No audio tracks available for muting');
      return false;
    }
    
    console.log(`Setting audio enabled to: ${!shouldMute}`);
    
    // Apply to all audio tracks
    audioTracks.forEach(track => {
      track.enabled = !shouldMute;
      console.log(`Audio track ${track.id} enabled: ${track.enabled}`);
    });
    
    // Return the current state
    return shouldMute;
  }

  async initiateCall(remoteParticipantId) {
    try {
      console.log(`Initiating call to ${remoteParticipantId}`);
      
      // Check if we're already negotiating with this peer
      if (this.peerConnections[remoteParticipantId]) {
        const connectionState = this.peerConnections[remoteParticipantId].connectionState;
        const signalingState = this.peerConnections[remoteParticipantId].signalingState;
        
        console.log(`Existing connection found in state: ${connectionState}, signaling: ${signalingState}`);
        
        // If already connected or connecting, don't create a new offer
        if (connectionState === 'connected' || 
            signalingState === 'have-local-offer' || 
            signalingState === 'have-remote-offer') {
          console.log('Connection already in progress or established, skipping new offer');
          return;
        }
      }
      
      // To prevent both peers from creating offers simultaneously,
      // only the peer with the "smaller" ID will initiate
      if (this.localParticipantId < remoteParticipantId) {
        console.log('This peer has the smaller ID, creating offer');
        const pc = await this.createPeerConnection(remoteParticipantId);
        
        // Create an offer
        const offer = await pc.createOffer({
          offerToReceiveAudio: true,
          offerToReceiveVideo: true
        });
        await pc.setLocalDescription(offer);
        
        // Send the offer to the remote peer
        await FirebaseService.sendSignalingData(
          this.meetingId,
          this.localParticipantId,
          remoteParticipantId,
          { type: 'offer', sdp: offer }
        );
      } else {
        console.log('Remote peer has smaller ID, waiting for their offer');
        // Still create the connection but don't send an offer
        await this.createPeerConnection(remoteParticipantId);
      }
    } catch (error) {
      console.error('Error initiating call:', error);
    }
  }

  async handleSignalingData(senderId, data) {
    try {
      // Check if data is defined before accessing properties
      if (!data) {
        console.warn(`Received undefined signaling data from ${senderId}`);
        return;
      }

      console.log(`Handling signaling data from ${senderId}:`, data.type || 'unknown type');
      
      let pc = this.peerConnections[senderId];
      
      if (!pc) {
        console.log(`Creating new peer connection for ${senderId}`);
        pc = await this.createPeerConnection(senderId);
      }
      
      if (!data.type) {
        console.warn(`Signaling data from ${senderId} has no type, ignoring`);
        return;
      }
      
      if (data.type === 'offer') {
        console.log(`Processing offer from ${senderId}`);
        
        // If we're already negotiating, check the state
        if (pc.signalingState !== 'stable') {
          console.log(`Connection not stable (${pc.signalingState}), applying rollback`);
          try {
            await pc.setLocalDescription({type: "rollback"});
          } catch (e) {
            console.warn("Rollback failed:", e);
          }
        }
        
        await pc.setRemoteDescription(new RTCSessionDescription(data.sdp));
        console.log('Remote description set successfully, creating answer');
        
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        
        console.log('Sending answer to', senderId);
        await FirebaseService.sendSignalingData(
          this.meetingId,
          this.localParticipantId,
          senderId,
          { type: 'answer', sdp: answer }
        );
        
        // Process any pending ICE candidates now that remote description is set
        await this.processPendingIceCandidates(senderId);
        
      } else if (data.type === 'answer') {
        console.log(`Processing answer from ${senderId}`);
        
        await pc.setRemoteDescription(new RTCSessionDescription(data.sdp));
        console.log('Remote description set successfully from answer');
        
        // Process any pending ICE candidates now that remote description is set
        await this.processPendingIceCandidates(senderId);
        
      } else if (data.type === 'ice-candidate') {
        console.log(`Received ICE candidate from ${senderId}`);
        
        if (pc.remoteDescription && pc.remoteDescription.type) {
          console.log('Remote description is set, adding ICE candidate immediately');
          await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
        } else {
          console.log('Remote description not yet set, queuing ICE candidate');
          // Queue the ICE candidate to be added once remote description is set
          if (!this.pendingIceCandidates[senderId]) {
            this.pendingIceCandidates[senderId] = [];
          }
          this.pendingIceCandidates[senderId].push(data.candidate);
        }
      } else {
        console.warn(`Unknown signaling data type: ${data.type}`);
      }
      
    } catch (error) {
      console.error('Error handling signaling data:', error);
    }
  }

  async processPendingIceCandidates(peerId) {
    const pc = this.peerConnections[peerId];
    const candidates = this.pendingIceCandidates[peerId] || [];
    
    if (candidates.length > 0 && pc && pc.remoteDescription && pc.remoteDescription.type) {
      console.log(`Processing ${candidates.length} pending ICE candidates for ${peerId}`);
      
      try {
        for (const candidate of candidates) {
          await pc.addIceCandidate(new RTCIceCandidate(candidate));
        }
        // Clear processed candidates
        this.pendingIceCandidates[peerId] = [];
      } catch (err) {
        console.error('Error processing pending ICE candidates:', err);
      }
    }
  }
  
  async createPeerConnection(remoteParticipantId) {
    // Check if we already have a connection and return it if it exists
    if (this.peerConnections[remoteParticipantId]) {
      console.log(`Reusing existing peer connection for ${remoteParticipantId}`);
      return this.peerConnections[remoteParticipantId];
    }
    
    console.log(`Creating new peer connection for remote: ${remoteParticipantId}`);
    const peerConnection = new RTCPeerConnection(this.configuration);
    
    // Add local tracks to the peer connection
    if (this.localStream) {
      console.log(`Adding ${this.localStream.getTracks().length} tracks to peer connection`);
      this.localStream.getTracks().forEach(track => {
        peerConnection.addTrack(track, this.localStream);
      });
    } else {
      console.warn('No local stream available when creating peer connection');
    }

    // Add peer connection state monitoring
    peerConnection.onsignalingstatechange = () => {
      console.log(`Signaling state changed: ${peerConnection.signalingState}`);
    };

    peerConnection.oniceconnectionstatechange = () => {
      console.log(`ICE connection state: ${peerConnection.iceConnectionState}`);
      
      // If connection fails, try to restart ICE
      if (peerConnection.iceConnectionState === 'failed') {
        console.log('ICE connection failed, attempting to restart');
        peerConnection.restartIce();
      }
    };

    // Handle ICE candidates
    peerConnection.onicecandidate = ({ candidate }) => {
      if (candidate) {
        console.log('ICE candidate generated, sending to remote peer');
        FirebaseService.sendSignalingData(
          this.meetingId,
          this.localParticipantId,
          remoteParticipantId,
          { type: 'ice-candidate', candidate }
        );
      }
    };

    // Handle remote tracks
    peerConnection.ontrack = (event) => {
      console.log(`Remote track received from ${remoteParticipantId}:`, 
        event.streams[0]?.getTracks().map(t => `${t.kind}:${t.enabled}`));
      
      if (event.streams && event.streams[0]) {
        if (this.onRemoteStreamUpdate) {
          console.log(`Updating remote stream for ${remoteParticipantId}`);
          this.onRemoteStreamUpdate(remoteParticipantId, event.streams[0]);
        }
      }
    };
    
    // Save the connection
    this.peerConnections[remoteParticipantId] = peerConnection;
    return peerConnection;
  }

  startSignaling() {
    console.log(`Setting up signaling for participant ${this.localParticipantId}`);
    this.unsubscribeSignaling = FirebaseService.listenToSignalingData(
      this.meetingId,
      this.localParticipantId,
      (messageData) => {
        // Validate the message data before processing
        if (!messageData) {
          console.warn('Received empty signaling message');
          return;
        }
        
        if (!messageData.senderId || !messageData.data) {
          console.warn('Received malformed signaling message:', messageData);
          return;
        }
        
        console.log(`Received valid signaling message from ${messageData.senderId}`);
        // Process the message
        this.handleSignalingData(messageData.senderId, messageData.data);
      }
    );
  }
  
  cleanUp() {
    console.log('=== WEBRTC CLEANUP STARTED ===');
    
    // Stop local stream
    this.stopLocalTracks();
    this.localStream = null;
    
    // Close all peer connections
    Object.entries(this.peerConnections).forEach(([peerId, pc]) => {
      console.log(`Closing peer connection with: ${peerId}`);
      try {
        if (pc) {
          // Remove all event listeners
          pc.onicecandidate = null;
          pc.ontrack = null;
          pc.onconnectionstatechange = null;
          pc.oniceconnectionstatechange = null;
          pc.onsignalingstatechange = null;
          
          // Close the connection
          pc.close();
        }
      } catch (error) {
        console.error(`Error closing peer connection with ${peerId}:`, error);
      }
    });
    
    // Clear peer connections
    this.peerConnections = {};
    
    // Unsubscribe from signaling
    if (this.unsubscribeSignaling) {
      console.log('Unsubscribing from signaling');
      try {
        this.unsubscribeSignaling();
        this.unsubscribeSignaling = null;
      } catch (error) {
        console.error('Error unsubscribing from signaling:', error);
      }
    }
    
    console.log('=== WEBRTC CLEANUP COMPLETED ===');
  }
}
