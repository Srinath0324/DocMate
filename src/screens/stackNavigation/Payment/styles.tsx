import { StyleSheet, Dimensions } from 'react-native';
import Theme from '../../../theme/Theme';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.colors.white,
        padding: 20,
    },
    scrollViewContent: {
        flexGrow: 1,
        paddingBottom: 20,
    },
    header: {
        marginTop: 10,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#0066CC',
        textAlign: 'center',
    },
    qrContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 30,
        padding: 20,
        backgroundColor: '#E6F0F9', 
        borderRadius: 15,
        shadowColor: Theme.colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#D0E1F2', 
    },
    qrImage: {
        width: width * 1,
        height: width * 0.7,
        resizeMode: 'contain',
    },
    uploadedImageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
        padding: 15,
        paddingHorizontal:50,
        backgroundColor: '#E6F0F9', 
        borderRadius: 15,
        shadowColor: Theme.colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        height: height * 0.40, 
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#D0E1F2', 
    },
    uploadedImage: {
        width: width * 0.85,
        height: height * 0.34,
        resizeMode: 'contain',
        borderRadius: 8,
    },
    infoText: {
        textAlign: 'center',
        color: '#0066CC',
        fontSize: 14,
        fontWeight: '500',
    },
    buttonsContainer: {
        marginTop: 20,
        gap: 15,
    },
});

export default styles;
