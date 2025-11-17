import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    submitButtonContainer: {
        paddingHorizontal: 16,
        paddingVertical: 20,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },
    availabilitySection: {
        padding: 16,
        backgroundColor: '#fff',
        marginBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    availabilityHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
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
        marginTop: 16,
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
        marginTop: 16,
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
    horizontalScrollView: {
        paddingBottom: 8,
    },
    timeSlotContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 16,
        justifyContent: 'space-between',
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
    clearButton: {
        padding: 4,
    },
})

export default styles;