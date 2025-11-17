import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions, } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { facilitySections, mainSections } from '../../../utils/Constants';
import Header from '../../../components/header/Header';
import styles from './styles';

const { width } = Dimensions.get('window');
const mainWidth = width * 0.54;
const secondaryWidth = width * 0.38;

const HomeScreen = ({ navigation }: any) => {

  const handleSectionPress = (route: any, section?: any, params?: any) => {
    if (section) {
      let categoryId = 0;  

      if (section.title === 'Surgeons' || section.title.includes('Surgeon')) {
        categoryId = 1;
      } else if (section.title === 'Specialist' || section.title.includes('Specialist')) {
        categoryId = 2;
      } else if (section.title === 'Doctor By Disease' || section.title.includes('Disease')) {
        categoryId = 3;
      }

      navigation.navigate(route, { activeCategoryId: categoryId });
    }
    else if (params) {
      navigation.navigate(route, params);
    } 
    else {
      navigation.navigate(route, { activeCategoryId: 0 }); 
    }
  };

  const handleFacilityPress = (facility: any) => {
    let facilityType = '';

    if (facility.id === '5' || facility.title.includes('Lab')) {
      facilityType = 'lab';
    } else if (facility.id === '6' || facility.title.includes('Hospital')) {
      facilityType = 'hospital';
    } else if (facility.id === '7' || facility.title.includes('Clinic')) {
      facilityType = 'clinic';
    }
    handleSectionPress(facility.route, null, {
      facilityType: facilityType,
      title: facility.title
    });
  };

  return (
    <View style={styles.container}>
      <Header />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.topSection}>
          <TouchableOpacity
            style={[styles.featuredSection, { width: mainWidth }]}
            onPress={() => handleSectionPress(mainSections[0].route, null)}
          >
            <Image
              source={mainSections[0].imageUrl}
              style={styles.featuredImage}
              resizeMode="cover"
            />
            <View style={styles.featuredOverlay}>
              <View style={styles.featuredContent}>
                <Text style={styles.featuredTitle}>{mainSections[0].title}</Text>
                <Text style={styles.featuredSubtitle}>{mainSections[0].subtitle}</Text>
                <View style={styles.buttonContainer}>
                  <Text style={styles.buttonText}>Find Now</Text>
                  <Ionicons name="arrow-forward" size={16} color="#FFF" />
                </View>
              </View>
            </View>
          </TouchableOpacity>

          <View style={[styles.rightColumn, { width: secondaryWidth }]}>
            {mainSections.slice(1, 4).map((section) => (
              <TouchableOpacity
                key={section.id}
                style={styles.smallSection}
                onPress={() => handleSectionPress(section.route, section)}
              >
                <Image
                  source={section.imageUrl}
                  style={styles.sectionImage}
                  resizeMode="cover"
                />
                <View style={styles.overlay} />
                <Text style={styles.sectionTitle}>{section.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.facilitySection}>
          <Text style={styles.categoryTitle}>Medical Facilities</Text>

          {facilitySections.map((facility) => (
            <TouchableOpacity
              key={facility.id}
              style={styles.facilityCard}
              onPress={() => handleFacilityPress(facility)}
            >
              <View style={styles.facilityIconContainer}>
                <Ionicons name={facility.icon} size={24} color="#0066CC" />
              </View>
              <View style={styles.facilityInfo}>
                <Text style={styles.facilityTitle}>{facility.title}</Text>
                <Text style={styles.facilitySubtitle}>{facility.subtitle}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#0066CC" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;