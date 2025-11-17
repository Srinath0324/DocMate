import React, { useState } from 'react';
import {
  Text,
  View,
  ScrollView,
  Alert,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import CustomButton from '../../components/button/Button';
import InputText from '../../components/textInput/InputText';
import { isValidEmail, isValidPassword } from '../../utils/Validations';
import { API, isNetworkAvailable } from '../../api/api';
import Theme from '../../theme/Theme';
import DateTimePicker from '@react-native-community/datetimepicker';

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const [loading, setLoading] = useState(false);
  
  // Error states
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [dobError, setDobError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  
  const navigation: any = useNavigation();

  const validateInputs = () => {
    let isValid = true;

    // Validate first name
    if (!firstName.trim()) {
      setFirstNameError('First name is required');
      isValid = false;
    } else {
      setFirstNameError('');
    }

    // Validate last name
    if (!lastName.trim()) {
      setLastNameError('Last name is required');
      isValid = false;
    } else {
      setLastNameError('');
    }

    // Validate DOB
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();
    if (age < 18) {
      setDobError('You must be at least 18 years old to register');
      isValid = false;
    } else {
      setDobError('');
    }

    // Validate email
    if (!email.trim()) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!isValidEmail(email)) {
      setEmailError('Please enter a valid email');
      isValid = false;
    } else {
      setEmailError('');
    }

    // Validate password
    if (!password.trim()) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (!isValidPassword(password)) {
      setPasswordError('Password must be at least 8 characters with numbers, uppercase, lowercase, and special characters');
      isValid = false;
    } else {
      setPasswordError('');
    }

    // Validate confirm password
    if (!confirmPassword.trim()) {
      setConfirmPasswordError('Please confirm your password');
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      isValid = false;
    } else {
      setConfirmPasswordError('');
    }

    return isValid;
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDob(selectedDate);
    }
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const handleSignUp = async () => {
    try {
      if (!validateInputs()) {
        return;
      }

      const networkAvailable = await isNetworkAvailable();
      if (!networkAvailable) {
        Alert.alert('No Internet Connection', 'Please check your internet connection and try again.');
        return;
      }
      setLoading(true);
      const signUpData = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        dob: dob.toISOString(),
        email: email.trim(),
        password: password.trim(),
      };
      const response = await API.post('Account/user-signup', signUpData);
      if (response.data) {
        Alert.alert(
          'Registration Successful',
          'Your account has been created successfully. Please log in.',
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate('Login')
            }
          ]
        );
      }
    } catch (error: any) {
      Alert.alert('Registration Failed', error.response?.data?.message || 'An error occurred during registration. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: Date) => {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  return (
    <ScrollView style={styles.Contanier}>
      <StatusBar backgroundColor="#0066CC" barStyle="dark-content" />
      <View style={styles.imageContainer}>
        <Image style={styles.imageContainer} source={Theme.IMAGES.authBG} />
      </View>
      <View style={styles.innerContainer}>
        <Text style={styles.welcomeText}>Create Your Account</Text>
        
        <InputText
          label='First Name'
          value={firstName}
          onChangeText={setFirstName}
          placeholder="Please enter your first name"
          autoCapitalize="words"
          error={firstNameError}
          inputStyle={{ paddingLeft: 10 }}
          leftIcon={<Icon name="person-outline" size={20} color='#0066CC' />}
        />
        
        <InputText
          label='Last Name'
          value={lastName}
          onChangeText={setLastName}
          placeholder="Please enter your last name"
          autoCapitalize="words"
          error={lastNameError}
          inputStyle={{ paddingLeft: 10 }}
          leftIcon={<Icon name="person-outline" size={20} color='#0066CC' />}
        />
        
        <TouchableOpacity onPress={showDatepicker}>
          <InputText
            label='Date of Birth'
            value={formatDate(dob)}
            placeholder="Select your date of birth"
            editable={false}
            error={dobError}
            inputStyle={{ paddingLeft: 10 }}
            leftIcon={<Icon name="calendar-outline" size={20} color='#0066CC' />}
            rightIcon={<Icon name="chevron-down" size={20} color='#0066CC' />}
          />
        </TouchableOpacity>
        
        {showDatePicker && (
          <DateTimePicker
            value={dob}
            mode="date"
            display="default"
            onChange={handleDateChange}
            maximumDate={new Date()}
          />
        )}
        
        <InputText
          label='Email'
          value={email}
          onChangeText={setEmail}
          placeholder="Please enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
          error={emailError}
          inputStyle={{ paddingLeft: 10 }}
          leftIcon={<Icon name="mail-outline" size={20} color='#0066CC' />}
        />
        
        <InputText
          label='Password'
          value={password}
          onChangeText={setPassword}
          placeholder="Please enter your password"
          secureTextEntry={showPassword}
          error={passwordError}
          inputStyle={{ paddingLeft: 10 }}
          leftIcon={<Icon name="lock-closed-outline" size={20} color='#0066CC' />}
          rightIcon={
            <TouchableOpacity onPress={togglePasswordVisibility}>
              <Icon
                name={showPassword ? "eye-off" : "eye"}
                size={20}
                color='#0066CC'
              />
            </TouchableOpacity>
          }
        />
        
        <InputText
          label='Confirm Password'
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Please confirm your password"
          secureTextEntry={showConfirmPassword}
          error={confirmPasswordError}
          inputStyle={{ paddingLeft: 10 }}
          leftIcon={<Icon name="lock-closed-outline" size={20} color='#0066CC' />}
          rightIcon={
            <TouchableOpacity onPress={toggleConfirmPasswordVisibility}>
              <Icon
                name={showConfirmPassword ? "eye-off" : "eye"}
                size={20}
                color='#0066CC'
              />
            </TouchableOpacity>
          }
        />
        
        <View style={styles.marginV10}>
          <CustomButton
            title="Sign Up"
            onPress={handleSignUp}
            loading={loading}
            fullWidth
            size='large'
          />
        </View>

        <View style={styles.textLinkContainer}>
          <Text style={styles.normalText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.linkText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp;