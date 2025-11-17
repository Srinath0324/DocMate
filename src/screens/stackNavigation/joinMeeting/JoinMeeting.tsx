import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomButton from '../../../components/button/Button';
import InputText from '../../../components/textInput/InputText';

interface JoinMeetingProps {
  route: any;
  navigation: any;
}

const JoinMeeting: React.FC<JoinMeetingProps> = ({ route, navigation }) => {
  const { doctorId, doctorName } = route.params || {};
  const [meetingId, setMeetingId] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleJoinMeeting = async () => {
    if (!meetingId.trim()) {
      Alert.alert("Error", "Please enter a meeting ID");
      return;
    }
    
    if (!displayName.trim()) {
      Alert.alert("Error", "Please enter your display name");
      return;
    }

    setIsLoading(true);
    
    try {
      // Call the API to join the meeting
      
      // Navigate to the meeting screen
      navigation.navigate('Meeting', {
        meetingId: meetingId.trim(),
        displayName: displayName.trim(),
        isNewMeeting: false,
      });
    } catch (error) {
      console.error('Failed to join meeting:', error);
      Alert.alert("Error", "Failed to join meeting. Please check the meeting ID and try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.contentContainer}>
        <Icon name="video" size={60} color="#0066CC" style={styles.icon} />
        <Text style={styles.title}>Online Consultation</Text>
        {doctorName && <Text style={styles.doctorName}>with Dr. {doctorName}</Text>}
        
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            You are about to join an online consultation.
            Please ensure you have a stable internet connection before proceeding.
          </Text>
        </View>
        
        <View style={styles.checklistContainer}>
          <Text style={styles.checklistTitle}>Before you join:</Text>
          <View style={styles.checklistItem}>
            <Icon name="checkbox-marked-circle-outline" size={20} color="#4CAF50" />
            <Text style={styles.checklistText}>Make sure your camera and microphone are working</Text>
          </View>
          <View style={styles.checklistItem}>
            <Icon name="checkbox-marked-circle-outline" size={20} color="#4CAF50" />
            <Text style={styles.checklistText}>Find a quiet place with good lighting</Text>
          </View>
          <View style={styles.checklistItem}>
            <Icon name="checkbox-marked-circle-outline" size={20} color="#4CAF50" />
            <Text style={styles.checklistText}>Have your medical history and questions ready</Text>
          </View>
        </View>
        
        <View style={styles.buttonContainer}>
          <InputText
            placeholder="Enter Meeting ID"
            placeholderTextColor="#95a5a6"
            value={meetingId}
            onChangeText={setMeetingId}
          />
          
          <InputText
            placeholder="Enter Your Name"
            placeholderTextColor="#95a5a6"
            value={displayName}
            onChangeText={setDisplayName}
            style={styles.nameInput}
          />
          
          {isLoading ? (
            <ActivityIndicator size="large" color="#0066CC" style={styles.loader} />
          ) : (
            <CustomButton
              title="Join Meeting"
              iconPosition="left"
              icon={<Icon name="video" size={22} color="#fff" />}
              onPress={handleJoinMeeting}
              fullWidth
              size="large"
            />
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 20,
    alignItems: 'center',
  },
  icon: {
    marginVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0066CC',
    marginBottom: 8,
  },
  doctorName: {
    fontSize: 18,
    marginBottom: 20,
    color: '#333',
  },
  infoContainer: {
    backgroundColor: '#e3f2fd',
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
    width: '100%',
  },
  infoText: {
    fontSize: 15,
    color: '#333',
    textAlign: 'center',
    lineHeight: 22,
  },
  checklistContainer: {
    alignSelf: 'flex-start',
    width: '100%',
    marginBottom: 30,
  },
  checklistTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  checklistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checklistText: {
    fontSize: 15,
    color: '#333',
    marginLeft: 10,
  },
  buttonContainer: {
    width: '100%',
  },
  nameInput: {
    marginTop: 10,
    marginBottom: 10,
  },
  loader: {
    marginTop: 20,
  },
});

export default JoinMeeting;