import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import facebook from '../../asset/logo/facebook.png';
import google from '../../asset/logo/google.png';
import apple from '../../asset/logo/apple.png';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useDispatch} from 'react-redux';
import {Cli_AccessToken} from './../../Slice/SliceCustomer';
import {unwrapResult} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import {showMessage, hideMessage} from 'react-native-flash-message';
import IconIon from 'react-native-vector-icons/Ionicons';

function LoginPage(props) {
  const {navigation} = props;
  const dispatch = useDispatch();
  const [login, setLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkPass, setCheckPass] = useState(false);

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = yup.object().shape({
    email: yup.string().required('* Không được để trống'),
    password: yup.string().required('* Không được để trống'),
  });

  const handleLogin = values => {
    const params = {
      email: values.email,
      password: values.password,
    };
    setLoading(true);
    setTimeout(() => {
      dispatch(Cli_AccessToken(params))
        .then(unwrapResult)
        .then(async payload => {
          setLogin(true);
          setLoading(false);
          await AsyncStorage.setItem(
            'accessTokenCustomer',
            JSON.stringify(payload),
          );
          showMessage({
            message: 'Đăng nhập thành công',
            type: 'success',
          });
          navigation.navigate('HomePage');
        })
        .catch(err => {
          setLogin(false);
          setLoading(false);
          showMessage({
            message: 'Tài khoản không hợp lệ',
            type: 'danger',
            backgroundColor: '#D13B3B',
          });
        });
    }, 3000);
  };

  return (
    <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
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
            Đăng nhập
          </Text>
        </View>
      </View>
      <View
        style={{
          flex: 2,
          paddingHorizontal: 30,
        }}>
        <View style={{marginVertical: 5}}>
          <View style={style.flex}>
            <Image source={facebook} style={style.image} />
            <Text style={style.text}>Đăng nhập bằng facebook</Text>
          </View>
          <View style={style.flex}>
            <Image source={google} style={style.image} />
            <Text style={style.text}>Đăng nhập bằng google</Text>
          </View>
          <View style={style.flex}>
            <Image source={apple} style={style.image} />
            <Text style={style.text}>Đăng nhập bằng apple</Text>
          </View>
        </View>
        <View style={{alignItems: 'center'}}>
          <Text
            style={{
              color: '#000',
              fontSize: 14,
              fontFamily: 'Poppins-Light',
            }}>
            Hoặc đăng nhập bằng số điện thoại hoặc email
          </Text>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleLogin}>
            {({handleChange, handleBlur, handleSubmit, values, errors}) => {
              return (
                <View style={{width: '100%', marginVertical: 10}}>
                  <TextInput
                    placeholder="Nhập số điện thoại hoặc email"
                    placeholderTextColor="#B0B0B0"
                    style={style.textInput}
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
                      placeholder="Mật khẩu"
                      placeholderTextColor="#B0B0B0"
                      style={{
                        flex: 1,
                        color: '#000',
                        fontSize: 16,
                        fontFamily: 'Poppins-Light',
                      }}
                      autoCorrect={false}
                      secureTextEntry={checkPass === true ? false : true}
                      name="password"
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                    />
                    <IconIon
                      name="eye-outline"
                      color="#000"
                      size={24}
                      onPress={() => setCheckPass(true)}
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
                  <Text
                    style={[
                      style.btn,
                      {
                        color: '#fff',
                        backgroundColor: 'rgb(254,46,100),',
                        marginTop: 10,
                      },
                    ]}
                    onPress={handleSubmit}>
                    Đăng nhập
                  </Text>
                </View>
              );
            }}
          </Formik>

          <Text style={[style.btn, {color: '#00BFFF'}]}>Quên mật khẩu</Text>
        </View>
      </View>
      <View style={{paddingHorizontal: 30}}>
        <Text
          style={[
            style.btn,
            {
              color: 'rgb(254,46,100)',
              borderColor: 'rgb(254,46,100)',
              borderWidth: 1,
              marginBottom: 20,
            },
          ]}
          onPress={() => navigation.navigate('RegisterPage')}>
          Đăng ký tài khoản
        </Text>
      </View>
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
  },
  btn: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    width: '100%',
    borderRadius: 10,
    textAlign: 'center',
    padding: 15,
  },
  passwordContainer: {
    flexDirection: 'row',
    backgroundColor: '#F0F8FF',
    borderRadius: 10,
    marginBottom: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
});

export default LoginPage;
