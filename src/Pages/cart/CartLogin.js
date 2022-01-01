import React, {useEffect} from 'react';
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
import cart from '../../asset/icons/iconTravelItem/shopping-cart.png';

function CartLogin(props) {
  const {onClick, data, user} = props;

  const handleClick = id => {
    if (onClick) {
      onClick(id);
    }
  };

  if (data === null || data.length < 1) {
    return (
      <SafeAreaView style={{backgroundColor: '#f8f8f8', flex: 1}}>
        <StatusBar
          translucent
          barStyle="light-content"
          backgroundColor="rgba(0,0,0,0)"
        />
        <View style={style.header}>
          <View
            style={{
              alignItems: 'center',
              width: '100%',
            }}>
            <Text
              style={{
                color: '#fff',
                fontSize: 23,
                fontFamily: 'Montserrat-Medium',
              }}>
              Đơn hàng đã đặt
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            color: '#fff',
            paddingHorizontal: 15,
          }}>
          <Image source={cart} style={{width: 250, height: 250}} />
          <Text style={style.text}>{user} ơi! Bạn vẫn chưa có tour nào!</Text>
          <Text style={style.text}>
            Hãy nhanh tay đặt ngay để trải nghiệm những dịch vụ của Mytour nhé{' '}
          </Text>
        </View>
      </SafeAreaView>
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
        <View
          style={{
            alignItems: 'center',
            width: '100%',
          }}>
          <Text
            style={{
              color: '#fff',
              fontSize: 23,
              fontFamily: 'Montserrat-Medium',
            }}>
            Tour đã đặt
          </Text>
        </View>
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
    padding: 20,
    justifyContent: 'flex-start',
    width: '100%',
    alignItems: 'flex-end',
    height: 100,
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#f8f8f8',
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

export default CartLogin;
