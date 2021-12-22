import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {formatPrice} from './../../utils/FormatNumber';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

function TourItem(props) {
  const {tour} = props;

  const navigation = useNavigation();

  const handelClickBox = tourId => {
    const params = {
      TourId: tourId,
      // tiếp tục prrams cho nay
    };
    console.log(params);
    navigation.navigate('TourDetails', {tourId: params});
    /*      */
  };
  const textRating = rating => {
    //let text = '';
    if (rating >= 4) return (text = 'Tuyệt vời');
    if (rating >= 3) return (text = 'Tốt');
    if (rating >= 2) return (text = 'Tạm ổn');
    else return (text = 'Trung bình');
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => {
          handelClickBox(tour.tourId);
        }}>
        <View style={styles.box}>
          <Image style={styles.image} source={{uri: `${tour.tourImg}`}} />
          <Text style={styles.promotion}>-10%</Text>
          <Text style={styles.prince}>{formatPrice(tour.adultUnitPrice)}</Text>
          <View
            style={{
              flexDirection: 'row',
              position: 'absolute',
              top: 100,
              left: 5,
            }}>
            <Text style={styles.rate}>{tour.rating}</Text>
            <Text style={{color: '#fff', fontFamily: 'Poppins-Medium'}}>
              {' '}
              - {textRating(tour.rating)}
            </Text>
          </View>
          <View style={{lineHeight: 40}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.text}>{tour.dateStart}</Text>
              <Text style={styles.text}>
                {' '}
                - {tour.time}N{tour.time - 1}Đ
              </Text>
            </View>
            <Text numberOfLines={2} style={styles.name}>
              {tour.tourName}
            </Text>
            <View style={styles.place}>
              <Icon name="place" color="#000" size={20} />
              <Text style={styles.location}>{tour.provinceName}</Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {backgroundColor: '#fff'},
  box: {
    overflow: 'hidden',
    width: 170,
    borderTopLeftRadius: 10,
    position: 'relative',
    marginHorizontal: 10,
    height: 320,
  },
  promotion: {
    width: 70,
    height: 70,
    position: 'absolute',
    backgroundColor: 'rgba(254,46,100,0.8)',
    borderRadius: 50,
    textAlign: 'center',
    top: -25,
    left: -10,
    lineHeight: 80,
    color: '#fff',
    fontWeight: '700',
    fontSize: 20,
  },
  image: {
    width: 170,
    height: 170,
    borderRadius: 10,
  },
  rate: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    width: 40,
    height: 25,
    lineHeight: 25,
    borderRadius: 5,
    backgroundColor: '#00bfff',
  },
  name: {
    color: '#000',
    fontSize: 16,
    overflow: 'hidden',
    fontFamily: 'Poppins-Medium',
    marginBottom: 5,
  },
  text: {
    color: '#000',
    fontSize: 15,
    fontFamily: 'Poppins-Light',
  },
  place: {
    fontSize: 16,
    flexDirection: 'row',
  },
  location: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
  prince: {
    position: 'absolute',
    top: 130,
    fontSize: 16,
    left: 5,
    color: '#fff',
    backgroundColor: 'rgba(0,0,0, 0.5)',
    borderRadius: 8,
    paddingLeft: 8,
    paddingRight: 8,
    fontFamily: 'Poppins-Medium',
  },
});

export default TourItem;
