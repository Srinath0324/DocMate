import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  availabilitySection: {
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderTopColor: '#f0f0f0',
    borderTopWidth: 1
  },
  availabilityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0066CC',
  },
  calendarButton: {
    padding: 8,
    backgroundColor: '#e3f2fd',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#0066CC20',
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
    marginVertical: 15,
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
    marginVertical: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
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
  errorText: {
    color: '#FF5252',
    fontSize: 12,
    marginTop: 5,
  },
  clearButton: {
    padding: 4,
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
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
    marginLeft: 5
  },
});

export default styles;
