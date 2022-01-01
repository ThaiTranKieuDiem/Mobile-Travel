import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CartNoLogin from './cart/CartNoLogin';
import CartLogin from './cart/CartLogin';
import {View} from 'react-native';
import {MB_GetBookedByCustomer} from './../Slice/SliceBookingTour';
import {useDispatch, useSelector} from 'react-redux';
import {unwrapResult} from '@reduxjs/toolkit';
import LottieView from 'lottie-react-native';
import {useIsFocused} from '@react-navigation/native';

function CartPage(props) {
  const {navigation} = props;
  const [checkAlreadyLogin, setCheckLoin] = useState(false);
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [user, setUser] = useState('');
  const [checkTotal, setCheckTotal] = useState(false);
  const [data, setData] = useState([]);
  //
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  useEffect(() => {
    setLoadingLogin(false);
    const fetchApi = () => {
      setData([]);
      setTimeout(() => {
        AsyncStorage.getItem('accessTokenCustomer')
          .then(value => {
            if (value !== null) {
              const obj = JSON.parse(value);
              setCheckLoin(true);
              setUser(obj.data.customerName);
              const params = {
                customerId: obj.data.customerId,
                isDelete: true,
              };
              dispatch(MB_GetBookedByCustomer(params))
                .then(unwrapResult)
                .then(payload => {
                  setLoadingLogin(true);
                  setData(payload);
                  console.log(params);
                  console.log(payload);
                })
                .catch(error => {
                  console.log(error.message);
                  setLoadingLogin(true);
                  setCheckLoin(false);
                });
            } else {
              setLoadingLogin(true);
              setCheckLoin(false);
              setCheckTotal(false);
            }
          })
          .catch(err => {
            setLoadingLogin(true);
            setCheckLoin(false);
            setCheckLoin(false);
            console.log(err);
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

  const handleClickLogin = () => {
    navigation.navigate('LoginPage');
  };
  const handleClickTour = id => {
    navigation.navigate('InforMationTicket', {pID: id});
  };

  if (checkAlreadyLogin) {
    return (
      <View style={{flex: 1}}>
        <CartLogin
          data={data}
          user={user}
          checkTotal={checkTotal}
          onClick={id => {
            handleClickTour(id);
          }}
        />
      </View>
    );
  } else {
    return (
      <View style={{flex: 1}}>
        <CartNoLogin onClickNavigation={handleClickLogin} />
      </View>
    );
  }
}

export default CartPage;
