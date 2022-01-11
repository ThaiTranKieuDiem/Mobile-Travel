import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import IconIon from 'react-native-vector-icons/Ionicons';
import IconFont5 from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';

function CustomerNoLogin(props) {
  const {
    onClickLogin,
    onClickRegister,
    onClickSecurity,
    onClickMyTour,
    onClickNotification,
  } = props;
  const navigation = useNavigation();

  const handleClickLogin = () => {
    if (onClickLogin) onClickLogin();
  };
  const handleClickRegister = () => {
    if (onClickRegister) onClickRegister();
  };

  const handleClickMyTour = () => {
    if (onClickMyTour) {
      onClickMyTour();
    }
  };
  const handleClickSecurity = () => {
    if (onClickSecurity) {
      onClickSecurity();
    }
  };
  const handleClickNotifications = () => {
    if (onClickNotification) {
      onClickNotification();
    }
  };

  return (
    <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
      <StatusBar
        translucent
        barStyle="dark-content"
        backgroundColor="rgba(0,0,0,0)"
      />
      <ScrollView>
        <View
          style={[
            style.header,
            {alignItems: 'center', justifyContent: 'center'},
          ]}>
          <IconFont5
            name="umbrella-beach"
            size={24}
            color="#00BFFF"
            style={{
              width: 50,
              height: 50,
              backgroundColor: '#fff',
              padding: 10,
              borderRadius: 50,
              marginTop: 20,
            }}
          />
          <Text style={style.text}>Chào mừng bạn đến với Mytour.vn</Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={[style.text, {fontFamily: 'Poppins-Medium'}]}>
              {' '}
              Đăng nhập{' '}
            </Text>
            <Text style={style.text}>để nhận được nhiều ưu đãi</Text>
          </View>
          <Text
            style={{
              color: '#fff',
              fontFamily: 'Poppins-Medium',
              fontSize: 18,
              backgroundColor: 'rgb(254,46,100)',
              paddingHorizontal: 25,
              marginVertical: 5,
              paddingVertical: 5,
              borderRadius: 10,
            }}
            onPress={handleClickLogin}>
            Đăng nhập
          </Text>
          <View style={{flexDirection: 'row', paddingVertical: 3}}>
            <Text style={style.text}>Chưa có tài khoản? </Text>
            <Text
              style={[
                style.text,
                {color: '#00B', fontFamily: 'Poppins-Medium'},
              ]}
              onPress={handleClickRegister}>
              Đăng ký ngay
            </Text>
          </View>
        </View>
        <View style={style.content}>
          <View
            style={{
              borderBottomColor: '#D2D4D2',
              borderBottomWidth: 1,
              paddingBottom: 40,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <IconIon
                name="notifications"
                size={24}
                color="#fff"
                style={[
                  style.icon,
                  {
                    backgroundColor: 'rgb(254,46,100)',
                  },
                ]}
              />
              <Text
                style={[style.text, {fontSize: 17}]}
                onPress={handleClickNotifications}>
                Thông báo
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <IconIon
                name="share-social-sharp"
                size={24}
                color="#fff"
                style={[style.icon, {backgroundColor: '#16BA3A'}]}
              />
              <Text style={[style.text, {fontSize: 17}]}>
                Giới thiệu bạn bè
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <IconFont5
                name="headphones-alt"
                size={24}
                color="#747875"
                style={[style.icon, {backgroundColor: '#D2D4D2'}]}
              />
              <Text style={[style.text, {fontSize: 17}]}>
                Hotline 24/7: 1900 2083
              </Text>
            </View>
          </View>
          <View
            style={{
              paddingTop: 20,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <IconFont5
                name="umbrella-beach"
                size={23}
                color="#747875"
                style={[style.icon, {backgroundColor: '#D2D4D2'}]}
              />
              <Text
                style={[style.text, {fontSize: 17}]}
                onPress={handleClickMyTour}>
                Về MyTour.vn
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <IconIon
                name="lock-closed"
                size={24}
                color="#747875"
                style={[style.icon, {backgroundColor: '#D2D4D2'}]}
              />
              <Text
                style={[style.text, {fontSize: 17}]}
                onPress={handleClickSecurity}>
                Chính sách bảo mật
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <IconIon
                name="mail"
                size={24}
                color="#747875"
                style={[style.icon, {backgroundColor: '#D2D4D2'}]}
              />
              <Text style={[style.text, {fontSize: 17}]}>Gửi phản hồi</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const style = StyleSheet.create({
  header: {
    backgroundColor: '#87CEFA',
    flex: 1,
  },
  content: {
    flex: 2,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    paddingVertical: 10,
  },
  text: {
    color: '#000',
    fontFamily: 'Poppins-Light',
    fontSize: 16,
    paddingVertical: 3,
  },
  icon: {
    marginRight: 10,
    padding: 5,
    borderRadius: 15,
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
});
export default CustomerNoLogin;
