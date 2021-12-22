import React, {useEffect, useState} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {Cli_GetTouristAttrDetails} from './../../Slice/SliceTouristAttrac';
import {unwrapResult} from '@reduxjs/toolkit';
import {
  ImageHeaderScrollView,
  TriggeringView,
} from 'react-native-image-header-scroll-view';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LottieView from 'lottie-react-native';

function TouristAtractionDetails(props) {
  const {navigation, route} = props;
  //
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  //
  const dispatch = useDispatch();
  //
  const {touristAttrId} = route.params;
  console.log('touristAttrId', touristAttrId);

  useEffect(() => {
    dispatch(Cli_GetTouristAttrDetails(touristAttrId))
      .then(unwrapResult)
      .then(payload => {
        setData(payload);
        setLoading(false);
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
        minHeight={100}
        headerImage={{uri: data.imagesList}}>
        <TriggeringView style={style.content}>
          <View>
            <Text style={style.textName} numberOfLines={2}>
              {data.touristAttrName}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Icon
                name="place"
                size={28}
                color="#ffa500"
                style={{marginRight: 5}}
              />
              <Text style={style.textProvince}>{data.provinceName}</Text>
            </View>
          </View>
          <View style={{marginTop: 10}}>
            <Text
              style={[style.textDescription, {fontFamily: 'Poppins-Medium'}]}>
              Chi tiết địa điểm tham quan
            </Text>
            <Text style={style.textDescription}>{data.description}</Text>
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
  },
  textName: {
    color: '#000',
    fontFamily: 'Pacifico-Regular',
    fontSize: 30,
    color: '#ffa500',
  },
  textProvince: {
    color: '#ffa500',
    fontFamily: 'Poppins-Medium',
    fontSize: 20,
  },
  textDescription: {
    // color: '#000',
    fontFamily: 'Poppins-Light',
    fontSize: 18,
    lineHeight: 30,
  },
});

export default TouristAtractionDetails;
