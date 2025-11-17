import React from 'react';
import { View, Text, Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import CustomButton from '../../../components/button/Button';
import Theme from '../../../theme/Theme';
import styles from './styles';

interface PaymentContentProps {
  selectedImage: string | null;
  isSubmitted: boolean;
  saveToGallery: () => void;
  selectImage: () => void;
  submitImage: () => void;
  editImage: () => void;
  navigateToAppointment: () => void;
}

const PaymentContent: React.FC<PaymentContentProps> = ({
  selectedImage,
  isSubmitted,
  saveToGallery,
  selectImage,
  submitImage,
  editImage,
  navigateToAppointment,
}) => {
  if (!selectedImage) {
    return (
      <>
        <View style={styles.qrContainer}>
          <Image source={Theme.IMAGES.qrCode} style={styles.qrImage} />
          <Text style={styles.infoText}>
            Scan this QR code to make your payment or upload your payment receipt
          </Text>
        </View>

        <View style={styles.buttonsContainer}>
          <CustomButton
            title="Save to Gallery"
            onPress={saveToGallery}
            type="outline"
            size="large"
            fullWidth
            icon={<MaterialIcons name="save-alt" size={22} color="#0066CC" style={{ marginRight: 8 }} />}
          />
          
          <CustomButton
            title="Upload Receipt"
            onPress={selectImage}
            type="outline"
            size="large"
            fullWidth
            icon={<MaterialIcons name="file-upload" size={22} color="#0066CC" style={{ marginRight: 8 }} />}
          />

          <CustomButton
            title="Appointment Details"
            onPress={navigateToAppointment}
            type="outline"
            size="large"
            fullWidth
            icon={<MaterialIcons name="event-note" size={22} color="#0066CC" style={{ marginRight: 8 }} />}
          />
        </View>
      </>
    );
  } else {
    return (
      <>
        <View style={styles.uploadedImageContainer}>
          <Image source={{ uri: selectedImage }} style={styles.uploadedImage} />
          <Text style={styles.infoText}>
            {isSubmitted ? 'Payment receipt submitted' : 'Preview of your payment receipt'}
          </Text>
        </View>

        <View style={styles.buttonsContainer}>
          {!isSubmitted ? (
            <CustomButton
              title="Submit Receipt"
              onPress={submitImage}
              type="success"
              size="large"
              fullWidth
              icon={<MaterialIcons name="check-circle" size={22} color="#FFFFFF" style={{ marginRight: 8 }} />}
            />
          ) : (
            <CustomButton
              title="Edit Receipt"
              onPress={editImage}
              type="outline"
              size="large"
              fullWidth
              icon={<MaterialIcons name="edit" size={22} color="#0066CC" style={{ marginRight: 8 }} />}
            />
          )}

          <CustomButton
            title="Appointment Details"
            onPress={navigateToAppointment}
            type="outline"
            size="large"
            fullWidth
            icon={<MaterialIcons name="event-note" size={22} color="#0066CC" style={{ marginRight: 8 }} />}
          />
        </View>
      </>
    );
  }
};

export default PaymentContent;
