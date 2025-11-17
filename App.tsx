/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, { useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import StackNavigator from './src/navigation/StackNavigator';
import { setNavigationReference } from './src/api/api';

function App(): React.JSX.Element {
  const navigationRef = useRef(null);
  
  // Set navigation reference for redirects on token expiration
  React.useEffect(() => {
    if (navigationRef.current) {
      setNavigationReference(navigationRef);
    }
  }, [navigationRef]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StackNavigator navigationRef={navigationRef} />
    </SafeAreaView>
  );
};

export default App;



