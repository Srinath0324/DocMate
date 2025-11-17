import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  timeSlotContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
    justifyContent: 'space-between',
  },
  horizontalScrollView: {
    paddingBottom: 8,
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
  selectedSlot: {
    backgroundColor: '#0066CC',
    borderWidth: 0,
  },
  selectedSlotText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  noTimeSlotsText: {
    textAlign: 'center',
    color: '#757575',
    marginVertical: 20,
    fontStyle: 'italic',
  },
});

export default styles;
