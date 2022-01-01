import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  StatusBar,
  TextInput,
  Alert,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconAnt from 'react-native-vector-icons/AntDesign';
import {formatPrice} from '../../utils/FormatNumber';
import {Formik} from 'formik';
import {useDispatch} from 'react-redux';
import {
  Adm_SendEmailAfterBooking,
  CLi_CreateBookingTour,
} from '../../Slice/SliceBookingTour';
import {Cli_GetEnumConstant} from '../../Slice/SliceEnumerate';
import {unwrapResult} from '@reduxjs/toolkit';
import Spinner from 'react-native-loading-spinner-overlay';
import CheckBox from '@react-native-community/checkbox';
import * as yup from 'yup';
import {useIsFocused} from '@react-navigation/native';
import {showMessage, hideMessage} from 'react-native-flash-message';

function PaymenTicketPage(props) {
  const {navigation, route} = props;
  const [loading, setLoading] = useState(false);
  const [enumerate, setEnumerate] = useState([]);
  const [checkDiscount, setCheckDiscount] = useState(false);
  const [onClickPayment, setOnClickPayment] = useState(false);
  //
  //
  const {tour} = route.params;
  const {ticket} = route.params;
  const {sumMoney} = route.params;
  //
  //
  const dispatch = useDispatch(false);
  const isFocused = useIsFocused();

  //call option note
  useEffect(() => {
    const fetchApi = async () => {
      const params = {enumTypeName: 'OptionNoteByCustomer'};
      dispatch(Cli_GetEnumConstant(params))
        .then(unwrapResult)
        .then(payload => {
          setEnumerate(
            payload.map(item => ({
              ...item,
              selected: false,
            })),
          );
        })
        .catch(err => {
          console.log(err);
        });
    };
    fetchApi();
  }, []);

  //tinhsnh tổng tiền vé
  const totalMoneyBooking = sumMoney * (100 / (100 - tour.promotion));
  //tính tiền khuyến mãi
  const promotion = totalMoneyBooking - sumMoney;
  //tính tiền phụ thu
  const surcharge = checkDiscount === true ? tour.surcharge : 0;
  console.log(surcharge);
  //sum money tiền vé
  const totalMoney = sumMoney + surcharge;

  const initialValues = {
    //bookingTourID: '',
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    address: '',
    tourId: tour.tourId,
    customerEmail: '',
    customerPhone: '',
    quanityAdult: ticket.adult,
    quanityBaby: ticket.baby,
    quanityChildren: ticket.children,
    quanityInfant: ticket.infant,
    adultUnitPrice: tour.adultUnitPrice,
    childrenUnitPrice: tour.childrenUnitPrice,
    babyUnitPrice: tour.babyUnitPrice,
    discount: promotion,
    surcharge: surcharge,
    totalMoneyBooking: totalMoneyBooking,
    totalMoney: totalMoney,
    optionsNote: '',
    note: '',
    typePayment: 1,
  };

  //validateSchema
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const validateSchema = yup.object().shape({
    customerName: yup
      .string()
      .trim()
      .required('* Họ & tên không được để trống'),
    customerEmail: yup
      .string()
      .email('* Email không hợp lệ')
      .required('* Email không để trống'),
    customerPhone: yup
      .string()
      .trim()
      .required('* Số điện thoại không để trống')
      .matches(phoneRegExp, '* Số điện thoại không hợp lệ'),
    address: yup.string().trim().required('*Địa chỉ không được để trống'),
  });

  ///render số lượng người và vé
  const numberPeople = () => {
    var people = [];
    if (ticket.adult > 0) {
      people.push(
        <Text style={style.text} key={1}>
          {ticket.adult} x Người lớn
        </Text>,
      );
    }
    if (ticket.children > 0) {
      people.push(
        <Text style={style.text} key={2}>
          {ticket.children} x Trẻ em
        </Text>,
      );
    }
    if (ticket.baby > 0) {
      people.push(
        <Text style={style.text} key={3}>
          {ticket.baby} x Em nhỏ
        </Text>,
      );
    }
    if (ticket.infant > 0) {
      people.push(
        <Text style={style.text} key={4}>
          {ticket.infant} x Em bé
        </Text>,
      );
    }
    return <View>{people}</View>;
  };

  //check box click
  const onChangeValues = (item, index) => {
    const data = enumerate.map(newItem => {
      if (newItem.enumerationId === item) {
        if (newItem.selected === true) {
          return {
            ...newItem,
            selected: false,
          };
        } else {
          return {
            ...newItem,
            selected: true,
          };
        }
      } else {
        return {
          ...newItem,
        };
      }
    });
    setEnumerate(data);
  };
  ///
  const onChangeValuesCheckDiscount = values => {
    setCheckDiscount(values);
  };

  ///render checkbox option
  const renderNote = () => {
    var checkArr = [];
    for (let i = 0; i < enumerate.length; i++) {
      checkArr.push(
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '50%',
          }}
          key={i}>
          <CheckBox
            disabled={false}
            hideBox={true}
            style={{alignSelf: 'center'}}
            value={enumerate[i].selected}
            onValueChange={() => {
              onChangeValues(enumerate[i].enumerationId, i);
            }}
          />
          <Text style={style.text}>{enumerate[i].enumerationTranslate}</Text>
        </View>,
      );
    }
    return <View>{checkArr}</View>;
  };

  //booking tour
  const handleClickSubmit = values => {
    console.log(values);
    const listSelected = enumerate.filter(item => item.selected === true);
    let content = '';
    listSelected.forEach(item => {
      content = content + item.enumerationTranslate + ',';
    });
    const params = {
      ...values,
      optionsNote: content,
      totalMoney: totalMoney,
      surcharge: surcharge,
    };
    setLoading(true);
    setTimeout(() => {
      dispatch(CLi_CreateBookingTour(params))
        .then(unwrapResult)
        .then(payload => {
          setLoading(false);
          dispatch(Adm_SendEmailAfterBooking({pID: payload.bookingTourId}))
            .then(unwrapResult)
            .then()
            .catch(err => {});
          navigation.navigate('InforMationTicket', {
            pID: payload.bookingTourId,
          });
        })
        .catch(error => {
          showMessage({
            message: 'Thất bại! Vui lòng thử lại',
            type: 'danger',
            floating: 'true',
            backgroundColor: '#D13B3B',
          });
          setLoading(false);
        });
    }, 2000);
  };

  return (
    <SafeAreaView style={{backgroundColor: '#F8F8F8', flex: 1}}>
      <Spinner
        visible={loading}
        textContent=""
        textStyle={{color: '#FFF'}}
        animation="fade"
        color="rgb(254,46,100)"
        style={{
          justifyContent: 'center',
          textAlign: 'center',
          paddingTop: 30,
          backgroundColor: '#ecf0f1',
          padding: 8,
        }}
      />
      <StatusBar
        translucent
        barStyle="dark-content"
        backgroundColor="rgba(0,0,0,0)"
      />
      <View style={style.header}>
        <Icon
          name="arrow-back-ios"
          size={28}
          color="#4682B4"
          onPress={navigation.goBack}
        />
        <View
          style={{
            alignItems: 'center',
            width: '85%',
          }}>
          <Text
            style={{
              color: '#4682B4',
              fontSize: 23,
              fontFamily: 'Montserrat-Medium',
            }}>
            Hoàn tất vé
          </Text>
        </View>
      </View>
      <ScrollView>
        <View style={style.ticket}>
          <Text style={[style.textBold]}>Vé tour du lịch {tour.tourName}</Text>
          <View>{numberPeople()}</View>
          <Text style={style.text}>{tour.dateStart}</Text>
          <Text style={[style.textBold, {color: '#FF4500', fontSize: 20}]}>
            {formatPrice(totalMoneyBooking)}
          </Text>
        </View>
        <Formik
          initialValues={initialValues}
          onSubmit={handleClickSubmit}
          validationSchema={validateSchema}>
          {({handleChange, handleBlur, handleSubmit, values, errors}) => (
            <View>
              <View style={style.ticket}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Icon
                    name="align-vertical-center"
                    color="#FF4500"
                    size={24}
                  />
                  <Text style={style.textBold}>Thông tin liên lạc</Text>
                </View>
                <TextInput
                  style={[style.textInput]}
                  placeholder="Họ tên khách hàng đăng ký..."
                  name="customerName"
                  onChangeText={handleChange('customerName')}
                  onBlur={handleBlur('customerName')}
                  value={values.customerName}
                />
                {errors.customerName && (
                  <Text
                    style={{
                      fontSize: 12,
                      color: 'red',
                      fontFamily: 'Poppins-Medium',
                    }}>
                    {errors.customerName}
                  </Text>
                )}
                <TextInput
                  style={style.textInput}
                  placeholder="Số điện thoại khách hàng đăng ký..."
                  name="customerPhone"
                  onChangeText={handleChange('customerPhone')}
                  onBlur={handleBlur('customerPhone')}
                  value={values.customerPhone}
                />
                {errors.customerPhone && (
                  <Text
                    style={{
                      fontSize: 12,
                      color: 'red',
                      fontFamily: 'Poppins-Medium',
                    }}>
                    {errors.customerPhone}
                  </Text>
                )}
                <TextInput
                  style={style.textInput}
                  placeholder="Email khách hàng đăng ký..."
                  name="customerEmail"
                  onChangeText={handleChange('customerEmail')}
                  onBlur={handleBlur('customerEmail')}
                  value={values.customerEmail}
                />
                {errors.customerEmail && (
                  <Text
                    style={{
                      fontSize: 12,
                      color: 'red',
                      fontFamily: 'Poppins-Medium',
                    }}>
                    {errors.customerEmail}
                  </Text>
                )}
                <TextInput
                  style={style.textInput}
                  placeholder="Địa chỉ khách hàng đăng ký..."
                  name="address"
                  onChangeText={handleChange('address')}
                  onBlur={handleBlur('address')}
                  value={values.address}
                />
                {errors.address && (
                  <Text
                    style={{
                      fontSize: 12,
                      color: 'red',
                      fontFamily: 'Poppins-Medium',
                    }}>
                    {errors.address}
                  </Text>
                )}
              </View>

              <View style={[style.ticket]}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Icon
                    name="align-vertical-center"
                    color="#FF4500"
                    size={24}
                  />
                  <Text style={style.textBold}>Lưu ý của khách hàng</Text>
                </View>
                <View>
                  {renderNote()}
                  <Text style={style.text}>--Ghi chú thêm</Text>
                  <TextInput
                    multiline={true}
                    numberOfLines={4}
                    placeholder="Nhập ghi chú nếu có"
                    style={{
                      height: 100,
                      textAlignVertical: 'top',
                      borderWidth: 2,
                      borderColor: '#f0f0f0',
                      borderRadius: 10,
                      paddingHorizontal: 5,
                    }}
                    name="note"
                    onChangeText={handleChange('note')}
                    onBlur={handleBlur('note')}
                    value={values.note}
                  />
                </View>
              </View>

              <View style={[style.ticket]}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Icon
                    name="align-vertical-center"
                    color="#FF4500"
                    size={24}
                  />
                  <Text style={style.textBold}>Tóm tắt thanh toán</Text>
                </View>
                <View style={style.flex}>
                  <Text style={[style.text, {fontSize: 18}]}>Tổng cộng</Text>
                  <Text style={style.textBold}>
                    {formatPrice(totalMoneyBooking)}
                  </Text>
                </View>
                <View style={style.flex}>
                  <Text style={[style.text, {fontSize: 18}]}>
                    Phụ thu phòng riêng
                  </Text>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <CheckBox
                      disabled={false}
                      hideBox={true}
                      style={{alignSelf: 'center'}}
                      value={checkDiscount}
                      onValueChange={values => {
                        onChangeValuesCheckDiscount(values);
                      }}
                    />
                    <Text style={style.textBold}>
                      {formatPrice(tour.surcharge)}
                    </Text>
                  </View>
                </View>
                <View style={style.flex}>
                  <Text style={[style.text, {fontSize: 18}]}>Đã giảm</Text>
                  <Text style={style.textBold}>{formatPrice(promotion)}</Text>
                </View>
                <View>
                  <TouchableWithoutFeedback>
                    <View style={style.flex}>
                      <Text style={[style.text, {fontSize: 18}]}>
                        Phương thức thanh toán
                      </Text>
                      <IconAnt
                        style={{padding: 10}}
                        name="down"
                        color="#000"
                        size={24}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                </View>
                <View style={[style.flex]}>
                  <Text style={[style.text, {fontSize: 18}]}>Thanh toán </Text>
                  <Text
                    style={[style.textBold, {color: '#FF4500', fontSize: 24}]}>
                    {formatPrice(totalMoney)}
                  </Text>
                </View>
              </View>
              <Text
                style={{
                  padding: 20,
                  backgroundColor: '#FAF0E6',
                  color: '#000',
                  fontSize: 16,
                  fontFamily: 'Poppins-Light',
                }}>
                Xin kiểm tra thông tin cẩn thẩn. Khi đã gửi sẽ không thể thay
                đổi.
              </Text>
              <View
                style={{
                  alignItems: 'center',
                  backgroundColor: '#fff',
                }}>
                <Text
                  style={{
                    width: '93%',
                    backgroundColor: 'rgb(254,46,100)',
                    padding: 10,
                    color: '#fff',
                    fontSize: 18,
                    fontFamily: 'Poppins-Bold',
                    textAlign: 'center',
                    borderRadius: 10,
                  }}
                  onPress={handleSubmit}>
                  Đặt ngay
                </Text>
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'flex-start',
    width: '100%',
    alignItems: 'flex-end',
    height: 100,
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#f8f8f8',
  },
  ticket: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    marginBottom: 20,
    paddingVertical: 10,
  },
  textBold: {
    fontSize: 19,
    fontFamily: 'Poppins-Medium',
    color: '#000',
    padding: 10,
  },
  text: {
    fontSize: 16,
    fontFamily: 'Poppins-Light',
    color: '#000',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: '#f8f8f8',
    borderBottomWidth: 2,
    //paddingHorizontal: 10,
  },
  textInput: {
    fontSize: 16,
    fontFamily: 'Poppins-Light',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
  },
});

export default PaymenTicketPage;
