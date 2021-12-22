import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconIon from 'react-native-vector-icons/Ionicons';
import IconFont5 from 'react-native-vector-icons/FontAwesome5';
import IconAnt from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import LottieView from 'lottie-react-native';
import CustomerAccount from './Customer/CustomerAccount';
import CustomerNoLogin from './Customer/CustomerNoLogin';

function Account(props) {
  const {navigation, route} = props;
  const [loading, setLoading] = useState(false);
  const [logout, setLogout] = useState(false);
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [checkAlreadyLogin, setCheckLoin] = useState(false);


  setTimeout(async () => {
    setLoadingLogin(true);
    await AsyncStorage.getItem('accessTokenCustomer')
      .then(value => {
        if (value !== null) {
          setCheckLoin(true);
        } else {
          setCheckLoin(false);
        }
      })
      .catch(err => {
        console.log(err);
        setCheckLoin(false);
      });
  }, 3000);

  if (loadingLogin === false) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
        }}>
        <LottieView
          source={require('../asset/animation/84272-loading-colour.json')}
          autoPlay
          loop
        />
      </View>
    );
  }
  const handleClickLogout = async () => {
    setLoading(true);
    setTimeout(() => {
      try {
        AsyncStorage.clear();
        setLogout(true);
        setLoading(false);
        navigation.navigate('LoginPage');
      } catch (error) {
        console.log(error);
        setLoading(false);
        setLogout(false);
      }
    }, 3000);
  };
  const handleClickInfo = () => {
    navigation.navigate('InformationCustomer');
  };

  const handleClickLogin = () => {
    navigation.navigate('LoginPage');
  };

  const handleClickRegister = () => {
    navigation.navigate('RegisterPage');
  };
  if (checkAlreadyLogin) {
    return (
      <View style={{flex: 1}}>
        <Spinner
          visible={loading}
          textContent=""
          textStyle={{color: '#FFF'}}
          animation="fade"
          style={{
            justifyContent: 'center',
            textAlign: 'center',
            paddingTop: 30,
            backgroundColor: '#ecf0f1',
            padding: 8,
          }}
        />
        <CustomerAccount
          onClickLogout={handleClickLogout}
          onClickInfo={handleClickInfo}
        />
      </View>
    );
  }
  return (
    <CustomerNoLogin
      onClickLogin={handleClickLogin}
      onClickRegister={handleClickRegister}
    />
  );
}

export default Account;
