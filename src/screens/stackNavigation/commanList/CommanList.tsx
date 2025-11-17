import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, ActivityIndicator } from 'react-native';
import { getLabsByCity, getHospitalsByCity, getClinicsByCity } from '../../../services/Get';
import FacilityCard from '../../../components/facilityCard/FacilityCard';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import CustomHeader from '../../../components/customHeader/CustomHeader';

const CommanList = ({ route, navigation }: any) => {
  const { facilityType, title } = route.params || { facilityType: 'lab', title: 'Facilities' };
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, [facilityType]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      let result;
      switch (facilityType) {
        case 'lab':
          result = await getLabsByCity();
          break;
        case 'hospital':
          result = await getHospitalsByCity();
          break;
        case 'clinic':
          result = await getClinicsByCity();
          break;
        default:
          throw new Error('Invalid facility type');
      }

      setData(result?.data || []);
    } catch (err: any) {
      setError(err.toString());
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }: { item: any }) => {
    return (
      <FacilityCard
        name={item.name}
        image={item.image}
        openingTime={item.openingTime}
        closingTime={item.closingTime}
        phone={item.phoneNumber || item.contactNumber || ""}
        doctorCount={facilityType === 'hospital' ? item.doctorCount : undefined}
        type={facilityType}
        onPress={() => {
          navigation.navigate(facilityType === 'lab' ? 'LabProfile' : facilityType === 'hospital' ? 'HospitalProfile' : 'ClinicProfile', {
            id: item.clinicId || item.hospitalId || item.labId,
          });
        }}
      />
    );
  };

  if (error) {
    return (
      <View style={{ flex: 1 }}>
        <CustomHeader title={title} onBackPress={() => navigation.goBack()} />
        <View style={styles.centerContainer}>
          <Ionicons name="alert-circle-outline" size={48} color="#FF6B6B" />
          <Text style={styles.errorText}>Something went wrong</Text>
          <Text style={styles.errorSubtext}>{error}</Text>
        </View>
      </View>
    );
  }

  if (data.length === 0 && !loading) {
    return (
      <View style={{ flex: 1 }}>
        <CustomHeader title={title} onBackPress={() => navigation.goBack()} />
        <View style={styles.centerContainer}>
          <Ionicons name="search-outline" size={48} color="#999" />
          <Text style={styles.emptyText}>No {facilityType}s found</Text>
          <Text style={styles.emptySubtext}>Try changing your search criteria</Text>
        </View>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={{ flex: 1 }}>
        <CustomHeader title={title} onBackPress={() => navigation.goBack()} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0066CC" />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CustomHeader title={title} onBackPress={() => navigation.goBack()} />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.clinicId || item.hospitalId || item.labId}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default CommanList;