import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FB',
    },
    header: {
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTitle: {
        color: 'black',
        fontSize: 20,
        fontWeight: '700',
    },
    iconButton: {
        padding: 8,
    },
    contentContainer: {
        padding: 10,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 15,
    },
    patientRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 15,
    },
    patientName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    patientId: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    infoIcon: {
        width: 40,
        alignItems: 'center',
    },
    infoLabel: {
        fontSize: 14,
        color: '#666',
        width: 80,
    },
    infoValue: {
        fontSize: 15,
        color: '#333',
        fontWeight: '500',
        flex: 1,
    },
    divider: {
        height: 1,
        backgroundColor: '#EEE',
        marginVertical: 15,
    },
    diseaseSection: {
        marginTop: 5,
    },
    diseaseName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    diseaseDescription: {
        fontSize: 14,
        color: '#666',
        lineHeight: 21,
    },
    buttonsContainer: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        rowGap: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    videoCallButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0066CC',
        paddingVertical: 16,
        borderRadius: 12,
        marginBottom: 15,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 10,
    },
    cancelButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF',
        paddingVertical: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#FF3B30',
    },
    cancelText: {
        color: '#FF3B30',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 10,
    },
    badgeSuccess: {
        backgroundColor: '#4CD964',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 12,
        alignSelf: 'flex-start',
    },
    badgePending: {
        backgroundColor: '#FF9500',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 12,
        alignSelf: 'flex-start',
    },
    badgeText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '600',
    },
});

export default styles;
