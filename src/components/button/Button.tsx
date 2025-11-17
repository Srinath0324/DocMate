import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  StyleProp,
} from 'react-native';

type ButtonType = 'outline' | 'text' | 'success';
type ButtonSize = 'small' | 'medium' | 'large';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  type?: ButtonType;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  type = 'success', 
  size = 'medium',
  disabled = false,
  loading = false,
  buttonStyle,
  textStyle,
  icon,
  iconPosition = 'left',
  fullWidth = false,
}) => {
  const getButtonTypeStyle = () => {
    switch (type) {
      case 'outline':
        return styles.outlineButton;
      case 'text':
        return styles.textButton;
      case 'success':
      default:
        return styles.successButton;
    }
  };

  const getButtonSizeStyle = () => {
    switch (size) {
      case 'small':
        return styles.smallButton;
      case 'large':
        return styles.largeButton;
      default:
        return styles.mediumButton;
    }
  };

  const getTextColorStyle = () => {
    switch (type) {
      case 'outline':
        return styles.outlineButtonText;
      case 'text':
        return styles.textButtonText;
      case 'success':
      default:
        return styles.successButtonText;
    }
  };

  const renderContent = () => (
    <>
      {loading ? (
        <ActivityIndicator
          size="small"
          color={type === 'success' ? '#fff' : '#0066CC'}
        />
      ) : (
        <>
          {icon && iconPosition === 'left' && icon}
          <Text style={[
            styles.buttonText,
            getTextColorStyle(),
            textStyle
          ]}>
            {title}
          </Text>
          {icon && iconPosition === 'right' && icon}
        </>
      )}
    </>
  );

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        getButtonTypeStyle(),
        getButtonSizeStyle(),
        disabled && styles.disabledButton,
        fullWidth && styles.fullWidthButton,
        buttonStyle,
      ]}
    >
      {renderContent()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  primaryButton: {
    backgroundColor: '#0066CC',
  },
  successButton: {
    backgroundColor: '#0066CC',
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#0066CC',
  },
  textButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: 0,
  },
  smallButton: {
    height: 36,
    paddingHorizontal: 12,
  },
  mediumButton: {
    height: 48,
  },
  largeButton: {
    height: 46,
  },
  buttonText: {
    fontWeight: '600',
    fontSize: 16
  },
  successButtonText: {
    color: '#FFFFFF',
  },
  outlineButtonText: {
    color: '#0066CC',
  },
  textButtonText: {
    color: '#0066CC',
  },
  disabledButton: {
    opacity: 0.5,
  },
  fullWidthButton: {
    width: '100%',
  },
});

export default CustomButton;
