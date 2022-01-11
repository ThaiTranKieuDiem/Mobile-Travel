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
      tourID: tourId,
    };
    navigation.navigate('TourDetails', {tourID: params});
  };

  const promotion = (tour.adultUnitPrice * tour.promotion) / 100;
  const renderPromotion = () => {
    var promotion = [];
    if (tour.promotion !== null) {
      promotion.push(
        <Text style={styles.promotion} key={1}>
          {tour.promotion}%
        </Text>,
      );
      return (
        <View
          style={{
            width: 70,
            height: 70,
            position: 'absolute',
            backgroundColor: 'rgba(254,46,100,0.8)',
            borderRadius: 50,
            top: -25,
            left: -10,
          }}>
          {promotion}
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => {
          handelClickBox(tour.tourId);
        }}>
        <View style={styles.box}>
          <Image style={styles.image} source={{uri: `${tour.tourImg}`}} />
          {renderPromotion()}
          {tour.promotion && (
            <Text
              style={[
                styles.prince,
                {
                  textDecorationLine: 'line-through',
                  color: '#fff',
                  top: 100,
                  left: 5,
                },
              ]}>
              {formatPrice(tour.adultUnitPrice)}
            </Text>
          )}
          <Text style={styles.prince}>
            {formatPrice(tour.adultUnitPrice - promotion)}
          </Text>

          <View style={{lineHeight: 40}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.text}>{tour.dateStartFormat} </Text>
              <Text style={styles.text}>
                {tour.totalDays > 1
                  ? `- ${tour.totalDays}N${tour.totalDays - 1}Đ`
                  : `- ${tour.totalDays} ngày`}
              </Text>
            </View>
            <Text numberOfLines={2} style={styles.name}>
              {tour.tourName}
            </Text>
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
    height: 280,
  },
  promotion: {
    textAlign: 'center',
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
