import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomButton from '../button/Button';

const { width } = Dimensions.get('window');

interface AuthRequiredModalProps {
  visible: boolean;
  onClose: () => void;
  onLogin: () => void;
}

const AuthRequiredModal: React.FC<AuthRequiredModalProps> = ({
  visible,
  onClose,
  onLogin
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Icon name="close" size={22} color="#333" />
          </TouchableOpacity>
          
          <View style={styles.illustrationContainer}>
            <Icon name="account-lock-outline" size={80} color="#0066CC" />
          </View>
          
          <Text style={styles.headerText}>Login Required</Text>
          
          <Text style={styles.messageText}>
            Please log in to your account to book an appointment with this doctor.
          </Text>
          
          <View style={styles.buttonContainer}>
            <CustomButton
              title="Continue as Guest"
              type="outline"
              onPress={onClose}
              buttonStyle={styles.guestButton}
              icon={<Icon name="account-outline" size={20} color="#0066CC" />}
              iconPosition="left"
            />
            
            <CustomButton
              title="Log In"
              onPress={onLogin}
              buttonStyle={styles.loginButton}
              icon={<Icon name="login" size={20} color="#FFF" />}
              iconPosition="left"
            />
          </View>
          
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  modalView: {
    width: width * 0.9,
    maxWidth: 400,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 28,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 1,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustrationContainer: {
    marginTop: 10,
    marginBottom: 20,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(0, 102, 204, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  messageText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  buttonContainer: {
    width: '100%',
    gap: 12,
  },
  guestButton: {
    backgroundColor: 'transparent',
    borderColor: '#0066CC',
    marginBottom: 10,
    gap: 5,
  },
  loginButton: {
    backgroundColor: '#0066CC',
    gap:5
  },
  registerContainer: {
    marginTop: 20,
    alignSelf: 'center',
  },
  registerText: {
    fontSize: 14,
    color: '#666',
  },
  registerLink: {
    color: '#0066CC',
    fontWeight: 'bold',
  },
});

export default AuthRequiredModal;
