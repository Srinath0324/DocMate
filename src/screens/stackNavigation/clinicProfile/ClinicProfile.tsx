import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { getClinicById, getClinicDoctors } from '../../../services/Get';
import DoctorCard from '../../../components/doctorCard/DoctorCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles';
import ProfileHeader from '../../../components/ProfileHeader/ProfileHeader';

interface Clinic {
  clinicId: string;
  name: string;
  address: string;
  phoneNumber: string;
  openingTime: string;
  closingTime: string;
  image: string | null;
  coverImage: string | null;
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

const ClinicProfile = ({ route, navigation }: any) => {
  const { id } = route.params;
  const [clinic, setClinic] = useState<Clinic | null>(null);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClinicDetails();
    fetchClinicDoctors();
  }, [id]);

  const fetchClinicDetails = async () => {
    try {
      const data = await getClinicById(id);
      setClinic(data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchClinicDoctors = async () => {
    try {
      const data = await getClinicDoctors(id);
      console.log('Clinic Data:', data);
      setDoctors(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
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
          name={clinic?.name || ''}
          address={clinic?.address}
          phoneNumber={clinic?.phoneNumber}
          coverImage={clinic?.coverImage}
          image={clinic?.image}
          openingTime={clinic?.openingTime}
          closingTime={clinic?.closingTime}
          iconName="medical"
        />

        <View style={styles.doctorsSection}>
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
            <View style={styles.noDoctorsContainer}>
              <Text style={styles.noDoctorsText}>No doctors available for this clinic</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ClinicProfile;