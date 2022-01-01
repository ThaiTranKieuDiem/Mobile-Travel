import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  StatusBar,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Formik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {
  Cli_UpdateCustomer,
  MB_Cli_GetInforCustumer,
} from '../../Slice/SliceCustomer';
import {unwrapResult} from '@reduxjs/toolkit';
import Spinner from 'react-native-loading-spinner-overlay';
import * as yup from 'yup';
import LottieView from 'lottie-react-native';
import {showMessage, hideMessage} from 'react-native-flash-message';

function InfomationCustomer(props) {
  const {navigation, route} = props;
  ///
  const [checkName, setCheckName] = useState(false);
  const [checkEmail, setCheckEmail] = useState(false);
  const [checkAddress, setCheckAddress] = useState(false);
  const [customer, setCustomer] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [loadingPage, setLoadingPage] = useState(true);
  //

  //
  const dispatch = useDispatch();
  //
  const initialValues = {
    customerId: '',
    customerName: '',
    phoneNumber: '',
    email: '',
    address: '',
  };

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email('* sai định dạng email')
      .required('* Không được để trống'),
    customerName: yup.string().required('* không được để trống'),
  });

  let obj = '';

  if (loading === false) {
    setTimeout(async () => {
      AsyncStorage.getItem('accessTokenCustomer')
        .then(value => {
          if (value !== null) {
            setLoading(true);
            obj = JSON.parse(value);
            dispatch(MB_Cli_GetInforCustumer({CustomerId: obj.data.customerId}))
              .then(unwrapResult)
              .then(payload => {
                setCustomer(payload);
                setLoadingPage(false);
              })
              .catch(error => {
                setLoadingPage(false);
                console.log(error.status);
              });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }, 1500);
  }
  if (loadingPage) {
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

  ///
  const handleClickSubmit = values => {
    setLoadingEdit(true);
    setTimeout(() => {
      dispatch(
        Cli_UpdateCustomer(
          Object.assign(values, {
            customerId: customer.customerId,
            phoneNumber: customer.phoneNumber,
          }),
        ),
      )
        .then(unwrapResult)
        .then(payload => {
          setLoadingEdit(false);
          showMessage({
            message: 'Thay đổi thông tin thành công',
            type: 'success',
          });
        })
        .catch(error => {
          setLoadingEdit(false);
          if (error.status === 401) {
            AsyncStorage.clear();
            showMessage({
              message: 'Vui lòng đăng nhập lại',
              type: 'warning',
            });
            navigation.navigate('HomePage');
          } else {
            showMessage({
              message: error.message,
              type: 'danger',
              backgroundColor: '#D13B3B',
            });
          }
        });
    }, 2000);
  };

  const handleClickChangePass = () => {
    navigation.navigate('ChangePassword', {params: customer});
  };

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: '#fff', paddingHorizontal: 20}}>
      <Spinner
        visible={loadingEdit}
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
      <Formik
        initialValues={initialValues}
        onSubmit={handleClickSubmit}
        validationSchema={validationSchema}>
        {({handleChange, handleBlur, handleSubmit, values, errors}) => {
          return (
            <View style={style.content}>
              <View style={style.view}>
                <Text style={style.text}>Họ tên</Text>
                <TextInput
                  style={style.textInput}
                  name="customerName"
                  onChangeText={handleChange('customerName')}
                  onBlur={handleBlur('customerName')}
                  onPressIn={() => {
                    setCheckName(true);
                  }}
                  value={
                    checkName === true
                      ? values.customerName
                      : (values.customerName = customer.customerName)
                  }
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
              </View>
              <View style={style.view}>
                <Text style={style.text}>Email</Text>
                <TextInput
                  style={style.textInput}
                  name="email"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  onPressIn={() => {
                    setCheckEmail(true);
                  }}
                  value={
                    checkEmail === true
                      ? values.email
                      : (values.email = customer.email)
                  }
                />
                {errors.email && (
                  <Text
                    style={{
                      fontSize: 12,
                      color: 'red',
                      fontFamily: 'Poppins-Medium',
                    }}>
                    {errors.email}
                  </Text>
                )}
              </View>
              <View style={style.view}>
                <Text style={style.text}>Số điện thoại</Text>
                <TextInput
                  style={style.textInput}
                  editable={false}
                  name="phoneNumber"
                  value={customer.phoneNumber}
                />
              </View>
              <View style={style.view}>
                <Text style={style.text}>Địa chỉ</Text>
                <TextInput
                  style={style.textInput}
                  name="address"
                  onChangeText={handleChange('address')}
                  onBlur={handleBlur('address')}
                  onPressIn={() => {
                    setCheckAddress(true);
                  }}
                  value={
                    checkAddress === true
                      ? values.address
                      : (values.address = customer.address)
                  }
                />
              </View>
              <View style={{marginTop: 50}}>
                <Text
                  style={[
                    style.textBtn,
                    {
                      color: '#fff',
                      backgroundColor: 'rgb(254,46,100)',
                      borderRadius: 10,
                    },
                  ]}
                  onPress={handleSubmit}>
                  Lưu lại
                </Text>
              </View>
              <Text
                style={[
                  style.textBtn,
                  {
                    color: 'rgb(254,46,100)',
                  },
                ]}
                onPress={handleClickChangePass}>
                Đổi mật khẩu
              </Text>
            </View>
          );
        }}
      </Formik>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 100,
  },
  content: {
    flex: 2,
    marginTop: 50,
  },
  text: {
    color: '#1BBBF5',
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
  },
  textInput: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'Poppins-Light',
  },
  view: {
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: 1,
    marginTop: 10,
  },
  textBtn: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    marginVertical: 5,
    paddingVertical: 10,
    textAlign: 'center',
  },
});

export default InfomationCustomer;
