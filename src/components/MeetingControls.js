import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';

const ControlButton = ({ onPress, icon, text, isActive, color, disabled }) => (
  <TouchableOpacity 
    style={[
      styles.button, 
      { backgroundColor: isActive ? color : '#34495e' },
      disabled && styles.disabledButton
    ]} 
    onPress={onPress}
    disabled={disabled}
  >
    <Text style={styles.buttonIcon}>{icon}</Text>
    <Text style={styles.buttonText}>{text}</Text>
  </TouchableOpacity>
);

const MeetingControls = ({
  onToggleMute,
  onSwitchCamera,
  onEndCall,
  isMuted,
  meetingId,
  isReady = false,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.meetingInfo}>
        <Text style={styles.meetingIdText}>Meeting ID: {meetingId}</Text>
        {!isReady && <Text style={styles.statusText}>Setting up call...</Text>}
      </View>
      
      <View style={styles.buttonsContainer}>
        <ControlButton
          onPress={() => {
            console.log('Mute button pressed, current state:', isMuted);
            onToggleMute();
          }}
          icon={isMuted ? "MIC OFF" : "MIC ON"}
          text={isMuted ? 'Unmute' : 'Mute'}
          isActive={isMuted}
          color="#e67e22"
          disabled={!isReady}
        />
        
        <ControlButton
          onPress={() => {
            console.log('Camera switch button pressed');
            onSwitchCamera();
          }}
          icon="FLIP CAM"
          text="Flip"
          color="#3498db"
          disabled={!isReady}
        />
        
        <ControlButton
          onPress={onEndCall}
          icon="END"
          text="End"
          isActive={true}
          color="#e74c3c"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2c3e50',
    padding: 16,
  },
  meetingInfo: {
    marginBottom: 8,
    alignItems: 'center',
  },
  meetingIdText: {
    color: '#ecf0f1',
    fontSize: 12,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  button: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonIcon: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#ffffff',
  },
  buttonText: {
    color: '#ecf0f1',
    fontSize: 12,
  },
  disabledButton: {
    opacity: 0.5,
  },
  statusText: {
    color: '#e74c3c',
    fontSize: 12,
    marginTop: 4,
  },
});

export default MeetingControls;
