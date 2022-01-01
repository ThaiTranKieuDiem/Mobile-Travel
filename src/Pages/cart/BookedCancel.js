import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import TourCart from './../../components/Tour/TourCart';
import {useDispatch, useSelector} from 'react-redux';
import {unwrapResult} from '@reduxjs/toolkit';
import LottieView from 'lottie-react-native';
import {useIsFocused} from '@react-navigation/native';
import {MB_GetBookedByCustomer} from './../../Slice/SliceBookingTour';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import box from '../../asset/icons/iconViewPage/open-box.png';

function BookedCancel(props) {
  const {navigation} = props;
  ///
  const [checkAlreadyLogin, setCheckLoin] = useState(false);
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [user, setUser] = useState('');
  const [data, setData] = useState('');
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  ///
  useEffect(() => {
    setLoadingLogin(false);
    const fetchApi = () => {
      setTimeout(() => {
        AsyncStorage.getItem('accessTokenCustomer')
          .then(value => {
            if (value !== null) {
              const obj = JSON.parse(value);
              const params = {
                customerId: obj.data.customerId,
                isDelete: false,
              };
              setUser(obj.data.customerName);
              dispatch(MB_GetBookedByCustomer(params))
                .then(unwrapResult)
                .then(payload => {
                  setCheckLoin(true);
                  setLoadingLogin(true);
                  setData(payload);
                })
                .catch(error => {
                  console.log(error.message);
                  setLoadingLogin(true);
                  setCheckLoin(false);
                });
            } else {
              setLoadingLogin(true);
              setCheckLoin(false);
            }
          })
          .catch(err => {
            setLoadingLogin(true);
            setCheckLoin(false);
            console.log(err);
          });
      }, 1000);
    };
    fetchApi();
  }, [isFocused]);

  const handleClick = id => {
    console.log(id);
  };

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
          source={require('../../asset/animation/84272-loading-colour.json')}
          autoPlay
          loop
        />
      </View>
    );
  }
  if (data === null || data.length < 1) {
    return (
      <View style={{backgroundColor: '#f8f8f8', flex: 1}}>
        <StatusBar
          translucent
          barStyle="light-content"
          backgroundColor="rgba(0,0,0,0)"
        />
        <View style={style.header}>
          <Icon
            name="arrow-back-ios"
            size={28}
            color="#fff"
            onPress={navigation.goBack}
          />
          <Text
            style={{
              color: '#fff',
              fontSize: 23,
              fontFamily: 'Montserrat-Medium',
              width: '90%',
              textAlign: 'center',
            }}>
            Tour đã hủy
          </Text>
        </View>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Image source={box} style={{width: 200, height: 200}} />
          <Text style={style.text}>Bạn vẫn chưa hủy tour nào</Text>
        </View>
      </View>
    );
  }
  return (
    <SafeAreaView style={{backgroundColor: '#f8f8f8', flex: 1}}>
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor="rgba(0,0,0,0)"
      />
      <View style={style.header}>
        <Icon
          name="arrow-back-ios"
          size={28}
          color="#fff"
          onPress={navigation.goBack}
        />
        <Text
          style={{
            color: '#fff',
            fontSize: 23,
            fontFamily: 'Montserrat-Medium',
            width: '90%',
            textAlign: 'center',
          }}>
          Tour đã hủy
        </Text>
      </View>
      <View style={style.content}>
        <FlatList
          data={data}
          renderItem={({item}) => (
            <View>
              <TourCart
                booked={item}
                onClick={id => {
                  handleClick(item.bookingTourId);
                }}
              />
            </View>
          )}
          keyExtractor={item => item.bookingTourId}
        />
      </View>
    </SafeAreaView>
  );
}
const style = StyleSheet.create({
  header: {
    backgroundColor: '#87CEFA',
    justifyContent: 'flex-start',
    width: '100%',
    height: 130,
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#f8f8f8',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
  },
  text: {
    fontFamily: 'Poppins-Light',
    fontSize: 16,
    textAlign: 'center',
    color: '#000',
  },
});

export default BookedCancel;
