import React, {useState} from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Formik} from 'formik';
import * as yup from 'yup';
import {unwrapResult} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  Cli_RegisterCustomer,
  MB_RegisterPhoneNumber,
} from './../../Slice/SliceCustomer';
import {showMessage, hideMessage} from 'react-native-flash-message';

function RegisterInfo(props) {
  const {navigation, route} = props;
  const {params} = route.params;
  const {checkPhone} = route.params;
  const dispatch = useDispatch();
  const [register, setRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkClickNew, setCheckClickNew] = useState(false);
  const [checkClickReNew, setCheckClickReNew] = useState(false);

  const initialValues = {
    customerName: '',
    email: '',
    password: '',
    phoneNumber: params,
    repass: '',
  };

  const handleSubmitFrom = values => {
    setLoading(true);
    setTimeout(async () => {
      if (checkPhone === false) {
        if (values.password !== values.repass) {
          setLoading(false);
          showMessage({
            message: 'Mật khẩu không khớp',
            type: 'danger',
            backgroundColor: '#D13B3B',
          });
        } else {
          dispatch(Cli_RegisterCustomer(values))
            .then(unwrapResult)
            .then(payload => {
              setRegister(true);
              setLoading(false);

              navigation.navigate('LoginPage');
            })
            .catch(err => {
              setLoading(false);
              setRegister(false);
              showMessage({
                message: err.message,
                type: 'danger',
                backgroundColor: '#D13B3B',
              });
            });
        }
      } else {
        if (values.password !== values.repass) {
          setLoading(false);
          showMessage({
            message: 'Mật khẩu không khớp',
            type: 'danger',
            backgroundColor: '#D13B3B',
          });
        } else {
          dispatch(MB_RegisterPhoneNumber(values))
            .then(unwrapResult)
            .then(payload => {
              setRegister(true);
              setLoading(false);
              navigation.navigate('LoginPage');
            })
            .catch(err => {
              setLoading(false);
              setRegister(false);
              showMessage({
                message: err.message,
                type: 'danger',
                backgroundColor: '#D13B3B',
              });
            });
        }
      }
    }, 1500);
  };

  const validateSchema = yup.object().shape({
    customerName: yup
      .string()
      .trim()
      .required('* Họ & tên không được để trống'),
    email: yup
      .string()
      .email('* Email không hợp lệ')
      .required('* Email không để trống'),
    password: yup
      .string()
      .trim()
      .required('* Mật khẩu không để trống')
      .max(36, '* Mật khẩu quá dài')
      .min(8, '* Mật khẩu quá ngắn'),
    repass: yup
      .string()
      .trim()
      .required('* Mật khẩu không để trống')
      .max(36, '* Mật khẩu quá dài')
      .min(8, '* Mật khẩu quá ngắn'),
  });

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff', padding: 20}}>
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
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmitFrom}
        validationSchema={validateSchema}>
        {({handleChange, handleBlur, handleSubmit, values, errors}) => (
          <View>
            <View>
              <TextInput
                style={style.textInput}
                placeholderTextColor="grey"
                placeholder="Họ & tên"
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
                placeholderTextColor="grey"
                placeholder="Email"
                name="email"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
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
              <View style={style.passwordContainer}>
                <TextInput
                  placeholderTextColor="grey"
                  style={style.inputStyle}
                  autoCorrect={false}
                  secureTextEntry={checkClickNew === true ? false : true}
                  name="password"
                  placeholder="Mật khẩu"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                />
                <Icon
                  name="eye-outline"
                  color="#000"
                  size={24}
                  onPress={() => setCheckClickNew(true)}
                />
              </View>
              {errors.password && (
                <Text
                  style={{
                    fontSize: 12,
                    color: 'red',
                    fontFamily: 'Poppins-Medium',
                  }}>
                  {errors.password}
                </Text>
              )}
              <View style={style.passwordContainer}>
                <TextInput
                  placeholderTextColor="grey"
                  style={style.inputStyle}
                  autoCorrect={false}
                  secureTextEntry={checkClickReNew === true ? false : true}
                  name="repass"
                  placeholder="Nhập lại mật khẩu"
                  onChangeText={handleChange('repass')}
                  onBlur={handleBlur('repass')}
                  value={values.repass}
                />
                <Icon
                  name="eye-outline"
                  color="#000"
                  size={24}
                  onPress={() => setCheckClickReNew(true)}
                />
              </View>
              {errors.repass && (
                <Text
                  style={{
                    fontSize: 12,
                    color: 'red',
                    fontFamily: 'Poppins-Medium',
                  }}>
                  {errors.repass}
                </Text>
              )}
            </View>
            <Text style={style.textBtn} onPress={handleSubmit}>
              Hoàn thành
            </Text>
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  passwordContainer: {
    flexDirection: 'row',
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  textInput: {
    backgroundColor: '#f8f8f8',
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
    color: '#000',
    fontSize: 16,
    fontFamily: 'Poppins-Light',
    borderRadius: 10,
  },
  inputStyle: {
    flex: 1,
    color: '#000',
    fontSize: 16,
    fontFamily: 'Poppins-Light',
  },
  textBtn: {
    marginTop: 10,
    backgroundColor: 'rgb(254,46,100)',
    borderRadius: 10,
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    paddingVertical: 15,
    paddingHorizontal: 10,
    color: '#fff',
    textAlign: 'center',
  },
});

export default RegisterInfo;
