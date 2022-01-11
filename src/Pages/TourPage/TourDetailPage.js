import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ScrollView,
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
import TravelTypeList from './../../components/TravelType/TravelTypeList';
import {Modal} from 'react-native';

function TourDetailPage(props) {
  const {navigation, route} = props;
  const {width} = useWindowDimensions();
  //
  const [tourDetail, setTourDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const [scheduleArray, setScheduleArray] = useState([]);
  const [arrayTouristAttrName, setArrayTouristAttrName] = useState([]);
  //
  const [showModal, setShowModal] = useState(false);
  //
  const dispatch = useDispatch();
  //
  const {tourID} = route.params;

  useEffect(() => {
    dispatch(Cli_GetTourDescriptionById(tourID))
      .then(unwrapResult)
      .then(payload => {
        setLoading(false);
        console.log(payload);
        setTourDetail(payload);
        var finalArray = payload?.tourDetails.map(function (obj) {
          return obj.touristAttrName;
        });
        setArrayTouristAttrName(finalArray);
        const re = '^||||^';
        let arrayObj = String(payload?.schedule).split(re);
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

  //console.log(scheduleArray[0]['title']);

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
            ` <div  key=${index}>
            <div> 
              <h5  style="font-size: 20px; margin-bottom: 0px; margin-top: 20px; color: #003d71">
                  ${item.title.trim()}
              </h5>
              <div style="line-height: 24px; font-size: 20px;">
                ${String(item.schedule)
                  .replace('<ul>', '')
                  .replace('</ul>', '')}
              </div>
            </div>
          </div>`,
        )}`,
  };

  const renderSchedule = {
    html: `
      ${
        scheduleArray.length > 0 &&
        `
          <li key=${1}>
            <div> 
              <h5 style="font-size: 20px; margin-bottom: 0px; margin-top: 20px; color: #003d71">
                  ${scheduleArray[0]['title']} 
              </h5>
              <div 
              style="
              line-height: 24px; 
              font-size: 20px';
               >
              ${String(scheduleArray[0]['schedule'])
                .replace('<ul>', '')
                .replace('</ul>', '')}
              </div>
            </div>
          </li>`
      }
    `,
  };

  const conditionByTour = {
    html: `<div style="font-size: 18px; line-height: 24px">
    ${String(tourDetail.conditionByTour)}
    </div>`,
  };

  const noteByMyTour = {
    html: `
    <div style="font-size: 18px; line-height: 24px">${String(
      tourDetail.noteByMyTour,
    )}</div>`,
  };

  const noteByTour = {
    html: `
    <div style="font-size: 18px; line-height: 24px">${String(
      tourDetail.noteByTour,
    )}</div>`,
  };

  const renderRating = rate => {
    var rating = [];
    for (let i = 0; i < rate; i++) {
      rating.push(<IconAnt key={i} name="star" color="#ffa500" size={40} />);
    }
    return <View style={{flexDirection: 'row'}}>{rating}</View>;
  };

  const handleClickOpen = () => {
    setShowModal(true);
  };

  const handleClickClose = () => {
    setShowModal(false);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
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
          <View style={style.box}>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <Text
                style={{
                  fontSize: 24,
                  color: '#003d71',
                  fontFamily: 'Pacifico-Regular',
                  marginBottom: 5,
                  textShadowColor: 'rgba(0, 61, 113, 0.8)',
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
          </View>
          <View style={[style.box, {paddingHorizontal: 10}]}>
            <TravelTypeList />
          </View>
          <View style={style.box}>
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
                <IconMa
                  name="fireplace-off"
                  size={24}
                  color="rgb(254,46,100)"
                />
                <Text style={[style.text, {marginLeft: 5}]}>Điểm đến:</Text>
              </View>
              <TagGroup
                //ref={ref => (tagGroup = ref)}
                source={arrayTouristAttrName}
                tagStyle={{
                  height: 35,
                  borderColor: '#FFF',
                  backgroundColor: '#f8f8f8',
                }}
                singleChoiceMode={true}
                textStyle={{fontSize: 15, fontFamily: 'Poppins-Medium'}}
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
              <Text style={[style.text, {marginLeft: 5}]}>
                Số chỗ còn nhận:
              </Text>
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
          </View>
          <View style={style.box}>
            <View style={{marginTop: 20}}>
              <Text
                style={[
                  style.date,
                  {
                    fontSize: 24,
                    color: '#003d71',
                    fontFamily: 'Salsa-Regular',
                    marginBottom: 15,
                  },
                ]}>
                Chi tiết về địa điểm du lịch
              </Text>
              <View>
                <Text style={[style.text, {lineHeight: 30}]}>
                  {tourDetail.description}
                </Text>
              </View>
            </View>
          </View>
          <View style={style.box}>
            <View
              style={{
                marginTop: 20,
              }}>
              <Text
                style={[
                  style.date,
                  {fontSize: 24, color: '#ffa500', fontFamily: 'Salsa-Regular'},
                ]}>
                Lịch trình Tour
              </Text>
              <View>
                <RenderHtml source={renderSchedule} contentWidth={width} />
                <Text
                  style={{
                    color: '#1E90FF',
                    textDecorationLine: 'underline',
                    textDecorationColor: '#1E90FF',
                    fontSize: 16,
                    fontFamily: 'Poppins-Light',
                  }}
                  onPress={handleClickOpen}>
                  Xem thêm...
                </Text>
              </View>
            </View>
          </View>

          <View style={style.box}>
            <Text
              style={{
                fontSize: 18,
                fontFamily: 'Poppins-Medium',
                color: '#003d71',
              }}>
              Điều kiện khi nhận khách
            </Text>
            <RenderHtml source={conditionByTour} contentWidth={width} />
          </View>

          <View style={style.box}>
            <Text
              style={{
                fontSize: 18,
                fontFamily: 'Poppins-Medium',
                color: '#003d71',
              }}>
              Lưu ý "(nếu có)"
            </Text>
            <RenderHtml source={noteByMyTour} contentWidth={width} />
          </View>

          <View style={style.box}>
            <Text
              style={{
                fontSize: 18,
                fontFamily: 'Poppins-Medium',
                color: '#003d71',
              }}>
              Chi chú cho tour này
            </Text>
            <RenderHtml source={noteByTour} contentWidth={width} />
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
      <View>
        <Modal animationType="slide" transparent={true} visible={showModal}>
          <StatusBar
            translucent
            barStyle="light-content"
            backgroundColor="rgba(0,0,0,0)"
          />
          <View style={style.modalView}>
            <View style={style.contentModal}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <IconAnt name="close" size={24} onPress={handleClickClose} />
                <Text
                  style={{
                    fontFamily: 'Salsa-Regular',
                    fontSize: 20,
                    color: '#ffa500',
                    textAlign: 'center',
                    width: '85%',
                  }}>
                  Lịch trình tour
                </Text>
              </View>
              <ScrollView>
                <RenderHtml source={source} contentWidth={width} />
              </ScrollView>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  detailsContainer: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    position: 'relative',
    backgroundColor: '#F5F5F5',
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
    color: ' rgb(45,66,113)',
  },
  date: {
    fontFamily: 'Poppins-Medium',
    fontSize: 17,
    color: '#003d71',
  },
  box: {
    backgroundColor: '#FFF',
    width: '100%',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 10,
  },
  modalView: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    height: '100%',
  },
  contentModal: {
    height: 550,
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    padding: 20,
    position: 'absolute',
    bottom: 0,
  },
});

export default TourDetailPage;
