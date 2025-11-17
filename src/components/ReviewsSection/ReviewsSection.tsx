import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Rating } from 'react-native-ratings';
import { getDoctorReviews, isUserAppointmentOnDoctor, isReviewOnDoctor } from '../../services/Get';
import { getUserId, isTokenValid } from '../../api/api';

interface ReviewsSectionProps {
  doctorId: string;
  doctorName: string;
  showToast: (message: string) => void;
  navigation?: any;
}

const ReviewsSection = ({
  doctorId,
  doctorName,
  showToast,
  navigation,
}: ReviewsSectionProps) => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [canWriteReview, setCanWriteReview] = useState(false);
  const [checkingReviewEligibility, setCheckingReviewEligibility] = useState(false);
  const [showReviews, setShowReviews] = useState(true);

  useEffect(() => {
    if (doctorId) {
      fetchDoctorReviews();
      checkReviewEligibility();
    }
  }, [doctorId]);

  const fetchDoctorReviews = async () => {
    try {
      setLoadingReviews(true);
      const response = await getDoctorReviews(doctorId);
      console.log('Doctor Reviews:', response.data);
      setReviews(response.data || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      showToast('Failed to load reviews');
    } finally {
      setLoadingReviews(false);
    }
  };

  const checkReviewEligibility = async () => {
    const userId = getUserId();
    if (!userId || !isTokenValid()) {
      setCanWriteReview(false);
      return;
    }

    try {
      setCheckingReviewEligibility(true);
      
      const reviewResponse = await isReviewOnDoctor(doctorId, userId);
      
      if (!reviewResponse.data) {
        setCanWriteReview(false);
      } else {
        setCanWriteReview(true);
      }
    } catch (error) {
      console.error('Error checking review eligibility:', error);
      setCanWriteReview(false);
    } finally {
      setCheckingReviewEligibility(false);
    }
  };

  const handleWriteReview = async () => {
    const userId = getUserId();
    
    if (!userId) {
      showToast('Please login to write a review');
      return;
    }

    try {
      const appointmentResponse = await isUserAppointmentOnDoctor(userId, doctorId);
      
      if (!appointmentResponse.data) {
        showToast('You can only review doctors you have had appointments with');
        return;
      }

      // Navigate to review screen
      // navigation.navigate('WriteReview', { 
      //   doctorId, 
      //   doctorName,
      //   onReviewSubmitted: () => {
      //     fetchDoctorReviews();
      //     checkReviewEligibility();
      //   }
      // });
    } catch (error) {
      console.error('Error checking review eligibility:', error);
      showToast('Failed to check review eligibility');
    }
  };

  const renderStars = (rating: number) => {
    const ratingValue = rating || 0;
    return (
      <Rating
        type="star"
        ratingCount={5}
        imageSize={16}
        readonly={true}
        startingValue={ratingValue}
        tintColor="#fff"
        ratingBackgroundColor="#e0e0e0"
      />
    );
  };

  const renderReviewCard = (review: any, index: number) => {
    const ratingValue = review.ratting || review.rating || 0;
    return (
      <View key={index} style={styles.reviewCard}>
        <View style={styles.reviewCardTop}>
          <View>
            <View style={styles.reviewUserInfo}>
              <Text style={styles.reviewUserName}>{review.userName}</Text>
              <View style={styles.ratingRow}>
                <View style={styles.ratingContainer}>
                  {renderStars(ratingValue)}
                  <Text style={styles.ratingValue}>{ratingValue.toFixed(1)}</Text>
                </View>
                <View style={styles.waitTimeContainer}>
                  <Text style={styles.waitTimeText}>
                    {review.waitTime || 'No Waiting Time'}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          
          {review.text && (
            <Text style={styles.reviewText}>{review.text}</Text>
          )}
        </View>
        
        {(review.satisfiedWithDiagnosis || review.overallExperience) && (
          <View style={styles.reviewCardBottom}>
            <View style={styles.reviewFooter}>
              {review.satisfiedWithDiagnosis && (
                <View style={styles.satisfactionTag}>
                  <Icon name="check-circle" size={16} color="#2E7D32" />
                  <Text style={styles.satisfactionText}>Satisfied With Diagnosis</Text>
                </View>
              )}
              
              {review.overallExperience && (
                <View style={styles.experienceTag}>
                  <Icon name="star-circle" size={16} color="#F57C00" />
                  <Text style={styles.experienceText}>Satisfied</Text>
                </View>
              )}
            </View>
          </View>
        )}
      </View>
    );
  };

  const hasReviews = reviews.length > 0;
  
  return (
    <View style={styles.reviewsSection}>
      <View style={styles.reviewsHeader}>
        <View style={styles.reviewsHeaderLeft}>
          <Text style={styles.sectionTitle}>
            Reviews ({reviews.length})
          </Text>
        </View>
        <View style={styles.reviewsHeaderButtons}>
          {hasReviews && (
            <TouchableOpacity 
              style={styles.hideReviewsButton}
              onPress={() => setShowReviews(!showReviews)}
            >
              <Icon 
                name={showReviews ? "chevron-up" : "chevron-down"} 
                size={20} 
                color="#666" 
              />
            </TouchableOpacity>
          )}
          {canWriteReview && !checkingReviewEligibility && (
            <TouchableOpacity 
              style={styles.writeReviewButton}
              onPress={handleWriteReview}
            >
              <Icon name="pencil" size={16} color="#fff" />
              <Text style={styles.writeReviewButtonText}>Write Review</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {showReviews && (
        <>
          {loadingReviews ? (
            <View style={styles.loadingReviews}>
              <ActivityIndicator size="small" color="#0066CC" />
            </View>
          ) : hasReviews ? (
            reviews.map((review, index) => renderReviewCard(review, index))
          ) : (
            <View style={styles.noReviewsContainer}>
              <Icon name="comment-text-outline" size={48} color="#ccc" />
              <Text style={styles.noReviewsText}>
                No reviews yet. Be the first to review Dr. {doctorName}!
              </Text>
            </View>
          )}
        </>
      )}
    </View>
  );
};

export default ReviewsSection;
