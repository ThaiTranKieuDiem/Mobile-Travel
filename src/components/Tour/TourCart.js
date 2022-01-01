import React from 'react';
import {StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {Image, View, Text} from 'react-native';
import IconAnt from 'react-native-vector-icons/AntDesign';
import {formatPrice} from './../../utils/FormatNumber';
import {useNavigation} from '@react-navigation/native';

function TourCart(props) {
  const {booked, onClick} = props;
  const navigation = useNavigation();

  const renderRating = rate => {
    var rating = [];
    for (let i = 0; i < rate; i++) {
      rating.push(<IconAnt key={i} name="star" color="#ffa500" size={20} />);
    }
    return <View style={{flexDirection: 'row'}}>{rating}</View>;
  };

  const handelClickBox = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <View style={style.container}>
      <TouchableWithoutFeedback onPress={handelClickBox}>
        <View style={style.box}>
          <Image
            source={{
              uri: booked.tourImg,
            }}
            style={{width: '100%', height: 200}}
          />
          <View
            style={{paddingHorizontal: 10, marginBottom: 10, marginTop: 10}}>
            <Text style={{fontFamily: 'Poppins-Light'}}>
              {booked.departurePlaceFrom}
            </Text>
            <Text style={style.textName}>{booked.tourName}</Text>
            {renderRating(5)}
            <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
              <Text style={style.text}>{booked.dateStart} - </Text>
              <Text style={style.text}>{booked.dateEnd}</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
              <Text style={style.text}>Ngày đặt: </Text>
              <Text style={style.text}>{booked.bookingDate}</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
              <Text
                style={[
                  style.text,
                  {textDecorationLine: 'line-through', color: '#ffa500'},
                ]}>
                {formatPrice(booked.totalMoneyBooking)}
              </Text>
              <Text style={[style.text]}> - </Text>
              <Text style={[style.text, {color: '#ffa500'}]}>
                {formatPrice(booked.totalMoney)}
              </Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  box: {
    backgroundColor: '#fff',
    width: '100%',
  },
  text: {
    color: '#000',
    fontFamily: 'Poppins-Light',
    fontSize: 16,
  },
  textName: {
    color: '#4682B4',
    fontFamily: 'Poppins-Medium',
    fontSize: 17,
  },
});

export default TourCart;
