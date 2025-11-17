import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fcfcfc',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  statusContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  status: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  dateTime: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  contentContainer: {
    padding: 15,
  },
  doctorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  doctorImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 15,
    borderWidth: 2,
    borderColor: '#f0f0f0',
  },
  imagePlaceholder: {
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  doctorDetails: {
    flex: 1,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 2,
  },
  subInfo: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  facilityName: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
    alignItems: 'center',
  },
  fee: {
    fontSize: 15,
    fontWeight: '700',
    color: '#179C8C',
  },
  experience: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  facilityNameLarge: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 8,
    width: '70%'
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 14,
  },
  patientInfo: {
    paddingVertical: 10,
    backgroundColor: '#fcfcfc',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  patientRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  patientDetail: {
    flexDirection: 'row',
    flex: 1,
  },
  patientLabel: {
    fontSize: 14,
    color: '#666',
    marginRight: 4,
    fontWeight: '500',
  },
  patientValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
    flex: 1,
  },
  diseaseContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  diseaseValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
    flex: 1,
  },
  reviewButton: {
    backgroundColor: '#179C8C',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    alignSelf: 'center',
    shadowColor: '#179C8C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
    width: '80%',
  },
  reviewButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  reviewIcon: {
    marginRight: 8,
  },
  cancelButton: {
  marginTop: 10,
  backgroundColor: '#F44336',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: 10,
  paddingHorizontal: 16,
  borderRadius: 8,
},
cancelButtonText: {
  color: '#fff',
  fontSize: 14,
  fontWeight: '600',
},
cancelIcon: {
  marginRight: 8,
},
});

export default styles;