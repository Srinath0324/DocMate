import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { searchHospitalLabClinicDoctor, getAllCities } from '../../../services/Get';
import FacilityCard from '../../../components/facilityCard/FacilityCard';
import DoctorCard from '../../../components/doctorCard/DoctorCard';
import CityModel from '../../../components/cityModel/CityModel';
import styles from './styles';
import CustomButton from '../../../components/button/Button';

const SearchScreen = ({ navigation }: any) => {
  const [searchKey, setSearchKey] = useState('');
  const [selectedCity, setSelectedCity] = useState<any>(null);
  const [cityModalVisible, setCityModalVisible] = useState(false);
  const [cities, setCities] = useState([]);
  const [allCities, setAllCities] = useState([]);
  const [citySearchKey, setCitySearchKey] = useState('');
  const [searchResults, setSearchResults] = useState<any>({
    doctors: [],
    hospitals: [],
    labs: [],
    clinics: []
  });
  const [loading, setLoading] = useState(false);
  const [cityLoading, setCityLoading] = useState(false);

  useEffect(() => {
    if (cityModalVisible) {
      loadAllCities();
    }
  }, [cityModalVisible]);

  const loadAllCities = async () => {
    if (allCities.length > 0) {
      setCities(allCities);
      return;
    }
    setCityLoading(true);
    try {
      const citiesData = await getAllCities();
      setAllCities(citiesData.data);
      setCities(citiesData.data); 
    } catch (error) {
      console.error("Error loading cities:", error);
    } finally {
      setCityLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchKey.trim()) return;

    setLoading(true);
    try {
      const endpoint = selectedCity
        ? `cityId=${selectedCity.cityId}&searchKey=${searchKey}`
        : `searchKey=${searchKey}`;

      const results = await searchHospitalLabClinicDoctor(endpoint);
      setSearchResults(results.data);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCitySearch = (key: string) => {
    setCitySearchKey(key);
    if (!key.trim()) {
      setCities(allCities);
      return;
    }
    const filteredCities = allCities.filter((city: any) =>
      city.name.toLowerCase().includes(key.toLowerCase())
    );
    setCities(filteredCities);
  };

  const selectCity = (city: any) => {
    setSelectedCity(city);
    setCityModalVisible(false);
  };

  const openCityModal = () => {
    setCitySearchKey('');
    setCityModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchHeader}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search doctor, clinic, hospital..."
            value={searchKey}
            onChangeText={setSearchKey}
            returnKeyType="search"
            onSubmitEditing={handleSearch}
          />
        </View>

        <TouchableOpacity
          style={styles.cityButton}
          onPress={openCityModal}
        >
          <Ionicons name="location" size={16} color="#0066CC" />
          <Text style={styles.cityButtonText} numberOfLines={1}>
            {selectedCity ? selectedCity.name : "Select City"}
          </Text>
          <Ionicons name="chevron-down" size={16} color="#666" />
        </TouchableOpacity>

        <CustomButton title='Search' disabled={loading} onPress={handleSearch}/>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2A93D5" />
        </View>
      ) : (
        <ScrollView style={styles.resultsContainer}>
          {searchResults.doctors && searchResults.doctors.length > 0 && (
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Doctors</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.horizontalScrollContent}
              >
                {searchResults.doctors.map((doctor: any, index: any) => (
                  <DoctorCard
                    key={doctor.id || index}
                    image={doctor.image}
                    name={doctor.name}
                    field={doctor.field}
                    experience={doctor.experience}
                    rating={doctor.rating}
                    onPress={() => navigation.navigate('DoctorDetails', { doctorId: doctor.id })}
                  />
                ))}
              </ScrollView>
            </View>
          )}

          {searchResults.hospitals && searchResults.hospitals.length > 0 && (
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Hospitals</Text>
              {searchResults.hospitals.map((hospital: any, index: any) => (
                <FacilityCard
                  key={hospital.id || index}
                  name={hospital.name}
                  image={hospital.image}
                  openingTime={hospital.openingTime}
                  closingTime={hospital.closingTime}
                  phone={hospital.phone}
                  doctorCount={hospital.doctorCount}
                  type="hospital"
                  onPress={() => navigation.navigate('HospitalDetails', { hospitalId: hospital.id })}
                />
              ))}
            </View>
          )}

          {searchResults.labs && searchResults.labs.length > 0 && (
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Labs</Text>
              {searchResults.labs.map((lab: any, index: any) => (
                <FacilityCard
                  key={lab.id || index}
                  name={lab.name}
                  image={lab.image}
                  openingTime={lab.openingTime}
                  closingTime={lab.closingTime}
                  phone={lab.phone}
                  type="lab"
                  onPress={() => navigation.navigate('LabDetails', { labId: lab.id })}
                />
              ))}
            </View>
          )}

          {searchResults.clinics && searchResults.clinics.length > 0 && (
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Clinics</Text>
              {searchResults.clinics.map((clinic: any, index: any) => (
                <FacilityCard
                  key={clinic.id || index}
                  name={clinic.name}
                  image={clinic.image}
                  openingTime={clinic.openingTime}
                  closingTime={clinic.closingTime}
                  phone={clinic.phone}
                  type="clinic"
                  onPress={() => navigation.navigate('ClinicDetails', { clinicId: clinic.id })}
                />
              ))}
            </View>
          )}

          {(!searchResults.doctors?.length && !searchResults.hospitals?.length &&
            !searchResults.labs?.length && !searchResults.clinics?.length) && (
              <View style={styles.initialStateContainer}>
                <Ionicons name="search" size={80} color="#e0e0e0" />
                <Text style={styles.initialStateText}>Search for doctors, hospitals, labs or clinics</Text>
              </View>
            )}
        </ScrollView>
      )}

      <CityModel
        visible={cityModalVisible}
        onClose={() => setCityModalVisible(false)}
        cities={cities}
        loading={cityLoading}
        citySearchKey={citySearchKey}
        onSearch={handleCitySearch}
        onSelectCity={selectCity}
      />
    </View>
  );
};

export default SearchScreen;