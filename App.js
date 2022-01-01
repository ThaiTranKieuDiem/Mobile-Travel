/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Provider} from 'react-redux';
import store from './src/App/Store';
import {useEffect} from 'react';
import {useState} from 'react';
import LottieView from 'lottie-react-native';
import {View} from 'react-native';
import FlashMessage from 'react-native-flash-message';
import Navigation from './src/navigation/Navigation';

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
      <View style={{flex: 1}}>
        <Navigation />
        <FlashMessage
          icon="auto"
          duration={3000}
          style={{marginTop: 50}}
          animated
          animationDuration={500}
          floating={true}
          textStyle={{fontSize: 16, fontFamily:"Poppins-Medium"}}
        />
      </View>
    </Provider>
  );
}

export default App;
