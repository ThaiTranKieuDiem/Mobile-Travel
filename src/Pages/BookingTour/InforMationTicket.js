import React, {forwardRef} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  StatusBar,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {formatPrice} from '../../utils/FormatNumber';
import {Formik} from 'formik';

function InforMationTicket(props) {
  const {navigation, route} = props;
  //
  const {tour} = route.params;
  const {ticket} = route.params;
  //
  //console.log(tour);
  //console.log(ticket);

  const initialValues = {
    name: '',
    phoneNumber: '',
    email: '',
    address: '',
  };

  const SumMoney = () => {
    let sum =
      ticket.adult * tour.adultUnitPrice +
      ticket.children * tour.childrenUnitPrice +
      ticket.baby * tour.babyUnitPrice;
    return sum;
  };

  const numberPeople = () => {
    var people = [];
    console.log(ticket.adult);
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
          {ticket.baby} x Em bé
        </Text>,
      );
    }
    return <View>{people}</View>;
  };

  return (
    <SafeAreaView style={{backgroundColor: '#F8F8F8', flex: 1}}>
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
            {formatPrice(SumMoney())}
          </Text>
        </View>
        <Formik
          initialValues={initialValues}
          onSubmit={values => console.log(values)}>
          {({handleChange, handleBlur, handleSubmit, values}) => (
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
                  name="name"
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                />
                <TextInput
                  style={style.textInput}
                  placeholder="Số điện thoại khách hàng đăng ký..."
                  name="phoneNumber"
                  onChangeText={handleChange('phoneNumber')}
                  onBlur={handleBlur('phoneNumber')}
                  value={values.phoneNumber}
                />
                <TextInput
                  style={style.textInput}
                  placeholder="Email khách hàng đăng ký..."
                  name="email"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                />
                <TextInput
                  style={style.textInput}
                  placeholder="Địa chỉ khách hàng đăng ký..."
                  name="address"
                  onChangeText={handleChange('address')}
                  onBlur={handleBlur('address')}
                  value={values.address}
                />
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
                  <Text style={style.textBold}>{formatPrice(SumMoney())}</Text>
                </View>
                <View style={style.flex}>
                  <Text style={[style.text, {fontSize: 18}]}>Tổng giảm</Text>
                  <Text style={style.textBold}>{formatPrice(SumMoney())}</Text>
                </View>
                <View style={style.flex}>
                  <Text style={[style.text, {fontSize: 18}]}>
                    Phương thức thanh toán
                  </Text>
                  <Icon
                    style={{padding: 10}}
                    name="arrow-forward-ios"
                    color="#000"
                    size={24}
                  />
                </View>
                <View style={[style.flex]}>
                  <Text style={[style.text, {fontSize: 18}]}>Thanh toán </Text>
                  <Text
                    style={[style.textBold, {color: '#FF4500', fontSize: 24}]}>
                    {formatPrice(SumMoney())}
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
                    backgroundColor: '#4682B4',
                    padding: 10,
                    color: '#fff',
                    fontSize: 18,
                    fontFamily: 'Poppins-Bold',
                    textAlign: 'center',
                    borderRadius: 10,
                  }}
                  onPress={handleSubmit}>
                  Thanh toán
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
    justifyContent: 'space-between',
    borderBottomColor: '#f8f8f8',
    borderBottomWidth: 2,
    alignItems: 'center',
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

export default InforMationTicket;
