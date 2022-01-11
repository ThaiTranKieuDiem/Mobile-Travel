import React, {useState} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconIon from 'react-native-vector-icons/Ionicons';
import IconFont5 from 'react-native-vector-icons/FontAwesome5';
import IconAnt from 'react-native-vector-icons/AntDesign';

function CustomerAccount(props) {
  const {
    onClickLogout,
    onClickInfo,
    onClickSecurity,
    onClickMyTour,
    name,
    onClickNotification,
  } = props;

  const handleClickLogout = async () => {
    if (onClickLogout) {
      onClickLogout();
    }
  };
  const handleClickInfo = () => {
    if (onClickInfo) onClickInfo();
  };


  const handleClickSecurity = () => {
    if (onClickSecurity) {
      onClickSecurity();
    }
  };

  const handleClickMyTour = () => {
    if (onClickMyTour) {
      onClickMyTour();
    }
  };

  const handleClickNotifications = () => {
    if (onClickNotification) {
      onClickNotification();
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor="rgba(0,0,0,0)"
      />
      <View style={style.header}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'flex-end',
            marginTop: 50,
          }}>
          <Icon name="user-circle-o" size={80} color="#fff" />
          <Text
            style={{
              color: '#fff',
              fontSize: 20,
              fontFamily: 'Poppins-Medium',
              marginTop: 10,
            }}>
            {name}
          </Text>
        </View>
      </View>
      <View style={style.content}>
        <View
          style={{
            borderBottomColor: '#D2D4D2',
            borderBottomWidth: 1,
            paddingBottom: 20,
          }}>
          <View style={style.flex}>
            <IconFont5
              name="user-edit"
              size={20}
              color="#fff"
              style={[style.icon, {backgroundColor: '#FFE4B5'}]}
            />
            <Text
              style={[style.text, {fontSize: 17}]}
              onPress={handleClickInfo}>
              Thông tin của tôi
            </Text>
          </View>
          <View View style={style.flex}>
            <IconIon
              name="notifications"
              size={23}
              color="#fff"
              style={[style.icon, {backgroundColor: '#E6E6FA'}]}
            />
            <Text
              style={[style.text, {fontSize: 17}]}
              onPress={handleClickNotifications}>
              Thông báo
            </Text>
          </View>
        </View>
        <View
          style={{
            paddingTop: 20,
          }}>
          <View style={style.flex}>
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
          <View style={style.flex}>
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
          <View style={style.flex}>
            <IconIon
              name="mail"
              size={24}
              color="#747875"
              style={[style.icon, {backgroundColor: '#D2D4D2'}]}
            />
            <Text style={[style.text, {fontSize: 17}]}>Gửi phản hồi</Text>
          </View>
          <View style={style.flex}>
            <IconAnt
              name="logout"
              size={24}
              color="#747875"
              style={[style.icon, {backgroundColor: '#D2D4D2'}]}
            />
            <Text
              style={[style.text, {fontSize: 17}]}
              onPress={handleClickLogout}>
              Đăng xuất
            </Text>
          </View>
        </View>
      </View>
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
  text: {
    color: '#000',
    fontFamily: 'Poppins-Light',
    fontSize: 16,
    paddingVertical: 3,
  },
});

export default CustomerAccount;
