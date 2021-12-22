import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Formik} from 'formik';
import * as yup from 'yup';
import {unwrapResult} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import {Cli_ChangePassword} from '../../Slice/SliceCustomer';

function ChangePasswordPage(props) {
  const {navigation, route} = props;
  //
  const initialValues = {
    customerId: '',
    password: '',
    passwordOld: '',
    repass: '',
  };
  //
  const [checkClickOld, setCheckClickOld] = useState(false);
  const [checkClickNew, setCheckClickNew] = useState(false);
  const [checkClickReNew, setCheckClickReNew] = useState(false);
  const [loading, setLoading] = useState(false);
  //
  const {params} = route.params;
  //
  const dispatch = useDispatch();

  const validateSchema = yup.object().shape({
    passwordOld: yup
      .string()
      .trim()
      .required('* Password không được để trống')
      .matches(params.password, 'Sai mật khẩu'),
    password: yup
      .string()
      .trim()
      .required('* Mật khẩu không để trống')
      .max(36, '* Mật khẩu quá dài')
      .min(8, '* Mật khẩu quá ngắn'),
    repass: yup.string().trim().required('* Mật khẩu không để trống'),
  });

  ///
  const handleClickSubmit = values => {
    setLoading(true);
    setTimeout(async () => {
      dispatch(
        Cli_ChangePassword(
          Object.assign(values, {
            customerId: params.customerId,
          }),
        ),
      )
        .then(unwrapResult)
        .then(payload => {
          setLoading(false);
          navigation.navigate('HomePage');
        })
        .catch(error => {
          console.log(error);
          setLoading(false);
          Alert.alert('Thất bại');
        });
    }, 3000);
  };
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
        validationSchema={validateSchema}
        onSubmit={handleClickSubmit}>
        {({handleChange, handleBlur, handleSubmit, values, errors}) => {
          return (
            <View>
              <View style={style.passwordContainer}>
                <TextInput
                  placeholder="Mật khẩu cũ"
                  style={style.textInput}
                  autoCorrect={false}
                  secureTextEntry={checkClickOld === true ? false : true}
                  name="passwordOld"
                  onChangeText={handleChange('passwordOld')}
                  onBlur={handleBlur('passwordOld')}
                  value={values.passwordOld}
                />
                <Icon
                  name="eye-outline"
                  color="#000"
                  size={24}
                  onPress={() => setCheckClickOld(true)}
                />
              </View>
              {errors.passwordOld && (
                <Text
                  style={{
                    fontSize: 12,
                    color: 'red',
                    fontFamily: 'Poppins-Medium',
                  }}>
                  {errors.passwordOld}
                </Text>
              )}
              <View style={style.passwordContainer}>
                <TextInput
                  placeholder="Mật khẩu mới"
                  style={style.textInput}
                  autoCorrect={false}
                  secureTextEntry={checkClickNew === true ? false : true}
                  name="password"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('passwordNew')}
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
                  placeholder="Nhập lại mật khẩu mới"
                  style={style.textInput}
                  autoCorrect={false}
                  secureTextEntry={checkClickReNew === true ? false : true}
                  name="repass"
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
              <Text style={style.textBtn} onPress={handleSubmit}>
                Hoàn thành
              </Text>
            </View>
          );
        }}
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

export default ChangePasswordPage;
