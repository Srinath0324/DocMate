import React from 'react';
import WebView from 'react-native-webview';

const AdminCreateMeeting = () => {

  return (
    <WebView source={{ uri: ' http://192.168.100.66:3000' }} style={{ flex: 1 }} />
  )
};

export default AdminCreateMeeting;
