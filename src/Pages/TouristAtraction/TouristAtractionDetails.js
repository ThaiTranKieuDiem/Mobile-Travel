import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {Cli_GetTouristAttrDetails} from './../../Slice/SliceTouristAttrac';
import {unwrapResult} from '@reduxjs/toolkit';
import {
  ImageHeaderScrollView,
  TriggeringView,
} from 'react-native-image-header-scroll-view';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LottieView from 'lottie-react-native';
import Swiper from 'react-native-swiper';

function TouristAtractionDetails(props) {
  const {navigation, route} = props;
  const baseURL = 'http://192.168.20.101:8000/ImagesTouristAttractions/';
  //
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageList, setImageList] = useState([]);
  //
  const dispatch = useDispatch();
  //
  const {touristAttrId} = route.params;

  useEffect(() => {
    dispatch(Cli_GetTouristAttrDetails(touristAttrId))
      .then(unwrapResult)
      .then(payload => {
        setData(payload);
        console.log(payload);
        setLoading(false);
        if (payload.imagesList === null) {
          setImageList([]);
        } else {
          const re = '||';
          let arrayObj = String(payload.imagesList).split(re);
          arrayObj.pop();
          arrayObj.map(item =>
            setImageList(prev => prev.concat(baseURL + item)),
          );
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  if (loading) {
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

  return (
    <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor="rgba(0,0,0,0)"
      />
      <ImageHeaderScrollView
        maxHeight={300}
        minHeight={75}
        headerImage={{uri: imageList[0]}}
        renderForeground={() => (
          <Swiper
            loop
            autoplay
            style={{height: 300}}
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
            {imageList.map((item, index) => {
              return (
                <View key={index}>
                  <Image style={style.image} source={{uri: item}} />
                </View>
              );
            })}
          </Swiper>
        )}>
        <TriggeringView>
          <View style={style.content}>
            <View>
              <Text style={style.textName}>{data.touristAttrName}</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Icon
                  name="place"
                  size={28}
                  color="#003d71"
                  style={{marginRight: 5}}
                />
                <Text style={style.textProvince}>{data.provinceName}</Text>
              </View>
            </View>
            <View style={{marginTop: 10}}>
              <Text
                style={[
                  style.textDescription,
                  {
                    fontFamily: 'Poppins-Medium',
                    color: '#003d71',
                    fontSize: 20,
                  },
                ]}>
                Chi tiết địa điểm tham quan
              </Text>
              <Text style={style.textDescription}>{data.description}</Text>
            </View>
          </View>
        </TriggeringView>
      </ImageHeaderScrollView>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  content: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    flex: 2,
  },
  textName: {
    color: '#000',
    fontFamily: 'Pacifico-Regular',
    fontSize: 30,
    color: '#003d71',
  },
  textProvince: {
    color: '#003d71',
    fontFamily: 'Pacifico-Regular',
    fontSize: 20,
  },
  textDescription: {
    color: 'rgb(45,66,113)',
    fontFamily: 'Poppins-Light',
    fontSize: 18,
    lineHeight: 30,
  },
  image: {
    height: 300,
    resizeMode: 'cover',
  },
});

export default TouristAtractionDetails;
