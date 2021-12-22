import React, {useState} from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import facebook from '../../asset/logo/facebook.png';
import google from '../../asset/logo/google.png';
import apple from '../../asset/logo/apple.png';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Formik} from 'formik';
import {useDispatch} from 'react-redux';
import {unwrapResult} from '@reduxjs/toolkit';
import Spinner from 'react-native-loading-spinner-overlay';
import * as yup from 'yup';
import {Cli_CheckPhoneCustomer} from './../../Slice/SliceCustomer';

function RegisterPage(props) {
  const {navigation} = props;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const initialValues = {
    phoneNumber: '',
  };
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const validateSchema = yup.object().shape({
    phoneNumber: yup
      .string()
      .trim()
      .required('* Số điện thoại không để trống')
      .matches(phoneRegExp, '* Số điện thoại không hợp lệ'),
  });

  const handleRegister = values => {
    setLoading(true);
    console.log(values.phoneNumber);
    setTimeout(async () => {
      dispatch(Cli_CheckPhoneCustomer(values))
        .then(unwrapResult)
        .then(payload => {
          setLoading(false);
          navigation.navigate('RegisterInfo', {params: values.phoneNumber});
        })
        .catch(err => {
          setLoading(false);
          Alert.alert(err.message);
        });
    }, 1500);
  };

  return (
    <SafeAreaView
      style={{backgroundColor: '#fff', flex: 1, position: 'relative'}}>
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
      <View style={style.header}>
        <Icon
          name="arrow-back-ios"
          size={28}
          color="#000"
          onPress={navigation.goBack}
        />
        <View
          style={{
            alignItems: 'center',
            width: '85%',
          }}>
          <Text
            style={{
              color: '#000',
              fontSize: 23,
              fontFamily: 'Montserrat-Medium',
            }}>
            Đăng ký
          </Text>
        </View>
      </View>
      <View style={{marginVertical: 5, paddingHorizontal: 20}}>
        <View style={style.flex}>
          <Image source={facebook} style={style.image} />
          <Text style={style.text}>Đăng ký bằng facebook</Text>
        </View>
        <View style={style.flex}>
          <Image source={google} style={style.image} />
          <Text style={style.text}>Đăng ký bằng google</Text>
        </View>
        <View style={style.flex}>
          <Image source={apple} style={style.image} />
          <Text style={style.text}>Đăng ký bằng apple</Text>
        </View>
      </View>
      <Text
        style={{
          color: '#000',
          fontSize: 14,
          fontFamily: 'Poppins-Light',
          width: '100%',
          textAlign: 'center',
        }}>
        Hoặc đăng ký bằng số điện thoại, email
      </Text>
      <Formik
        initialValues={initialValues}
        onSubmit={handleRegister}
        validationSchema={validateSchema}>
        {({handleChange, handleBlur, handleSubmit, values, errors}) => (
          <View style={{paddingHorizontal: 20}}>
            <TextInput
              placeholder="Nhập số điện thoại"
              placeholderTextColor="#B0B0B0"
              style={style.textInput}
              name="phoneNumber"
              onChangeText={handleChange('phoneNumber')}
              onBlur={handleBlur('phoneNumber')}
              value={values.phoneNumber}
            />
            {errors.phoneNumber && (
              <Text
                style={{
                  fontSize: 12,
                  color: 'red',
                  fontFamily: 'Poppins-Medium',
                }}>
                {errors.phoneNumber}
              </Text>
            )}
            <Text
              style={[
                style.btn,
                {color: '#fff', backgroundColor: 'rgb(254,46,100)'},
              ]}
              onPress={handleSubmit}>
              Đăng ký
            </Text>
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
    padding: 20,
    width: '100%',
    alignItems: 'flex-end',
    height: 100,
    flexDirection: 'row',
  },
  flex: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#C8C8C8',
    borderRadius: 10,
    marginVertical: 5,
  },
  image: {
    width: 30,
    height: 30,
  },

  text: {
    color: '#000',
    fontSize: 17,
    fontFamily: 'Poppins-Medium',
  },
  textInput: {
    fontSize: 16,
    fontFamily: 'Poppins-Light',
    width: '100%',
    backgroundColor: '#F0F8FF',
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    marginVertical: 10,
  },
  btn: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    width: '100%',
    borderRadius: 10,
    textAlign: 'center',
    padding: 15,
    marginVertical: 10,
  },
});

export default RegisterPage;
