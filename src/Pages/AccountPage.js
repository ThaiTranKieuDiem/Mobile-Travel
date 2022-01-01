import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import LottieView from 'lottie-react-native';
import CustomerAccount from './Customer/CustomerAccount';
import CustomerNoLogin from './Customer/CustomerNoLogin';
import {useIsFocused} from '@react-navigation/native';

function Account(props) {
  const {navigation, route} = props;
  const [loading, setLoading] = useState(false);
  const [logout, setLogout] = useState(false);
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [checkAlreadyLogin, setCheckLoin] = useState(false);
  const [name, setName] = useState('');

  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchApi = () => {
      setTimeout(() => {
        AsyncStorage.getItem('accessTokenCustomer')
          .then(value => {
            if (value !== null) {
              const obj = JSON.parse(value);
              setName(obj.data.customerName);
              setCheckLoin(true);
              setLoadingLogin(true);
              //setName()
            } else {
              setCheckLoin(false);
              setLoadingLogin(true);
            }
          })
          .catch(err => {
            console.log(err);
            setCheckLoin(false);
            setLoadingLogin(true);
          });
      }, 1000);
    };
    fetchApi();
  }, [isFocused]);

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
  const handleClickLogout = () => {
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
  const handleClickBookedCancel = () => {
    navigation.navigate('BookedCancelPage');
  };
  ///
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
          onClickTourBookedCancel={handleClickBookedCancel}
          name={name}
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
