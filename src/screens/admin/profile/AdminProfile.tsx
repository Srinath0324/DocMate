import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';

interface AdminProfile {
  name: string;
  image: string;
  contact: string;
  speciality: string;
  experience: string;
  email: string;
  location: string;
  rating: number;
}

const mockAdminProfile: AdminProfile = {
  name: 'Dr. Sarah Johnson',
  image: 'https://via.placeholder.com/150x150',
  contact: '+1 (555) 123-4567',
  speciality: 'Cardiology',
  experience: '15 Years',
  email: 'sarah.johnson@hospital.com',
  location: 'New York, NY',
  rating: 4.8,
};

// Icon colors mapping
const iconColors = {
  speciality: '#4361ee',
  experience: '#4cc9f0',
  contact: '#3f37c9',
  edit: '#4895ef',
  settings: '#4895ef',
  help: '#f8961e',
  logout: '#f72585',
};

const AdminProfile: React.FC = () => {
  const [notificationCount] = useState(5);

  const handleNotificationPress = () => {
    Alert.alert('Notifications', 'You have 5 new notifications');
  };

  const handleEditProfile = () => {
    Alert.alert('Edit Profile', 'Edit profile functionality coming soon');
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive' },
      ]
    );
  };

  const profileMenuItems = [
    { icon: 'edit', title: 'Edit Profile', onPress: handleEditProfile, color: iconColors.edit },
    { icon: 'settings', title: 'Account Settings', onPress: () => Alert.alert('Settings', 'Coming soon'), color: iconColors.settings },
    { icon: 'help-outline', title: 'Help & Support', onPress: () => Alert.alert('Help', 'Coming soon'), color: iconColors.help },
    { icon: 'logout', title: 'Logout', onPress: handleLogout, isDestructive: true, color: iconColors.logout },
  ];

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Icon key={i} name="star" size={18} color="#FFD700" />);
      } else if (i === fullStars && halfStar) {
        stars.push(<Icon key={i} name="star-half" size={18} color="#FFD700" />);
      } else {
        stars.push(<Icon key={i} name="star-outline" size={18} color="#FFD700" />);
      }
    }
    
    return stars;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <Image source={{ uri: mockAdminProfile.image }} style={styles.profileImage} />
            <TouchableOpacity style={styles.editImageButton}>
              <Icon name="camera-alt" size={16} color="#fff" />
            </TouchableOpacity>
          </View>

          <Text style={styles.profileName}>{mockAdminProfile.name}</Text>
          <Text style={styles.profileEmail}>{mockAdminProfile.email}</Text>

          <View style={styles.ratingContainer}>
            {renderStars(mockAdminProfile.rating)}
            <Text style={styles.ratingText}>{mockAdminProfile.rating}</Text>
            <Text style={styles.ratingSubtext}>(124 reviews)</Text>
          </View>
          
          <View style={styles.infoContainer}>
            <View style={styles.infoColumn}>
              <View style={[styles.infoIconContainer, { backgroundColor: '#ECF2FF' }]}>
                <Icon name="medical-services" size={22} color={iconColors.speciality} />
              </View>
              <Text style={styles.infoLabel}>Speciality</Text>
              <Text style={styles.infoValue}>{mockAdminProfile.speciality}</Text>
            </View>
            
            <View style={styles.infoColumn}>
              <View style={[styles.infoIconContainer, { backgroundColor: '#ECF9FF' }]}>
                <Icon name="work" size={22} color={iconColors.experience} />
              </View>
              <Text style={styles.infoLabel}>Experience</Text>
              <Text style={styles.infoValue}>{mockAdminProfile.experience}</Text>
            </View>
            
            <View style={styles.infoColumn}>
              <View style={[styles.infoIconContainer, { backgroundColor: '#ECEEFF' }]}>
                <Icon name="phone" size={22} color={iconColors.contact} />
              </View>
              <Text style={styles.infoLabel}>Contact</Text>
              <Text style={styles.infoValue}>{mockAdminProfile.contact}</Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Account Settings</Text>
        
        <View style={styles.menuSection}>
          {profileMenuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.menuItem,
                index === profileMenuItems.length - 1 ? { borderBottomWidth: 0 } : {}
              ]}
              onPress={item.onPress}
            >
              <View style={styles.menuItemLeft}>
                <View style={[styles.menuItemIconContainer, { backgroundColor: item.isDestructive ? '#FFF1F6' : '#F0F5FF' }]}>
                  <Icon
                    name={item.icon}
                    size={24}
                    color={item.color}
                  />
                </View>
                <Text style={[
                  styles.menuItemText,
                  item.isDestructive && styles.destructiveText
                ]}>
                  {item.title}
                </Text>
              </View>
              <Icon name="chevron-right" size={24} color="#ccc" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AdminProfile;
