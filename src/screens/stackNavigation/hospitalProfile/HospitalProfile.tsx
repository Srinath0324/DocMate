import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getHospitalById, getHospitalFacilityByType, getHospitalRadiologyFacilities, getHospitalDoctors } from '../../../services/Get';
import DoctorCard from '../../../components/doctorCard/DoctorCard';
import styles from './styles';
import ProfileHeader from '../../../components/ProfileHeader/ProfileHeader';
import TabButton from '../../../components/hospitalComponents/TabButton';
import ParamedicalServiceCard from '../../../components/hospitalComponents/ParamedicalServiceCard';
import RadiologyCard from '../../../components/hospitalComponents/RadiologyCard';
import { getToken } from '../../../api/api';
import AuthRequiredModal from '../../../components/modals/AuthRequiredModal';

interface Hospital {
  hospitalId: string;
  name: string;
  address: string;
  phoneNumber: string;
  openingTime: string;
  closingTime: string;
  image: string | null;
  coverImage: string | null;
  mon: boolean;
  tus: boolean;
  wed: boolean;
  thur: boolean;
  fri: boolean;
  sat: boolean;
  sun: boolean;
}

interface Facility {
  facilityId: string;
  name: string;
  fee: number;
  type: string;
  typeId: number;
}

interface RadiologyCategory {
  facilityCategoryId: string;
  facilityCategoryName: string;
  hospitalId: string;
  radiologyFacilities: {
    facilityId: string;
    name: string;
    fee: number;
  }[];
}

interface Doctor {
  doctorId: string;
  name: string;
  image: string | null;
  specialization: string;
  field: string;
  experience: string;
  rating: number;
}

type TabType = 'paramedical' | 'radiology' | 'doctors';

const HospitalProfile = ({ route, navigation }: any) => {
  const { id } = route.params;
  const [hospital, setHospital] = useState<Hospital | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<TabType>('paramedical');
  const [paramedicalFacilities, setParamedicalFacilities] = useState<Facility[]>([]);
  const [radiologyFacilities, setRadiologyFacilities] = useState<RadiologyCategory[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [tabLoading, setTabLoading] = useState(false);
  const [authModalVisible, setAuthModalVisible] = useState(false);

  const tabs: { id: TabType; title: string }[] = [
    { id: 'paramedical', title: 'Paramedical' },
    { id: 'radiology', title: 'Radiology' },
    { id: 'doctors', title: 'Doctors' }
  ];

  useEffect(() => {
    fetchHospitalDetails();
  }, [id]);

  useEffect(() => {
    fetchTabContent();
  }, [activeTab, hospital]);

  const fetchHospitalDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getHospitalById(id);
      setHospital(data.data);
      setLoading(false);
    } catch (err: any) {
      setError(err.toString());
      setLoading(false);
    }
  };

  const fetchTabContent = async () => {
    if (!hospital) return;

    setTabLoading(true);
    try {
      switch (activeTab) {
        case 'paramedical':
          const paramedicalData = await getHospitalFacilityByType(2, hospital.hospitalId);
          setParamedicalFacilities(paramedicalData.data);
          break;
        case 'radiology':
          const radiologyData = await getHospitalRadiologyFacilities(hospital.hospitalId);
          setRadiologyFacilities(radiologyData.data);
          break;
        case 'doctors':
          const doctorsData = await getHospitalDoctors(hospital.hospitalId);
          setDoctors(doctorsData.data);
          break;
      }
    } catch (err) {
      console.error(`Error fetching ${activeTab} data:`, err);
    } finally {
      setTabLoading(false);
    }
  };

  const getWorkingDays = () => {
    const days = [];
    if (hospital?.mon) days.push('Mon');
    if (hospital?.tus) days.push('Tue');
    if (hospital?.wed) days.push('Wed');
    if (hospital?.thur) days.push('Thu');
    if (hospital?.fri) days.push('Fri');
    if (hospital?.sat) days.push('Sat');
    if (hospital?.sun) days.push('Sun');

    return days
  };

  const handleLogin = () => {
    setAuthModalVisible(false);
    navigation.replace('Login', { returnTo: 'HospitalAppointment', id: id });
  };

  const handleBookAppointment = (facilities: any, facilityCategoryId: any, type: any) => {
    const token = getToken();
    if (!token) {
      setAuthModalVisible(true);
      return;
    }
    navigation.navigate('HospitalAppointment', {
      hospitalId: id,
      Name: hospital?.name,
      Image: hospital?.image,
      address: hospital?.address,
      phoneNumber: hospital?.phoneNumber,
      facilitiesL: facilities,
      type: type,
      facilityCategoryId: facilityCategoryId,
      getWorkingDay: getWorkingDays
    });
  };

  const handleDoctorPress = (doctorId: string) => {
    navigation.navigate('DoctorProfile', { doctorId });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0C53B7" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfileHeader
          name={hospital?.name || ''}
          address={hospital?.address}
          phoneNumber={hospital?.phoneNumber}
          coverImage={hospital?.coverImage}
          image={hospital?.image}
          openingTime={hospital?.openingTime}
          closingTime={hospital?.closingTime}
          iconName="medical"
        />

        <View style={styles.tabsContainer}>
          {tabs.map(tab => (
            <TabButton
              key={tab.id}
              title={tab.title}
              isActive={activeTab === tab.id}
              onPress={() => setActiveTab(tab.id)}
            />
          ))}
        </View>

        <View style={styles.contentSection}>
          {tabLoading ? (
            <ActivityIndicator size="small" color="#0C53B7" />
          ) : (
            <>
              {activeTab === 'paramedical' && (
                <>
                  <Text style={styles.sectionTitle}>Paramedical Services</Text>
                  <ParamedicalServiceCard
                    facilities={paramedicalFacilities}
                    onBookAppointment={() => handleBookAppointment(paramedicalFacilities, '', 'paramedical')}
                  />
                </>
              )}

              {activeTab === 'radiology' && (
                <>
                  <Text style={styles.sectionTitle}>Radiology Department</Text>
                  {radiologyFacilities.length > 0 ? (
                    radiologyFacilities.map((category) => (
                      <RadiologyCard
                        key={category.facilityCategoryId}
                        category={category}
                        onBookAppointment={() => handleBookAppointment(
                          category.radiologyFacilities,
                          category.facilityCategoryId,
                          'radiology'
                        )}
                      />
                    ))
                  ) : (
                    <View style={styles.noContentContainer}>
                      <Text style={styles.noContentText}>No radiology services available</Text>
                    </View>
                  )}
                </>
              )}

              {activeTab === 'doctors' && (
                <>
                  <Text style={styles.sectionTitle}>Our Doctors</Text>
                  {doctors.length > 0 ? (
                    <View style={styles.doctorsGrid}>
                      {doctors.map((doctor) => (
                        <View key={doctor.doctorId} style={styles.doctorCardWrapper}>
                          <DoctorCard
                            name={doctor.name}
                            image={doctor.image}
                            field={doctor.field}
                            experience={doctor.experience}
                            rating={doctor?.rating}
                            onPress={() => handleDoctorPress(doctor.doctorId)}
                          />
                        </View>
                      ))}
                    </View>
                  ) : (
                    <View style={styles.noContentContainer}>
                      <Text style={styles.noContentText}>No doctors available</Text>
                    </View>
                  )}
                </>
              )}
            </>
          )}
        </View>
        <AuthRequiredModal
          visible={authModalVisible}
          onClose={() => setAuthModalVisible(false)}
          onLogin={handleLogin}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HospitalProfile;