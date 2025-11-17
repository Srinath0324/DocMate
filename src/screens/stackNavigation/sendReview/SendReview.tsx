import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import { styles } from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation, useRoute } from '@react-navigation/native';
import { addReviewOnDoctor } from '../../../services/Post';
import CustomButton from '../../../components/button/Button';

const SendReview = () => {
  const navigation: any = useNavigation();
  const route = useRoute();
  const { doctorId }: any = route.params || { doctorId: null };

  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState<boolean | null>(null);
  const [satisfied, setSatisfied] = useState<boolean | null>(null);
  const [reviewText, setReviewText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRatingPress = (selectedRating: number) => {
    setRating(selectedRating);
  };

  const handleFeedbackPress = (isPositive: boolean) => {
    setFeedback(isPositive);
  };

  const handleSatisfactionPress = (isYes: boolean) => {
    setSatisfied(isYes);
  };

  const handleSubmitReview = async () => {
    if (!doctorId) {
      Alert.alert('Error', 'Doctor ID is missing');
      return;
    }

    if (rating === 0) {
      Alert.alert('Missing Information', 'Please select a star rating');
      return;
    }

    if (feedback === null) {
      Alert.alert('Missing Information', 'Please select your overall experience');
      return;
    }

    if (satisfied === null) {
      Alert.alert('Missing Information', 'Please indicate if you are satisfied with the diagnosis');
      return;
    }

    const reviewData = {
      ratting: rating,
      text: reviewText,
      waitTimeId: 1,
      consultationTimeId: 1,
      overallExperience: feedback,
      satisfiedWithDiagnosis: satisfied
    };
    setLoading(true);
    try {
      await addReviewOnDoctor(doctorId, reviewData);
      Alert.alert('Success', 'Your review has been submitted successfully', [
        { text: 'OK', onPress: () => navigation.replace('BottomTabs', { screen: 'Home' }) }
      ]);
    } catch (error) {
      Alert.alert('Error', typeof error === 'string' ? error : 'Failed to submit review');
    } finally {
      setLoading(false);
    }
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity
          key={i}
          onPress={() => handleRatingPress(i)}
          style={styles.star}
        >
          <Icon
            name={i <= rating ? 'star' : 'star-o'}
            size={40}
            color={i <= rating ? '#FFD700' : '#C0C0C0'}
          />
        </TouchableOpacity>
      );
    }
    return stars;
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerText}>Rate Your Experience</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>How would you rate your experience?</Text>
        <View style={styles.starContainer}>
          {renderStars()}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Overall Experience</Text>
        <View style={styles.feedbackContainer}>
          <TouchableOpacity
            style={[styles.feedbackBtn, feedback === true && styles.feedbackBtnSelected]}
            onPress={() => handleFeedbackPress(true)}
          >
            <Icon name="thumbs-up" size={24} color={feedback === true ? '#0066CC' : '#888'} />
            <Text style={styles.feedbackText}>Like</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.feedbackBtn, feedback === false && styles.feedbackBtnSelected]}
            onPress={() => handleFeedbackPress(false)}
          >
            <Icon name="thumbs-down" size={24} color={feedback === false ? '#0066CC' : '#888'} />
            <Text style={styles.feedbackText}>Dislike</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.satisfactionText}>Are you satisfied with the diagnosis?</Text>
        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={[styles.optionButton, satisfied === true && styles.optionButtonSelected]}
            onPress={() => handleSatisfactionPress(true)}
          >
            <Text style={styles.optionText}>Yes</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.optionButton, satisfied === false && styles.optionButtonSelected]}
            onPress={() => handleSatisfactionPress(false)}
          >
            <Text style={styles.optionText}>No</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.textInputContainer}>
        <Text style={styles.sectionTitle}>Additional Comments (Optional)</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Share your experience..."
          multiline={true}
          value={reviewText}
          onChangeText={setReviewText}
        />
      </View>

      <CustomButton title='Submit Review' loading={loading} onPress={() => handleSubmitReview()} />
    </ScrollView>
  );
};

export default SendReview;