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
import {useDispatch} from 'react-redux';
import {unwrapResult} from '@reduxjs/toolkit';
import LottieView from 'lottie-react-native';
import {useIsFocused} from '@react-navigation/native';
import {MB_GetBookedByCustomer} from './../../Slice/SliceBookingTour';
import AsyncStorage from '@react-native-async-storage/async-storage';
import box from '../../asset/icons/iconViewPage/open-box.png';
import CartNoLogin from './CartNoLogin';

function BookedCancel(props) {
  const {navigation} = props;
  ///
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [checkAlreadyLogin, setCheckLoin] = useState(false);
  const [data, setData] = useState('');
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [isLoading, setLoading] = useState(true);
  const [params, setParams] = useState({
    isDelete: false,
    Page: 1,
    limit: 10,
  });

  ///
  useEffect(() => {
    setLoadingLogin(false);
    if (isFocused !== true) {
      setParams({
        ...params,
        page: 1,
      });
    }
    const fetchApi = () => {
      setTimeout(() => {
        AsyncStorage.getItem('accessTokenCustomer')
          .then(value => {
            if (value !== null) {
              const obj = JSON.parse(value);
              setCheckLoin(true);
              dispatch(
                MB_GetBookedByCustomer(
                  Object.assign(params, {CustomerID: obj.data.customerId}),
                ),
              )
                .then(unwrapResult)
                .then(payload => {
                  setLoadingLogin(true);
                  setData(payload);
                  setLoading(false);
                })
                .catch(error => {
                  console.log(error.message);
                  setLoadingLogin(true);
                  setLoading(false);
                });
            } else {
              setLoadingLogin(true);
              setLoading(false);
              setCheckLoin(false);
            }
          })
          .catch(err => {
            setLoadingLogin(true);
            setCheckLoin(false);
            setLoading(false);
            console.log(err);
          });
      }, 1000);
    };
    fetchApi();
  }, [isFocused]);

  const handleClick = id => {
    navigation.navigate('InforMationTicket', {pID: id});
  };

  const handleClickLogin = () => {
    navigation.navigate('LoginPage');
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
  const ListEmptyComponent = () => {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          color: '#fff',
          paddingHorizontal: 15,
          height: 630,
          width: '100%',
        }}>
        <Image source={box} style={{width: 200, height: 200}} />
        <Text style={style.text}>Bạn vẫn chưa hủy tour nào</Text>
      </View>
    );
  };

  const handleLoadMore = () => {
    setParams({
      ...params,
      page: params.page + 1,
    });
    setLoading(true);
  };

  const renderFooter = () => {
    return isLoading && data.length > 2 ? (
      <View>
        <ActivityIndicator />
      </View>
    ) : null;
  };

  if (checkAlreadyLogin) {
    return (
      <SafeAreaView style={{backgroundColor: '#f8f8f8', flex: 1}}>
        <StatusBar translucent barStyle="dark-content" backgroundColor="#fff" />
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
          ListEmptyComponent={ListEmptyComponent}
          ListFooterComponent={renderFooter}
          onEndReached={handleLoadMore}
        />
      </SafeAreaView>
    );
  }
  return (
    <View style={{flex: 1}}>
      <CartNoLogin onClickNavigation={handleClickLogin} />
    </View>
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
  text: {
    fontFamily: 'Poppins-Light',
    fontSize: 16,
    textAlign: 'center',
    color: '#000',
  },
});

export default BookedCancel;
