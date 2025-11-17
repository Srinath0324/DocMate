import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  welcomeText: {
    flex: 1,
  },
  welcomeLabel: {
    fontSize: 16,
    color: '#6c757d',
    marginBottom: 4,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0066CC',
    marginBottom: 2,
  },
  specialization: {
    fontSize: 14,
    color: '#6c757d',
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#0066CC', // Changed from #dc3545 to match the theme
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0066CC',
  },
  appointmentCount: {
    fontSize: 14,
    color: '#6c757d',
  },
  latestAppointmentCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  onlineCard: {
    backgroundColor: '#E6F0FF', // Lighter shade of #0066CC
  },
  onsiteCard: {
    backgroundColor: '#CCE0FF', // Another shade that complements #0066CC
  },
  appointmentTypeIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    backgroundColor: '#0066CC', // Changed to match the theme color
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  typeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  appointmentCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  patientName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0066CC',
  },
  appointmentTime: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6c757d',
  },
  appointmentDate: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 4,
  },
  appointmentReason: {
    fontSize: 12,
    color: '#6c757d',
    fontStyle: 'italic',
  },
  emptyText: {
    textAlign: 'center',
    color: '#6c757d',
    fontSize: 14,
    fontStyle: 'italic',
    padding: 20,
  },
});

export default styles;