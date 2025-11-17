import { Dimensions, StyleSheet } from "react-native";
const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginVertical: 10
  },
  facilityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  facilityName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  facilityTypeTag: {
    position: 'absolute',
    right: 16,
    top: 16,
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  facilityTypeText: {
    fontSize: 12,
    color: '#0066CC',
    fontWeight: '500',
  },
  facilityFee: {
    fontSize: 15,
    fontWeight: '500',
    color: '#0066CC',
    marginTop: 4,
  },
  noFacilitiesContainer: {
    padding: 20,
    alignItems: 'center',
  },
  noFacilitiesText: {
    fontSize: 16,
    color: '#666',
  },
  availabilitySection: {
    borderTopWidth: 1, 
    borderTopColor: '#f0f0f0',
    paddingHorizontal: 20,
  },
  availabilityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  calendarButton: {
    padding: 8,
    backgroundColor: '#e3f2fd',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#0066CC20',
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  dayTag: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#e3f2fd',
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: '#0066CC20',
  },
  dayText: {
    fontSize: 12,
    color: '#0066CC',
    fontWeight: '500',
  },
  bookAppointmentContainer: {
    marginBottom: 16,
    paddingHorizontal: 20,
  },
});

export default styles;
