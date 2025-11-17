import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, onValue, remove, off } from 'firebase/database';

// Fixed Firebase configuration with a valid database URL
// Use your own Firebase project details here
const firebaseConfig = {
  apiKey: "AIzaSyA2bnllCXgv5Ir_Att5Io58gisrqWbRWF4",
  authDomain: "docmate-2adb1.firebaseapp.com",
  projectId: "docmate-2adb1",
  storageBucket: "docmate-2adb1.firebasestorage.app",
  messagingSenderId: "843767229628",
  appId: "1:843767229628:web:503c05e5b3360d6a6cb4b9",
  measurementId: "G-WNTQZ5CWCV"
};
// Initialize Firebase with explicit options
const app = initializeApp(firebaseConfig);
// Get database with explicit URL to avoid connection issues
const database = getDatabase(app, firebaseConfig.databaseURL);

export const createMeeting = (meetingId) => {
  const meetingRef = ref(database, `meetings/${meetingId}`);
  return set(meetingRef, { 
    createdAt: Date.now(),
    participants: {}
  });
};

export const joinMeeting = (meetingId, participantId, data) => {
  const participantRef = ref(database, `meetings/${meetingId}/participants/${participantId}`);
  return set(participantRef, { 
    joinedAt: Date.now(), 
    ...data 
  });
};

export const listenToParticipants = (meetingId, callback) => {
  const participantsRef = ref(database, `meetings/${meetingId}/participants`);
  onValue(participantsRef, (snapshot) => {
    const participants = snapshot.val() || {};
    callback(participants);
  });
  
  return () => off(participantsRef);
};

// Store signaling data with longer persistence
export const sendSignalingData = (meetingId, senderId, receiverId, data) => {
  console.log(`Sending signal from ${senderId} to ${receiverId}:`, data.type);
  const signalingRef = ref(
    database, 
    `meetings/${meetingId}/signaling/${receiverId}/${senderId}/${Date.now()}`
  );
  return set(signalingRef, {
    timestamp: Date.now(),
    data
  });
};

// Listen for signaling data without immediate removal
export const listenToSignalingData = (meetingId, participantId, callback) => {
  console.log(`Setting up signaling listener for ${participantId} in meeting ${meetingId}`);
  const signalingRef = ref(database, `meetings/${meetingId}/signaling/${participantId}`);
  
  onValue(signalingRef, (snapshot) => {
    const data = snapshot.val();
    if (!data) {
      // No data available, nothing to process
      return;
    }
    
    console.log(`Received signaling data for ${participantId}`);
      
    // Process each sender's messages
    Object.entries(data).forEach(([senderId, messages]) => {
      if (!messages || typeof messages !== 'object') {
        console.warn(`Received invalid message format from ${senderId}`);
        return;
      }
      
      // Get all messages from this sender, sorted by timestamp
      try {
        const sortedMessages = Object.entries(messages)
          .filter(([key, msg]) => msg && msg.data) // Filter out invalid messages
          .map(([key, msg]) => ({ 
            key, 
            timestamp: msg.timestamp || Date.now(),
            data: msg.data,
            senderId 
          }))
          .sort((a, b) => a.timestamp - b.timestamp);
        
        // Process each message in order
        sortedMessages.forEach(message => {
          // Verify message has required data
          if (!message.data) {
            console.warn(`Skipping malformed message from ${senderId}`);
            return;
          }
          
          callback({
            senderId: message.senderId,
            data: message.data,
            key: message.key
          });
          
          // Remove only this specific message
          const msgRef = ref(database, `meetings/${meetingId}/signaling/${participantId}/${senderId}/${message.key}`);
          remove(msgRef).catch(err => console.error("Error removing message:", err));
        });
      } catch (err) {
        console.error(`Error processing messages from ${senderId}:`, err);
      }
    });
  });
  
  return () => {
    console.log(`Removing signaling listener for ${participantId}`);
    off(signalingRef);
  };
};

export const leaveMeeting = (meetingId, participantId) => {
  const participantRef = ref(database, `meetings/${meetingId}/participants/${participantId}`);
  return remove(participantRef);
};
