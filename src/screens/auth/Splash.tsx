import React, { useEffect } from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import Theme from '../../theme/Theme';
import { getDataFromCachedWithKey } from '../../utils/cacheData';
import { AsyncKeyLiterals } from '../../utils/Constants';
import { saveToken, saveUserId } from '../../api/api';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const SplashScreen = ({ navigation }: any) => {

  useEffect(() => {
    const checkTokenAndNavigate = async () => {
      const token = await getDataFromCachedWithKey(AsyncKeyLiterals.loginToken);
      const userId = await getDataFromCachedWithKey(AsyncKeyLiterals.userID);
      if (token && userId) {
        saveToken(token);
        saveUserId(userId);
      }
      setTimeout(() => {
        navigation.reset({
          index: 0,
          routes: [
            {
              name: 'BottomTabs',
            },
          ],
        });
      }, 2000);
    };
    checkTokenAndNavigate();
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={Theme.IMAGES.splashLogo} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: windowHeight,
    backgroundColor: 'white'
  },
  logo: {
    width: windowWidth,
    height: windowHeight / 2.3,
    marginTop: -windowHeight / 7,
  },
});
export default SplashScreen;
