import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  TouchableOpacity,
} from 'react-native';
import bell from '../../asset/icons/iconViewPage/bell.png';
import NotificationDetails from './NotificationDetails';
import {useDispatch} from 'react-redux';
import {Cli_PromotionDetails} from './../../Slice/SlicePromotion';
import {unwrapResult} from '@reduxjs/toolkit';

function Notification(props) {
  const {promotion} = props;
  let rotateValueHolder = new Animated.Value(0);
  const [animated, setAnimated] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [promotionDetails, setPromotionDetails] = useState({});
  //
  const dispatch = useDispatch();

  const startImageRotate = id => {
    rotateValueHolder.setValue(0);
    Animated.timing(rotateValueHolder, {
      toValue: 1,
      duration: 10,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => {
      if (animated === true) {
        startImageRotate;
        handleClickShow(id);
      }
    });
  };
  const RotateData = rotateValueHolder.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-60deg'],
  });
  const handleClickShow = id => {
    const params = {
      pID: id,
    };
    dispatch(Cli_PromotionDetails(params))
      .then(unwrapResult)
      .then(payload => {
        console.log(payload);
        setPromotionDetails(payload);
        setModalVisible(true);
      })
      .catch(err => console.log(err));
  };
  const handleClickClose = () => {
    setModalVisible(false);
  };

  return (
    <View style={{marginBottom: 5}}>
      <NotificationDetails
        onClickClose={handleClickClose}
        modalVisible={modalVisible}
        promotionDetails={promotionDetails}
      />
      <TouchableOpacity
        style={{backgroundColor: '#EBF3FF', padding: 10}}
        onPress={id => {
          startImageRotate(promotion.promotionId);
        }}>
        <View style={style.box}>
          <Animated.Image
            source={bell}
            style={{width: 40, height: 40, transform: [{rotate: RotateData}]}}
          />
          <Text style={style.text} numberOfLines={2}>
            {promotion.promotionName}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
  box: {
    flexDirection: 'row',
    padding: 10,
  },
  text: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'Poppins-Light',
    marginLeft: 10,
    width: '85%',
  },
});
export default Notification;
