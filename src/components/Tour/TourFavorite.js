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
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import IconAnt from 'react-native-vector-icons/AntDesign';

function TourFavorite(props) {
  const {tour} = props;

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handelClickBox = tourId => {
    const params = {
      TourId: tourId,
    };
    console.log(params);
    navigation.navigate('TourDetails', {tourId: params});
  };
  const textRating = rating => {
    //let text = '';
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

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => {
          handelClickBox(tour.tourId);
        }}>
        <View style={styles.box}>
          <Image style={styles.image} source={{uri: `${tour.tourImg}`}} />
          <Text style={styles.promotion}>-10%</Text>
          <View style={{marginLeft: 10, width: '50%'}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.text}>{tour.dateStart}</Text>
              <Text style={styles.text}>
                {' '}
                - {tour.time}N{tour.time - 1}Đ
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
              <Text style={styles.location}>{tour.provinceName}</Text>
            </View>
            <Text style={styles.prince}>
              {formatPrice(tour.adultUnitPrice)}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {backgroundColor: '#fff', marginBottom: 10, paddingHorizontal: 5},
  box: {
    overflow: 'hidden',
    borderTopLeftRadius: 10,
    position: 'relative',
    flexDirection: 'row',
  },
  promotion: {
    width: 100,
    height: 100,
    position: 'absolute',
    backgroundColor: 'rgba(254,46,100,0.8)',
    borderRadius: 50,
    textAlign: 'center',
    top: -25,
    left: -10,
    lineHeight: 100,
    color: '#fff',
    fontWeight: '700',
    fontSize: 30,
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
  },
  location: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
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
