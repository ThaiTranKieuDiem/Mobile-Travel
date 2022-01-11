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
import IconAnt from 'react-native-vector-icons/AntDesign';

function TourFavorite(props) {
  const {tour} = props;

  const navigation = useNavigation();

  const handelClickBox = tourId => {
    const params = {
      tourID: tourId,
    };
    navigation.navigate('TourDetails', {tourID: params});
  };
  const textRating = rating => {
    let text = '';
    if (rating >= 4) return (text = 'Tuyệt vời');
    if (rating >= 3) return (text = 'Tốt');
    if (rating >= 2) return (text = 'Tạm ổn');
    else return (text = 'Trung bình');
  };

  const renderRating = rate => {
    var rating = [];
    for (let i = 0; i < rate; i++) {
      rating.push(<IconAnt key={i} name="star" color="#ffa500" size={20} />);
    }
    return <View style={{flexDirection: 'row'}}>{rating}</View>;
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
            width: 80,
            height: 80,
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
    <View style={styles.container} key={tour.tourId}>
      <TouchableWithoutFeedback
        onPress={() => {
          handelClickBox(tour.tourId);
        }}>
        <View style={styles.box}>
          <Image style={styles.image} source={{uri: `${tour.tourImg}`}} />
          {renderPromotion()}
          <View style={{marginLeft: 10, width: '50%'}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.text}>{tour.dateStartFormat} </Text>
              <Text style={styles.text}>
                {' '}
                {tour.totalDays > 1
                  ? `- ${tour.totalDays}N${tour.totalDays - 1}Đ`
                  : `- ${tour.totalDays} ngày`}
              </Text>
            </View>
            <Text numberOfLines={3} style={styles.name}>
              {tour.tourName}
            </Text>
            <View style={{flexDirection: 'row'}}>
              {renderRating(tour.rating)}
            </View>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <Text style={[styles.rate, {color: 'rgb(254,46,100)'}]}>
                {tour.rating}
              </Text>
              <Text style={[styles.text]}> - {textRating(tour.rating)}</Text>
            </View>
            <View style={styles.place}>
              <Icon name="place" color="#000" size={20} />
              <Text style={styles.location}>{tour.departurePlaceToName}</Text>
            </View>
            <Text style={styles.prince}>
              {formatPrice(tour.adultUnitPrice - promotion)}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {backgroundColor: '#fff', marginBottom: 10, paddingHorizontal: 10},
  box: {
    overflow: 'hidden',
    borderTopLeftRadius: 10,
    position: 'relative',
    flexDirection: 'row',
  },
  promotion: {
    textAlign: 'center',
    lineHeight: 80,
    color: '#fff',
    fontWeight: '700',
    fontSize: 20,
  },
  image: {
    width: '42%',
    height: 250,
    borderRadius: 10,
  },
  rate: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    width: 35,
    height: 20,
    lineHeight: 20,
    borderRadius: 5,
    backgroundColor: '#FCE8F2',
  },
  name: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    lineHeight: 25,
  },
  text: {
    color: '#000',
    fontSize: 15,
    fontFamily: 'Poppins-Light',
    lineHeight: 25,
  },
  place: {
    fontSize: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'Pacifico-Regular',
  },
  prince: {
    fontSize: 22,
    color: '#ffa500',
    fontFamily: 'Salsa-Regular',
    textAlign: 'right',
    marginTop: 20,
  },
});

export default TourFavorite;
