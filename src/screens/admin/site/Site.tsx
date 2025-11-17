import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';
import { mockSites } from '../../../utils/Constants';

interface Site {
  id: string;
  name: string;
  image: string;
  address: string;
  timeDuration: string;
  doctorContact: string;
  doctorField: string;
  doctorType: string;
  aboutDoctor: string;
  specialization: string;
  fees: string;
  availableDays: string[];
  availableTime: string;
}

const Site: React.FC = ({navigation}:any) => {
  const [activeTab, setActiveTab] = useState<'clinics' | 'hospitals'>('clinics');

  const renderSiteCard = (site: Site) => (
    <TouchableOpacity key={site.id} style={styles.siteCard} onPress={() => navigation.navigate('Edit', { site })}>
      <Image source={{ uri: site.image }} style={styles.siteImage} />

      <View style={styles.cardContent}>
        <Text style={styles.siteName}>{site.name}</Text>

        <View style={styles.infoRow}>
          <Icon name="location-on" size={16} color="#0066CC" />
          <Text style={styles.infoText}>{site.address}</Text>
        </View>

        <View style={styles.infoRow}>
          <Icon name="access-time" size={16} color="#0066CC" />
          <Text style={styles.infoText}>{site.timeDuration}</Text>
        </View>

        <View style={styles.infoRow}>
          <Icon name="phone" size={16} color="#0066CC" />
          <Text style={styles.infoText}>{site.doctorContact}</Text>
        </View>

        <View style={styles.doctorSection}>
          <Text style={styles.sectionTitle}>Doctor Information</Text>

          <View style={styles.doctorGrid}>
            <View style={styles.doctorInfoItem}>
              <View style={styles.doctorInfoHeader}>
                <Icon name="medical-services" size={18} color="#0066CC" />
                <Text style={styles.doctorLabel}>Field</Text>
              </View>
              <Text style={styles.doctorValue}>{site.doctorField}</Text>
            </View>

            <View style={styles.doctorInfoItem}>
              <View style={styles.doctorInfoHeader}>
                <Icon name="attach-money" size={18} color="#0066CC" />
                <Text style={styles.doctorLabel}>Fees</Text>
              </View>
              <Text style={styles.feesText}>{site.fees}</Text>
            </View>
          </View>

          <View style={styles.aboutSection}>
            <Text style={styles.aboutLabel}>About Doctor</Text>
            <Text style={styles.aboutText}>{site.aboutDoctor}</Text>
          </View>
        </View>

        <View style={styles.availabilitySection}>
          <Text style={styles.sectionTitle}>Availability</Text>

          <View style={styles.daysContainer}>
            {site.availableDays.map((day) => (
              <View key={day} style={styles.dayChip}>
                <Text style={styles.dayText}>{day}</Text>
              </View>
            ))}
          </View>

          <View style={styles.timeRow}>
            <Icon name="schedule" size={16} color="#0066CC" />
            <Text style={styles.timeText}>{site.availableTime}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'clinics' && styles.activeTab]}
          onPress={() => setActiveTab('clinics')}
        >
          <Icon name="local-hospital" size={20} color={activeTab === 'clinics' ? '#fff' : '#0066CC'} />
          <Text style={[styles.tabText, activeTab === 'clinics' && styles.activeTabText]}>
            Clinics
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'hospitals' && styles.activeTab]}
          onPress={() => setActiveTab('hospitals')}
        >
          <Icon name="business" size={20} color={activeTab === 'hospitals' ? '#fff' : '#0066CC'} />
          <Text style={[styles.tabText, activeTab === 'hospitals' && styles.activeTabText]}>
            Hospitals
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {mockSites.map(renderSiteCard)}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Site;
