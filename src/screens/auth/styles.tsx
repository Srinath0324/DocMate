import { StyleSheet, Dimensions } from 'react-native';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  // Theme Style
  imageContainer: {
    width: windowWidth,
    height: windowHeight / 3,
  },
  Contanier: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  innerContainer: {
    marginVertical:10,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20
  },
  baseText: {
    color: '#000000',
    fontSize: 16,
    alignSelf: 'center',
  },
  marginV10:{
   marginVertical:10
  },
   marginV5:{
   marginVertical:5
  },
  // SignIn Style
  welcomeText: {
    fontSize: 24,
    fontWeight: '400',
    color: 'black',
    textAlign:'center'
  },
  
  // New styles for text links
  textLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  normalText: {
    color: '#000000',
    fontSize: 16,
  },
  linkText: {
    color: '#0066CC',
    fontSize: 16,
    fontWeight: '500',
  },
  homeText: {
    color: '#0066CC',
    fontSize: 16,
    fontWeight: '500',
  },
 
  
});
export default styles;
