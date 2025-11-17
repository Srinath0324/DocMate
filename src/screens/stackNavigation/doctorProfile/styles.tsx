import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  profileSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: 'white',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    marginRight: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f5f5f5',
    borderWidth: 2,
    borderColor: '#0066CC',
  },
  profileInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0066CC',
  },
  specialization: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  ratingText: {
    fontSize: 14,
    color: '#555',
    marginLeft: 4,
  },
  detailsContainer: {
    marginTop: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  detailIcon: {
    marginRight: 8,
    width: 16,
    alignItems: 'center',
  },
  detailText: {
    fontSize: 14,
    color: '#444',
  },
  onlineConsultTag: {
    backgroundColor: '#e3f2fd',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#0066CC',
  },
  onlineConsultText: {
    fontSize: 12,
    color: '#0066CC',
    fontWeight: '500',
  },
  description: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  hospitalsContainer: {
    padding: 16,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0066CC',
  },
  buttonScrollView: {
    flexDirection: 'row',
    paddingVertical: 4,
  },
  locationButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    minWidth: 120,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  activeButton: {
    backgroundColor: '#0066CC',
    borderColor: '#0066CC',
  },
  inactiveButton: {
    backgroundColor: '#fff',
    borderColor: '#e0e0e0',
  },
  buttonText: {
    fontSize: 14,
  },
  activeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  inactiveButtonText: {
    color: '#777',
  },
  availabilitySection: {
    paddingHorizontal: 16,
    paddingTop:16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    backgroundColor: '#fff',
  },
  availabilityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 5,
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
  timeText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  calendarButton: {
    padding: 8,
    backgroundColor: '#e3f2fd',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#0066CC20',
  },
  timeSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#0066CC',
    paddingLeft: 10,
  },
  timeSectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0066CC',
    marginLeft: 6,
  },
    horizontalScrollView: {
    paddingBottom: 8,
  },
  timeSlotContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
    justifyContent: 'space-between',
  },
  timeSlot: {
   width: (width - 64) / 3,
    height: 50,
    borderRadius: 10,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  availableSlot: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#0066CC',
  },
  pendingSlot: {
    backgroundColor: '#FFF8E1', 
    borderWidth: 1,
    borderColor: '#FF9800',
  },
  completeSlot: {
    backgroundColor: '#E8F5E9',
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  timeSlotText: {
    fontSize: 14,
    fontWeight: '500',
  },
  availableSlotText: {
    color: '#0066CC',
  },
  pendingSlotText: {
    color: '#FF9800',
  },
  completeSlotText: {
    color: '#757575',
  },
  selectedDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#e3f2fd',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#0066CC20',
  },
  selectedDateIcon: {
    marginRight: 8,
  },
  selectedDateText: {
    fontSize: 14,
    color: '#0066CC',
    fontWeight: '500',
  },
  noDateContainer: {
    padding: 16,
    marginTop: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderStyle: 'dashed',
    alignItems: 'center',
  },
  noDateText: {
    fontSize: 14,
    color: '#757575',
    textAlign: 'center',
  },
  timeSlotsWrapper: {
    backgroundColor: '#f8f9ff',
    padding: 12,
    marginTop: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  noTimeSlotsText: {
    textAlign: 'center',
    color: '#757575',
    marginVertical: 20,
    fontStyle: 'italic',
  },
  selectedSlot: {
    backgroundColor: '#0066CC',
    borderWidth: 0,
  },
  selectedSlotText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  clearButton: {
    padding: 4,
  },
  feeContainer: {
    marginTop: 10,
    backgroundColor: '#f8f9ff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#0066CC20',
  },
  feeText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0066CC',
  },
  bookAppointmentContainer: {
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  consultationTypeContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  consultationButtonsContainer: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 12,
  },
  consultationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#0066CC',
    backgroundColor: 'white',
    minWidth: 120,
    gap: 6,
  },
  activeConsultationButton: {
    backgroundColor: '#0066CC',
  },
  consultationButtonText: {
    color: '#0066CC',
    fontWeight: '500',
    fontSize: 14,
  },
  activeConsultationButtonText: {
    color: 'white',
  },
});

export default styles;