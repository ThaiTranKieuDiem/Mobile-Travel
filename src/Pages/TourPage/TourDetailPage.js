import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconMa from 'react-native-vector-icons/MaterialCommunityIcons';
import IconIon from 'react-native-vector-icons/Ionicons';
import IconAnt from 'react-native-vector-icons/AntDesign';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {formatPrice} from '../../utils/FormatNumber';
import {
  ImageHeaderScrollView,
  TriggeringView,
} from 'react-native-image-header-scroll-view';
import {useDispatch} from 'react-redux';
import LottieView from 'lottie-react-native';
import {unwrapResult} from '@reduxjs/toolkit';
import {Cli_GetTourDescriptionById} from './../../Slice/SliceTour';
import RenderHtml from 'react-native-render-html';
import {useWindowDimensions} from 'react-native';
import TagGroup from 'react-native-tag-group';

function TourDetailPage(props) {
  const {navigation, route} = props;
  const {width} = useWindowDimensions();
  //
  const [tourDetail, setTourDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const [clickIcon, setClickIon] = useState(false);
  const [scheduleArray, setScheduleArray] = useState([]);
  const [arrayTouristAttrName, setArrayTouristAttrName] = useState([]);

  //
  const dispatch = useDispatch();
  //
  const {tourID} = route.params;

  //console.log(tourId);

  useEffect(() => {
    dispatch(Cli_GetTourDescriptionById(tourID))
      .then(unwrapResult)
      .then(payload => {
        setLoading(false);
        setTourDetail(payload);

        var finalArray = payload.tourDetails.map(function (obj) {
          return obj.touristAttrName;
        });
        setArrayTouristAttrName(finalArray);
        const re = '^||||^';
        let arrayObj = String(payload.schedule).split(re);
        arrayObj.pop();
        setScheduleArray([]);
        Array.from(arrayObj).map(item => {
          const arrayObjDay = item.split('^||^');
          return setScheduleArray(prev => [
            ...prev,
            {title: arrayObjDay[0], schedule: arrayObjDay[1]},
          ]);
        });
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const handleClickBook = () => {
    const params = {
      tourId: tourDetail.tourId,
      tourName: tourDetail.tourName,
      adultUnitPrice: tourDetail.adultUnitPrice,
      babyUnitPrice: tourDetail.babyUnitPrice,
      childrenUnitPrice: tourDetail.childrenUnitPrice,
      dateStart: tourDetail.dateStart,
      surcharge: tourDetail.surcharge,
      quanity: tourDetail.quanity,
      travelTypeId: tourDetail.travelTypeId,
      groupNumber: tourDetail.groupNumber,
      promotion: tourDetail.promotion,
    };
    //
    navigation.navigate('Booking', {params: params});
  };
  ///

  const handleClickIcon = async () => {
    setClickIon(true);
    console.log(finalArray);
  };

  const promotion = (tourDetail.adultUnitPrice * tourDetail.promotion) / 100;
  const promotionBaby = (tourDetail.babyUnitPrice * tourDetail.promotion) / 100;
  /////
  const prince = loading
    ? 0
    : tourDetail.adultUnitPrice === undefined
    ? 0
    : tourDetail.adultUnitPrice;
  //////
  const princeBaby = loading
    ? 0
    : tourDetail.babyUnitPrice === undefined
    ? 0
    : tourDetail.babyUnitPrice;

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

  const handleClickProvince = values => {
    const params = {
      touristAttrId: values.toString(),
    };
    navigation.navigate('TouristAttrDetailPage', {
      touristAttrId: params,
    });
  };

  const source = {
    html: `
      ${Array.from(scheduleArray).map(
        (item, index) =>
          `<li key=${index}>
          <div > 
            <h5 style="font-size:20px;color:rgb(254,46,100)">
                ${item.title.trim()}
            </h5>
            <div>
            ${item.schedule}
            </div>
          </div>
        </li>`,
      )}`,
  };

  const renderRating = rate => {
    var rating = [];
    for (let i = 0; i < rate; i++) {
      rating.push(<IconAnt key={i} name="star" color="#ffa500" size={40} />);
    }
    return <View style={{flexDirection: 'row'}}>{rating}</View>;
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.white}}>
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor="rgba(0,0,0,0)"
      />
      <ImageHeaderScrollView
        maxHeight={300}
        minHeight={75}
        headerImage={{uri: tourDetail.tourImg}}
        renderForeground={() => (
          <View style={{paddingHorizontal: 20, paddingVertical: 40}}>
            <View
              style={{
                height: 150,
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 150,
              }}>
              <View style={{flexDirection: 'row', marginTop: 20}}>
                {renderRating(tourDetail.rating)}
              </View>
            </View>
          </View>
        )}>
        <TriggeringView style={style.detailsContainer}>
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <Text
              style={{
                fontSize: 27,
                color: '#4682B4',
                fontFamily: 'Pacifico-Regular',
                marginBottom: 5,
                textShadowColor: 'rgba(70, 130, 180, 0.8)',
                textShadowOffset: {width: -1, height: 1},
                textShadowRadius: 10,
              }}
              numberOfLines={3}>
              {tourDetail.tourName}
            </Text>
          </View>
          <View>
            <Text
              style={{
                color: '#ffa500',
                fontSize: 22,
                fontFamily: 'Salsa-Regular',
                textDecorationLine: 'line-through',
              }}>
              {formatPrice(prince)}{' '}
              {princeBaby === 0 ? '' : `- ${formatPrice(princeBaby)}`}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 15,
            }}>
            <Text
              style={{
                color: '#ffa500',
                fontSize: 22,
                fontFamily: 'Salsa-Regular',
              }}>
              {formatPrice(prince - promotion)}{' '}
              {princeBaby === 0
                ? ''
                : `- ${formatPrice(princeBaby - promotionBaby)}`}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              lineHeight: 30,
            }}>
            <IconMa name="calendar-month" color="rgb(254,46,100)" size={24} />
            <Text style={[style.text, {marginLeft: 5}]}>Ngày đi:</Text>
            <Text style={[style.date, {marginLeft: 10}]}>
              {tourDetail.dateStart} - {tourDetail.totalDay}N
              {tourDetail.totalDay - 1}Đ
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <IconIon
              name="paper-plane-outline"
              color="rgb(254,46,100)"
              size={24}
            />
            <Text style={[style.text, {marginLeft: 5}]}>
              Phương tiện xuất phát:
            </Text>
            <Text style={[style.date, {marginLeft: 10}]}>
              {tourDetail.transportStart}
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <IconAnt name="car" color="rgb(254,46,100)" size={24} />
            <Text style={[style.text, {marginLeft: 5}]}>
              Phương tiện di chuyển:
            </Text>
            <Text style={[style.date, {marginLeft: 10}]}>
              {tourDetail.transportInTour}
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <IconIon
              name="location-outline"
              size={24}
              color="rgb(254,46,100)"
            />
            <Text style={[style.text, {marginLeft: 5}]}>Nơi khởi hành:</Text>
            <Text style={[style.date, {marginLeft: 10}]}>
              {tourDetail.provinceName}
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <IconAnt name="user" size={24} color="rgb(254,46,100)" />
            <Text style={[style.text, {marginLeft: 5}]}>HDV:</Text>
            <Text style={[style.date, {marginLeft: 10}]}>
              {tourDetail.touGuideName !== null
                ? tourDetail.touGuideName
                : 'Đang cập nhật'}
            </Text>
          </View>
          <View>
            <View style={{flexDirection: 'row'}}>
              <IconMa name="fireplace-off" size={24} color="rgb(254,46,100)" />
              <Text style={[style.text, {marginLeft: 5}]}>Điểm đến:</Text>
            </View>
            <TagGroup
              //ref={ref => (tagGroup = ref)}
              source={arrayTouristAttrName}
              tagStyle={{
                height: 35,
                borderColor: '#fff',
                backgroundColor: '#f8f8f8',
              }}
              singleChoiceMode={true}
              textStyle={{fontSize: 15, fontFamily: 'Poppins-Medium'}}
              //TouchableOpacity={handleClickProvince}
              onSelectedTagChange={handleClickProvince}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              lineHeight: 30,
            }}>
            <IconIon name="bed-outline" size={24} color="rgb(254,46,100)" />
            <Text style={[style.text, {marginLeft: 5}]}>Số chỗ còn nhận:</Text>
            <Text
              style={{
                color: '#f00',
                fontSize: 20,
                fontFamily: 'Salsa-Regular',
                marginLeft: 15,
              }}>
              {tourDetail.quanity}
            </Text>
          </View>
          <Text style={style.date}>Nhúng địa chỉ google map</Text>
          <View style={{marginTop: 20}}>
            <Text
              style={[
                style.date,
                {fontSize: 21, color: '#4682B4', fontFamily: 'Salsa-Regular'},
              ]}>
              Chi tiêt về địa điểm du lịch
            </Text>
            <View>
              <Text style={[style.text, {lineHeight: 30}]}>
                {tourDetail.description}
              </Text>
            </View>
          </View>
          <View style={{marginTop: 20}}>
            <Text
              style={[
                style.date,
                {fontSize: 21, color: '#ffa500', fontFamily: 'Salsa-Regular'},
              ]}>
              Lịch trình Tour
            </Text>
            <View>
              <RenderHtml source={source} contentWidth={width} />
              {/* <Text style={style.text}>{tourDetail.schedule}</Text> */}
            </View>
          </View>
        </TriggeringView>
      </ImageHeaderScrollView>
      <View style={style.footer}>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <Text
            style={{
              fontSize: 20,
              color: Colors.white,
              fontFamily: 'Salsa-Regular',
            }}>
            {formatPrice(prince - promotion)}
          </Text>
        </View>
        <Text
          style={{
            backgroundColor: '#fff',
            fontSize: 18,
            fontFamily: 'Poppins-Medium',
            width: 150,
            height: 40,
            lineHeight: 40,
            textAlign: 'center',
            borderRadius: 10,
            color: '#4682B4',
          }}
          onPress={handleClickBook}>
          Đặt Ngay
        </Text>
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  detailsContainer: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: Colors.white,
    position: 'relative',
  },
  imageDetails: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    bottom: 40,
    alignItems: 'center',
  },
  footer: {
    flexDirection: 'row',
    backgroundColor: '#4682B4',
    height: 70,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  bookNowBtn: {
    height: 50,
    width: 150,
    backgroundColor: Colors.white,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    fontFamily: 'Poppins-Light',
    fontSize: 15,
    lineHeight: 30,
  },
  date: {
    fontFamily: 'Poppins-Medium',
    fontSize: 17,
  },
  comment: {
    flexDirection: 'row',
  },
});

export default TourDetailPage;
