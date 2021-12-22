import React, {Fragment, Component} from 'react';
import {StyleSheet, View, Image, StatusBar} from 'react-native';
import Swiper from 'react-native-swiper';

const banner = [
  {id: 1, image: require('../../asset/banner/18122_Vietnam.jpg')},
  {id: 2, image: require('../../asset/banner/hoi_an_ve_dem7.jpg')},
  {
    id: 3,
    image: require('../../asset/banner/photo1614476010927-16144760111002110990928.jpg'),
  },
];

function Banner() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Swiper
        loop
        autoplay
        dot={
          <View
            style={{
              width: 10,
              height: 3,
              margin: 5,
              backgroundColor: 'white',
            }}
          />
        }
        activeDot={
          <View
            style={{
              width: 10,
              height: 3,
              margin: 5,
              backgroundColor: '#ff4500',
            }}
          />
        }>
        {banner.map(item => {
          return (
            <View key={item.id}>
              <Image style={styles.image} source={item.image} />
            </View>
          );
        })}
      </Swiper>
      <View style={styles.color}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 180,
    paddingLeft: 15,
    paddingRight: 15,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  image: {
    height: 170,
    resizeMode: 'cover',
  },
  color: {
    backgroundColor: '#ff4500',
    height: 4,
    width: '100%',
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 10,
  },
});

export default Banner;
