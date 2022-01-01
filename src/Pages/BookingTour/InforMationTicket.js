import React, {useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import IconIon from 'react-native-vector-icons/Ionicons';
import IconMa from 'react-native-vector-icons/Entypo';
import {useDispatch, useSelector} from 'react-redux';
import {Cli_GetTourBooked} from '../../Slice/SliceBookingTour';
import {unwrapResult} from '@reduxjs/toolkit';
import LottieView from 'lottie-react-native';
import {
  ImageHeaderScrollView,
  TriggeringView,
} from 'react-native-image-header-scroll-view';
import {formatPrice} from '../../utils/FormatNumber';
import {MB_DeleteTourBooked} from './../../Slice/SliceBookingTour';
import {Alert} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {showMessage, hideMessage} from 'react-native-flash-message';

function InforMationTicket(props) {
  const {navigation, route} = props;
  const {pID} = route.params;

  const [booked, setBooked] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingClick, setLoadingClick] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      const fetchApi = () => {
        const params = {
          pID: pID,
        };
        dispatch(Cli_GetTourBooked(params))
          .then(unwrapResult)
          .then(payload => {
            setBooked(payload);
            console.log(payload);
            setLoading(false);
          })
          .catch(err => {
            console.log(err);
            setLoading(false);
          });
      };
      fetchApi();
    }, 1000);
  }, []);

  ///render số lượng người và vé
  const numberPeople = () => {
    var people = [];
    if (booked.quanityAdult >= 0) {
      people.push(
        <View key={1} style={[style.flex, {justifyContent: 'flex-start'}]}>
          <Icon name="tagso" size={24} color="#87CEFA" />
          <Text style={[style.text, {marginLeft: 5}]}>
            {booked.quanityAdult} x Người lớn
          </Text>
        </View>,
      );
    }
    if (booked.quanityChildren >= 0) {
      people.push(
        <View key={2} style={[style.flex, {justifyContent: 'flex-start'}]}>
          <Icon name="tagso" size={24} color="#87CEFA" />
          <Text style={[style.text, {marginLeft: 5}]}>
            {booked.quanityChildren} x Trẻ em
          </Text>
        </View>,
      );
    }
    if (booked.quanityBaby >= 0) {
      people.push(
        <View key={3} style={[style.flex, {justifyContent: 'flex-start'}]}>
          <Icon name="tagso" size={24} color="#87CEFA" />
          <Text style={[style.text, {marginLeft: 5}]}>
            {booked.quanityBaby} x Trẻ nhỏ
          </Text>
        </View>,
      );
    }

    if (booked.quanityBaby >= 0) {
      people.push(
        <View key={4} style={[style.flex, {justifyContent: 'flex-start'}]}>
          <Icon name="tagso" size={24} color="#87CEFA" />
          <Text style={[style.text, {marginLeft: 5}]}>
            {booked.quanityInfant} x Em bé
          </Text>
        </View>,
      );
    }
    return <View>{people}</View>;
  };

  const totalMoney = loading
    ? 0
    : booked.totalMoney === undefined
    ? 0
    : booked.totalMoney;
  //////
  const surcharge = loading
    ? 0
    : booked.surcharge === undefined
    ? 0
    : booked.surcharge;
  ///
  const totalMoneyBooking = loading
    ? 0
    : booked.totalMoneyBooking === undefined
    ? 0
    : booked.totalMoneyBooking;
  ///
  const discount = loading
    ? 0
    : booked.discount === undefined
    ? 0
    : booked.discount;

  ////
  const handleClickDelete = () => {
    setLoadingClick(true);
    const params = {
      BookingTourID: pID,
    };
    setTimeout(() => {
      dispatch(MB_DeleteTourBooked(params))
        .then(unwrapResult)
        .then(payload => {
          setLoadingClick(false);
          navigation.navigate('BookedCancelPage');
        })
        .catch(err => {
          setLoadingClick(false);
          showMessage({
            message: err.message,
            type: 'danger',
            backgroundColor: '#D13B3B',
          });
        });
    }, 1500);
  };
  ///
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
    <SafeAreaView style={{flex: 1}}>
      <Spinner
        visible={loadingClick}
        textContent=""
        textStyle={{color: '#FFF'}}
        animation="fade"
        style={{
          flex: 1,
          justifyContent: 'center',
          textAlign: 'center',
          paddingTop: 30,
          backgroundColor: '#ecf0f1',
          padding: 8,
        }}
      />
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor="rgba(0,0,0,0)"
      />
      <ImageHeaderScrollView
        maxHeight={300}
        minHeight={75}
        headerImage={{uri: booked.tourImg}}
        renderForeground={() => (
          <View>
            <View style={{marginTop: 130, paddingHorizontal: 15}}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 27,
                  fontFamily: 'Pacifico-Regular',
                  backgroundColor: 'rgba(0,0,0, 0.5)',
                  padding: 10,
                  borderRadius: 20,
                }}
                numberOfLines={2}>
                {booked.tourName}
              </Text>
            </View>
          </View>
        )}>
        <TriggeringView>
          <View style={style.content}>
            <View style={[style.box, {borderColor: '#fff', marginBottom: 20}]}>
              <Text
                style={{
                  color: '#FF4500',
                  fontSize: 24,
                  fontFamily: 'DancingScript-VariableFont_wght',
                  textAlign: 'center',
                  padding: 10,
                }}>
                {booked.journeys}
              </Text>
              <View style={[style.flex, {justifyContent: 'flex-start'}]}>
                <Icon name="calendar" size={24} color="#87CEFA" />
                <View style={[style.flex, {justifyContent: 'flex-start'}]}>
                  <Text style={[style.text, {marginLeft: 5}]}>
                    {booked.dateStart} -
                  </Text>
                  <Text style={[style.text, {marginLeft: 5}]}>
                    {booked.dateEnd}
                  </Text>
                </View>
              </View>
              <View style={[style.flex, {justifyContent: 'flex-start'}]}>
                <IconIon name="car-sport-outline" size={24} color="#87CEFA" />
                <Text style={[style.text, {marginLeft: 5}]}>Máy bay</Text>
              </View>
              <View style={[style.flex, {justifyContent: 'flex-start'}]}>
                <IconIon name="location-outline" size={24} color="#87CEFA" />
                <Text style={[style.text, {marginLeft: 5}]}>
                  {booked.departurePlaceFrom}
                </Text>
              </View>
            </View>
            <View style={{marginBottom: 20}}>
              <Text
                style={{
                  color: '#FF4500',
                  fontFamily: 'Poppins-Medium',
                  fontSize: 12,
                }}>
                Thông tin khách hàng
              </Text>
              <View style={style.box}>
                <View style={[style.flex, {justifyContent: 'flex-start'}]}>
                  <Icon name="user" size={24} color="#87CEFA" />
                  <Text style={[style.text, {marginLeft: 5}]}>
                    {booked.customerName}
                  </Text>
                </View>
                <View style={[style.flex, {justifyContent: 'flex-start'}]}>
                  <Icon name="phone" size={24} color="#87CEFA" />
                  <Text style={[style.text, {marginLeft: 5}]}>
                    {booked.phoneNumber}
                  </Text>
                </View>
                <View style={[style.flex, {justifyContent: 'flex-start'}]}>
                  <IconIon name="mail-open-outline" size={24} color="#87CEFA" />
                  <Text style={[style.text, {marginLeft: 5}]}>
                    {booked.email}
                  </Text>
                </View>
                <View style={[style.flex, {justifyContent: 'flex-start'}]}>
                  <IconMa name="address" size={24} color="#87CEFA" />
                  <Text style={[style.text, {marginLeft: 5}]}>
                    {booked.address}
                  </Text>
                </View>
              </View>
            </View>

            <View style={{marginBottom: 20}}>
              <Text
                style={{
                  color: '#FF4500',
                  fontFamily: 'Poppins-Medium',
                  fontSize: 12,
                }}>
                Thông tin loại vé
              </Text>
              <View style={style.box}>{numberPeople()}</View>
            </View>
            <View>
              <Text
                style={{
                  color: '#FF4500',
                  fontFamily: 'Poppins-Medium',
                  fontSize: 12,
                }}>
                Thông tin thanh toán
              </Text>
              <View style={style.box}>
                <View style={style.flex}>
                  <Text style={[style.text]}>Tiền vé</Text>
                  <Text style={style.textBold}>
                    {formatPrice(totalMoneyBooking)}
                  </Text>
                </View>
                <View style={[style.flex]}>
                  <Text style={[style.text]}>Tiền giảm</Text>
                  <Text style={style.textBold}>{formatPrice(discount)}</Text>
                </View>
                <View style={[style.flex]}>
                  <Text style={[style.text]}>Phụ phí</Text>
                  <Text style={style.textBold}>{formatPrice(surcharge)}</Text>
                </View>
                <View style={[style.flex]}>
                  <Text Text style={[style.text]}>
                    Phương thức
                  </Text>
                  <Text Text style={[style.text]}>
                    {booked.typePayment === 1
                      ? 'Thanh toán tiền mặt'
                      : 'Chuyển khoản'}
                  </Text>
                </View>
                <View
                  style={[
                    style.flex,
                    {borderBottomWidth: 2, borderBottomColor: '#FF4500'},
                  ]}>
                  <Text Text style={[style.text]}>
                    Tình trạng
                  </Text>
                  <Text Text style={[style.text]}>
                    {booked.status === false
                      ? 'Chưa thanh toán '
                      : 'Đã thanh toán'}
                  </Text>
                </View>
                <View style={[style.flex]}>
                  <Text style={[style.text, {fontSize: 18}]}>Tổng tiền </Text>
                  <Text
                    style={[style.textBold, {color: '#FF4500', fontSize: 24}]}>
                    {formatPrice(totalMoney)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={style.footer}>
            <View style={style.button}>
              <Text style={style.btnText} onPress={handleClickDelete}>
                Hủy Tour
              </Text>
              <Text
                style={style.btnText}
                onPress={() => navigation.navigate('HomePage')}>
                Tiếp tục
              </Text>
            </View>
          </View>
        </TriggeringView>
      </ImageHeaderScrollView>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  content: {
    flex: 2,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
    position: 'relative',
  },
  flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
  },
  text: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'Poppins-Light',
  },
  money: {
    color: '#FF4500',
    fontSize: 18,
    fontFamily: 'Salsa-Regular',
  },
  box: {
    borderColor: '#fff',
    borderWidth: 2,
    padding: 15,
    borderRadius: 15,
    shadowColor: '#FF4500',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 10,
    elevation: 10,
    backgroundColor: 'white',
    marginVertical: 5,
  },
  textBold: {
    fontSize: 19,
    fontFamily: 'Poppins-Medium',
    color: '#000',
  },
  footer: {
    height: 80,
    backgroundColor: '#87CEFA',
    width: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: 'center',
    marginTop: 10,
  },
  button: {
    width: '90%',
    height: 80,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  btnText: {
    color: '#87CEFA',
    backgroundColor: '#fff',
    padding: 10,
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    borderRadius: 15,
    width: 150,
    textAlign: 'center',
  },
});

export default InforMationTicket;
