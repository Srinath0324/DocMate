import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import DoctorCard from '../../../components/doctorCard/DoctorCard';
import useDoctorList, { Category } from '../../../hooks/useDoctorList';
import styles from './style';

const DoctorList = ({ navigation, route }: any) => {
  const {
    categories,
    subCategories,
    doctors,
    loading,
    refreshing,
    selectedSubCategory,
    diseaseCategories,
    selectedDiseaseCategory,
    diseases,
    selectedDisease,
    showingDiseases,
    handleRefresh,
    handleCategoryPress,
    handleSubCategoryPress,
    handleDoctorPress,
    handleDiseaseCategoryPress,
    handleDiseasePress,
  } = useDoctorList({ navigation, route });
  
  const renderIcon = (item: Category) => {
    switch (item.iconType) {
      case 'FontAwesome':
        return <FontAwesome name={item.icon} size={22} color={item.isActive ? '#0C53B7' : '#757575'} />;
      case 'FontAwesome5':
        return <FontAwesome5 name={item.icon} size={22} color={item.isActive ? '#0C53B7' : '#757575'} />;
      case 'MaterialIcons':
        return <MaterialIcons name={item.icon} size={22} color={item.isActive ? '#0C53B7' : '#757575'} />;
      default:
        return <Ionicons name={item.icon as any} size={22} color={item.isActive ? '#0C53B7' : '#757575'} />;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle} numberOfLines={1}>
            {showingDiseases ? (selectedDisease ? 'Doctors for ' + selectedDisease.name : 'Diseases') : 'Find Doctors'}
          </Text>
        </View>

        <View style={styles.categoriesContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesScrollView}
          >
            {categories.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.categoryItem,
                  item.isActive && styles.activeCategoryItem,
                ]}
                onPress={() => handleCategoryPress(item)}
              >
                <View style={[styles.categoryIcon, item.isActive && styles.activeCategoryIcon]}>
                  {renderIcon(item)}
                </View>
                <Text
                  style={[
                    styles.categoryText,
                    item.isActive && styles.activeCategoryText,
                  ]}
                  numberOfLines={1}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Disease Categories Section - Only shown when in disease mode */}
        {showingDiseases && diseaseCategories.length > 0 && (
          <View style={styles.subCategoriesContainer}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.subCategoriesScrollView}
            >
              {diseaseCategories.map((item) => (
                <TouchableOpacity
                  key={item.fieldCategoryId}
                  style={[
                    styles.subCategoryItem,
                    selectedDiseaseCategory === item.fieldCategoryId && styles.activeSubCategoryItem,
                  ]}
                  onPress={() => handleDiseaseCategoryPress(item.fieldCategoryId)}
                >
                  <Text
                    style={[
                      styles.subCategoryText,
                      selectedDiseaseCategory === item.fieldCategoryId && styles.activeSubCategoryText,
                    ]}
                    numberOfLines={1}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Regular Sub-Categories - Only shown when not in disease mode */}
        {!showingDiseases && subCategories.length > 0 && (
          <View style={styles.subCategoriesContainer}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.subCategoriesScrollView}
            >
              {subCategories.map((item) => (
                <TouchableOpacity
                  key={item.doctorFieldId}
                  style={[
                    styles.subCategoryItem,
                    selectedSubCategory === item.doctorFieldId && styles.activeSubCategoryItem,
                  ]}
                  onPress={() => handleSubCategoryPress(item)}
                >
                  <Text
                    style={[
                      styles.subCategoryText,
                      selectedSubCategory === item.doctorFieldId && styles.activeSubCategoryText,
                    ]}
                    numberOfLines={1}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Diseases List - Only shown when in disease mode and no specific disease is selected */}
        {showingDiseases && !selectedDisease && diseases.length > 0 && (
          <FlatList
            data={diseases}
            keyExtractor={(item) => item.diseaseId.toString()}
            showsVerticalScrollIndicator={true}
            contentContainerStyle={styles.diseasesListContainer}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.diseaseItem,
                ]}
                onPress={() => handleDiseasePress(item)}
              >
                <Text style={styles.diseaseText} numberOfLines={2} ellipsizeMode="tail">
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
          />
        )}

        {/* Doctor List */}
        {(!showingDiseases || (showingDiseases && selectedDisease)) && (
          loading ? (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color="#0C53B7" />
              <Text style={styles.loaderText}>Loading doctors...</Text>
            </View>
          ) : (
            <FlatList
              data={doctors}
              keyExtractor={(item) => item.doctorId}
              numColumns={2}
              contentContainerStyle={styles.doctorList}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
              }
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                  <Ionicons name="medical-outline" size={60} color="#CCCCCC" />
                  <Text style={styles.emptyText}>No doctors found</Text>
                  <Text style={styles.emptySubText}>Try adjusting your filters</Text>
                </View>
              }
              renderItem={({ item }) => (
                <View style={styles.doctorCardContainer}>
                  <DoctorCard
                    name={item.name}
                    image={item.image}
                    field={item.field}
                    experience={item.experience}
                    rating={item.rating}
                    onPress={() => handleDoctorPress(item)}
                  />
                </View>
              )}
            />
          )
        )}

        {/* Empty disease list message */}
        {showingDiseases && !selectedDisease && diseases.length === 0 && !loading && (
          <View style={styles.emptyContainer}>
            <Ionicons name="medical-outline" size={60} color="#CCCCCC" />
            <Text style={styles.emptyText}>No diseases found</Text>
            <Text style={styles.emptySubText}>Try selecting a different category</Text>
          </View>
        )}
    </SafeAreaView>
  );
};

export default DoctorList;