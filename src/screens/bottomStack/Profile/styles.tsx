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
    backgroundColor: '#f8f9fa',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  formContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingBottom: 40,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
    fontWeight: '500',
  },
  inputField: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#e1e6ef',
  },
  disabledInput: {
    backgroundColor: '#f5f5f5',
    opacity: 0.8,
  },
  inputIcon: {
    marginRight: 10,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    marginBottom: 24,
    gap: 10, 
  },
  cancelButton: {
    width: '48%', 
    borderColor: '#0066CC',
  },
  saveButton: {
    width: '48%',
  },
  logoutButton: {
    marginTop: 10,
    borderColor: '#FF3B30',
  },
  logoutText: {
    color: '#FF3B30',
  },

  // dependent styles
  dependentContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 15,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    paddingTop: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  emptyText: {
    color: '#666',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
  },
  emptySubText: {
    color: '#999',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
  marginv5:{
    marginVertical: 5,
  }
});


export default styles;