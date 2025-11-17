import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  sectionContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0066CC',
    marginBottom: 8,
  },
  
  // Detail Header Styles
  detailInfoContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  imageContainer: {
    marginRight: 16,
  },
  detailImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#f5f5f5',
    borderWidth: 2,
    borderColor: '#0066CC',
  },
  imagePlaceholder: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#e6f2ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  detailsContent: {
    flex: 1,
    justifyContent: 'center',
  },
  detailName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0066CC',
    marginBottom: 4,
  },
  specialization: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  experience: {
    fontSize: 14,
    color: '#555',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#555',
  },
  appointmentDetails: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#f8f9ff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#0066CC20',
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'center',
  },
  detailIcon: {
    marginRight: 8,
    width: 20,
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
    width: 60,
  },
  detailValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
    flex: 1,
  },
  
  // Info row for labs
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 6,
    flex: 1,
  },
  
  // Patient Info Form Styles
  radioContainer: {
    flexDirection: 'row',
    marginVertical: 16,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#0066CC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  radioSelected: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#0066CC',
  },
  radioLabel: {
    fontSize: 16,
    color: '#333',
  },
  dropdownContainer: {
    marginBottom: 16,
  },
  dropdownButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownButtonText: {
    fontSize: 16,
    color: '#333',
  },
  dropdownOverlay: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    maxHeight: 200,
    zIndex: 1000,
    elevation: 3,
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#333',
  },
  formContainer: {
    marginTop: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
  disabledInput: {
    backgroundColor: '#f5f5f5',
    borderColor: '#e0e0e0',
  },
});

export default styles;
