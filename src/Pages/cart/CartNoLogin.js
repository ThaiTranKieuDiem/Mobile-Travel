import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import IconAnt from 'react-native-vector-icons/AntDesign';
import IconEnt from 'react-native-vector-icons/Entypo';
import IconF from 'react-native-vector-icons/FontAwesome';

function CartNoLogin(props) {
  const {onClickNavigation} = props;
  const handleClick = () => {
    if (onClickNavigation) {
      onClickNavigation();
    }
  };
  return (
    <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
      <StatusBar translucent barStyle="dark-content" backgroundColor="#fff" />
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View style={style.box}>
          <IconF name="user" size={100} color="#fff" style={{bottom: 0}} />
        </View>
        <View style={[style.box, {width: 200, height: 40}]}>
          <IconEnt name="dots-three-horizontal" size={40} color="#fff" />
          <IconEnt name="dots-two-horizontal" size={40} color="#fff" />
        </View>
        <View style={{paddingHorizontal: 15}}>
          <Text
            style={{
              fontFamily: 'Poppins-Light',
              fontSize: 16,
              color: '#000',
              textAlign: 'center',
            }}>
            Đăng nhập để có thể sự dụng tính năng quản lý tour
          </Text>
        </View>
        <Text style={style.textBtn} onPress={handleClick}>
          Đăng nhập
        </Text>
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  header: {
    backgroundColor: '#87CEFA',
    padding: 20,
    justifyContent: 'flex-start',
    width: '100%',
    alignItems: 'flex-end',
    height: 100,
    flexDirection: 'row',
  },
  textBtn: {
    marginTop: 10,
    backgroundColor: 'rgb(254,46,100)',
    borderRadius: 15,
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    paddingVertical: 10,
    paddingHorizontal: 20,
    color: '#fff',
    textAlign: 'center',
  },
  box: {
    width: 150,
    height: 150,
    borderRadius: 100,
    borderColor: 'grey',
    backgroundColor: '#E0E0E0',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    shadowColor: 'rgb(254,46,100)',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 10,
    elevation: 10,
    flexDirection: 'row',
  },
});
export default CartNoLogin;
