import { Dimensions, StyleSheet } from 'react-native';
const windowWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: 16,
    },
    headerText: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 30,
        textAlign: 'center',
    },
    section: {
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 15,
    },
    starContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    star: {
        marginHorizontal: 5,
    },
    feedbackContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    feedbackBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 10,
        padding: 12,
        width: windowWidth * 0.4,
        marginHorizontal: 10,
    },
    feedbackBtnSelected: {
        backgroundColor: '#e8f4ff',
        borderColor: '#0066CC',
    },
    feedbackText: {
        marginLeft: 8,
        fontSize: 16,
    },
    satisfactionText: {
        fontSize: 16,
        marginBottom: 15,
        textAlign: 'center',
    },
    optionsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    optionButton: {
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 10,
        padding: 12,
        width: windowWidth * 0.4,
        alignItems: 'center',
        marginHorizontal: 10,
    },
    optionButtonSelected: {
        backgroundColor: '#e8f4ff',
        borderColor: '#0066CC',
    },
    optionText: {
        fontSize: 16,
    },
    textInputContainer: {
        marginVertical: 20,
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 10,
        padding: 12,
        height: 120,
        textAlignVertical: 'top',
    },
    submitButton: {
        backgroundColor: '#007bff',
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
        marginTop: 20,
    },
    submitButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});
