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
  doctorsSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 16,
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
  noDoctorsContainer: {
    padding: 20,
    alignItems: 'center',
  },
  noDoctorsText: {
    fontSize: 16,
    color: '#666',
  },
});

export default styles;