import { StyleSheet } from "react-native";

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
 
  hospitalName: {
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
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayTag: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    backgroundColor: '#e3f2fd',
    borderRadius: 12,
    marginRight: 3,
    borderWidth: 1,
    borderColor: '#0066CC20',
  },
  dayText: {
    fontSize: 12,
    color: '#0066CC',
    fontWeight: '500',
  },
  
 
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginVertical: 16,
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#0066CC',
  },
  tabText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#666',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  contentSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 16,
  },
  
  serviceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  
  categoryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  categoryHeader: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
  },
  facilityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  facilityRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  facilityRowName: {
    fontSize: 15,
    color: '#333',
    flex: 1,
    paddingRight: 8,
  },
  facilityRowFee: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0066CC',
  },
  doctorsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  doctorCardWrapper: {
    width: '48%',
    marginBottom: 15,
  },
  noContentContainer: {
    padding: 20,
    alignItems: 'center',
  },
  noContentText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default styles;
