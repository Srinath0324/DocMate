import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Alert, PermissionsAndroid, Platform, AppState, Text } from 'react-native';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import VideoGrid from '../../../components/VideoGrid';
import MeetingControls from '../../../components/MeetingControls';
import WebRTCService from '../../../callService/webrtc';
import * as FirebaseService from '../../../callService/firebase';

const requestPermissions = async () => {
  if (Platform.OS === 'android') {
    try {
      const cameraGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Camera Permission",
          message: "This app needs access to your camera for meetings",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      
      const audioGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: "Microphone Permission",
          message: "This app needs access to your microphone for meetings",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      
      return (
        cameraGranted === PermissionsAndroid.RESULTS.GRANTED &&
        audioGranted === PermissionsAndroid.RESULTS.GRANTED
      );
    } catch (err) {
      console.warn(err);
      return false;
    }
  } else {
    return true;
  }
};

const MeetingScreen = ({ route, navigation }) => {
  const { meetingId, displayName, isNewMeeting } = route.params;
  
  const [localParticipantId] = useState(uuidv4());
  const [participants, setParticipants] = useState({});
  const [streams, setStreams] = useState({});
  const [isMuted, setIsMuted] = useState(false);
  const [webrtcService, setWebrtcService] = useState(null);
  const [unsubscribeParticipants, setUnsubscribeParticipants] = useState(null);
  const [isServiceReady, setIsServiceReady] = useState(false); 
  
  const serviceInitialized = useRef(false);
  
  const appStateRef = useRef(AppState.currentState);

  useEffect(() => {
    const setupMeeting = async () => {
      try {
        console.log('Setting up meeting:', meetingId);
        
        const permissionsGranted = await requestPermissions();
        if (!permissionsGranted) {
          Alert.alert(
            'Permission Error', 
            'Camera and microphone permissions are required for meetings'
          );
          navigation.goBack();
          return;
        }
        
        const service = new WebRTCService(meetingId, localParticipantId);
        
        console.log('Setting up local stream');
        const localStream = await service.setupLocalStream();
        
        console.log('Local stream created:', localStream.id);
        console.log('Local stream tracks:', localStream.getTracks().map(t => `${t.kind}: enabled=${t.enabled}`));
        
        setStreams(prev => {
          console.log('Setting local stream in state');
          return { ...prev, [localParticipantId]: localStream };
        });
        
        setParticipants(prev => ({
          ...prev,
          [localParticipantId]: { displayName, isMuted: false }
        }));
        
        service.onRemoteStreamUpdate = (participantId, stream) => {
          console.log(`Received remote stream from ${participantId} with ${stream.getTracks().length} tracks`);
          stream.getTracks().forEach(track => {
            console.log(`  - Track ${track.id}: kind=${track.kind}, enabled=${track.enabled}, readyState=${track.readyState}`);
          });
          
          setStreams(prev => {
            const updatedStreams = { ...prev, [participantId]: stream };
            console.log(`Updated streams state, now have streams for: ${Object.keys(updatedStreams).join(', ')}`);
            return updatedStreams;
          });
        };
        
        if (isNewMeeting) {
          console.log('Creating new meeting:', meetingId);
          await FirebaseService.createMeeting(meetingId);
        } else {
          console.log('Joining existing meeting:', meetingId);
        }
        
        await FirebaseService.joinMeeting(meetingId, localParticipantId, { 
          displayName,
          isMuted: false,
        });
        
        console.log('Setting up participants listener');
        const unsubscribe = FirebaseService.listenToParticipants(meetingId, (participantsData) => {
          console.log('Participants update:', Object.keys(participantsData || {}));
          
          setParticipants(participantsData || {});
          
          const remotePeers = Object.keys(participantsData || {})
            .filter(id => id !== localParticipantId);
            
          console.log('Remote peers to connect with:', remotePeers);
          
          remotePeers.forEach((participantId, index) => {
            setTimeout(() => {
              console.log(`Initiating call to participant: ${participantId}`);
              if (service) {
                service.initiateCall(participantId);
              }
            }, index * 500); 
          });
        });
        
        console.log('Starting signaling service');
        service.startSignaling();
        
        setWebrtcService(service);
        setIsServiceReady(true); 
        serviceInitialized.current = true; 
        setUnsubscribeParticipants(() => unsubscribe);
        
      } catch (error) {
        console.error('Error setting up meeting:', error);
        Alert.alert(
          'Error', 
          'Failed to set up the meeting. Please check permissions and try again.'
        );
        navigation.goBack();
      }
    };
    
    setupMeeting();
    
    return () => {
      if (serviceInitialized.current) {
        endCall();
      }
    };
  }, []);
  
  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (appStateRef.current === 'active' && nextAppState.match(/inactive|background/)) {
        console.log('App moved to background - performing cleanup');
        endCall();
      }
      appStateRef.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, [webrtcService, unsubscribeParticipants]);
  
  const endCall = () => {
    console.log('=== ENDING CALL - CLEANUP STARTED ===');
    
    if (unsubscribeParticipants) {
      console.log('Unsubscribing from participants updates');
      try {
        unsubscribeParticipants();
        setUnsubscribeParticipants(null);
      } catch (error) {
        console.error('Error unsubscribing from participants:', error);
      }
    }
    
    if (webrtcService) {
      console.log('Cleaning up WebRTC service');
      try {
        webrtcService.cleanUp();
        setWebrtcService(null);
      } catch (error) {
        console.error('Error cleaning up WebRTC service:', error);
      }
    }
    
    setStreams({});
    setParticipants({});
    setIsServiceReady(false);
    serviceInitialized.current = false;
    
    try {
      if (meetingId && localParticipantId) {
        console.log('Removing participant from Firebase');
        FirebaseService.leaveMeeting(meetingId, localParticipantId);
      }
    } catch (error) {
      console.error('Error leaving meeting:', error);
    }
    
    console.log('=== CLEANUP COMPLETED ===');
  };
  
  const handleToggleMute = () => {
    if (webrtcService && isServiceReady) {
      console.log(`Toggling mute from current state: ${isMuted}`);
      
      const newMuteState = webrtcService.toggleMute(!isMuted);
      
      console.log(`New mute state: ${newMuteState}`);
      setIsMuted(newMuteState);
      
      FirebaseService.joinMeeting(meetingId, localParticipantId, { 
        displayName,
        isMuted: newMuteState,
      });
    } else {
      console.warn('Cannot toggle mute: WebRTC service not initialized or not ready');
      Alert.alert('Not Ready', 'Please wait while the call is setting up.');
    }
  };
  
  const handleSwitchCamera = async () => {
    if (webrtcService && isServiceReady) {
      console.log('Handling camera switch request');
      
      const updatedStream = await webrtcService.switchCamera();
      
      if (updatedStream) {
        console.log('Camera switched successfully');
        setStreams(prev => ({
          ...prev,
          [localParticipantId]: updatedStream
        }));
      } else {
        console.warn('Camera switch failed or returned no stream');
      }
    } else {
      console.warn('Cannot switch camera: WebRTC service not initialized or not ready');
      Alert.alert('Not Ready', 'Please wait while the call is setting up.');
    }
  };
  
  const handleEndCall = () => {
    Alert.alert(
      'Leave Meeting',
      'Are you sure you want to leave this meeting?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Leave', 
          style: 'destructive',
          onPress: () => {
            endCall();
            navigation.goBack();
          }
        },
      ]
    );
  };
  
  return (
    <View style={styles.container}>
      {isServiceReady ? (
        <VideoGrid 
          participants={participants}
          streams={streams}
          localParticipantId={localParticipantId}
        />
      ) : (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Setting up your call...</Text>
        </View>
      )}
      <MeetingControls 
        onToggleMute={handleToggleMute}
        onSwitchCamera={handleSwitchCamera}
        onEndCall={handleEndCall}
        isMuted={isMuted}
        meetingId={meetingId}
        isReady={isServiceReady}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e272e',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
  loadingText: {
    color: '#ecf0f1',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default MeetingScreen;
