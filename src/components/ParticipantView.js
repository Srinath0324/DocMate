import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RTCView } from 'react-native-webrtc';

const ParticipantView = ({ stream, displayName, isMuted, isLocal }) => {
  const [streamURL, setStreamURL] = useState('');
  const [hasVideoTracks, setHasVideoTracks] = useState(false);
  const mountedRef = useRef(true);
  const retryTimerRef = useRef(null);
  const retryCountRef = useRef(0);
  const MAX_RETRIES = 5;

  const checkVideoTracks = (mediaStream) => {
    if (!mediaStream) return false;
    
    const videoTracks = mediaStream.getVideoTracks();
    const hasVideo = videoTracks.length > 0;
    const isEnabled = hasVideo && videoTracks[0].enabled;
    const isActive = hasVideo && videoTracks[0].readyState === 'live';
    
    console.log(`Stream check for ${displayName}: has video=${hasVideo}, enabled=${isEnabled}, active=${isActive}`);
    
    return hasVideo && isEnabled && isActive;
  };

  useEffect(() => {
    if (stream) {
      console.log(`Setting up stream for ${displayName || 'Participant'} with ${stream.getTracks().length} tracks`);
      
      const trySetupStream = () => {
        try {
          const hasVideo = checkVideoTracks(stream);
          setHasVideoTracks(hasVideo);
          
          const url = stream.toURL();
          console.log(`Setting stream URL for ${displayName}: ${url}`);
          setStreamURL(url);
          
          if (!hasVideo && retryCountRef.current < MAX_RETRIES) {
            console.log(`No active video for ${displayName}, scheduling retry ${retryCountRef.current + 1}/${MAX_RETRIES}`);
            retryTimerRef.current = setTimeout(() => {
              retryCountRef.current += 1;
              if (mountedRef.current) trySetupStream();
            }, 1000);
          }
        } catch (err) {
          console.error(`Error setting up stream for ${displayName}:`, err);
        }
      };
      
      trySetupStream();
      
      const trackListener = () => {
        if (mountedRef.current) {
          setHasVideoTracks(checkVideoTracks(stream));
        }
      };
      
      const checkInterval = setInterval(trackListener, 2000);
      
      return () => {
        mountedRef.current = false;
        clearInterval(checkInterval);
        if (retryTimerRef.current) clearTimeout(retryTimerRef.current);
      };
    } else {
      setHasVideoTracks(false);
      setStreamURL('');
    }
  }, [stream, displayName]);

  useEffect(() => {
    retryCountRef.current = 0;
  }, [stream]);

  return (
    <View style={styles.container}>
      {streamURL && hasVideoTracks ? (
        <RTCView
          streamURL={streamURL}
          style={styles.videoStream}
          objectFit="cover"
          zOrder={isLocal ? 0 : 1}
          key={`${streamURL}-${Date.now()}`} 
        />
      ) : (
        <View style={[styles.videoStream, styles.noVideo]}>
          <Text style={styles.noVideoText}>
            {!stream ? 'Connecting...' : isLocal ? 'Your camera is off' : 'Camera off'}
          </Text>
          <Text style={styles.nameText}>{displayName || 'Participant'}</Text>
        </View>
      )}
      
      <View style={styles.infoContainer}>
        <Text style={styles.participantName}>
          {displayName || 'Participant'} {isLocal && '(You)'}
        </Text>
        {isMuted && (
          <View style={styles.mutedIndicator}>
            <Text style={styles.mutedText}>MIC OFF</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 4,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#2c3e50',
  },
  videoStream: {
    flex: 1,
  },
  noVideo: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#34495e',
  },
  noVideoText: {
    color: '#ecf0f1',
    fontSize: 14,
  },
  infoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
  },
  participantName: {
    color: '#ecf0f1',
    fontWeight: 'bold',
    fontSize: 12,
  },
  mutedIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(231, 76, 60, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mutedText: {
    fontSize: 10,
  },
  nameText: {
    color: '#ecf0f1',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8
  },
});

export default ParticipantView;
