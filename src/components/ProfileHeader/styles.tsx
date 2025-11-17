import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  coverImageContainer: {
    height: 180,
    width: '100%',
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  logoContainer: {
    position: 'relative',
    top: -50,
    alignSelf: 'center',
    marginBottom: -30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },
  logoPlaceholder: {
    backgroundColor: '#D1E9FC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 15,
    color: '#666',
    marginLeft: 8,
    flex: 1,
  },
  contactButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 16,
  },
  contactButton: {
    flex: 0.48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0066CC',
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 4,
  },
  mapButton: {
    backgroundColor: '#00A86B',
  },
  contactButtonIconContainer: {
    marginRight: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 15,
  },
  hoursContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginTop: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  hoursItem: {
    flex: 1,
    alignItems: 'center',
  },
  hoursDivider: {
    width: 1,
    height: '70%',
    backgroundColor: '#E0E0E0',
    marginHorizontal: 10,
  },
  hoursLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  hoursValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0066CC',
  },
});

export default styles;
