/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigation from './src/navigation/StackNavigation';
import {Provider} from 'react-redux';
import store from './src/App/Store';
import {useEffect} from 'react';
import {useState} from 'react';
import LottieView from 'lottie-react-native';
import {View} from 'react-native';

function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(async () => {
      setLoading(false);
    }, 5700);
  }, []);
  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <LottieView
          source={require('./src/asset/animation/73046-stay-home.json')}
          autoPlay
          loop
        />
      </View>
    );
  }
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
