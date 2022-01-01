import React from 'react';
import {
  View,
  SafeAreaView,
  StatusBar,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import IconAnt from 'react-native-vector-icons/AntDesign';
import IconFont from 'react-native-vector-icons/FontAwesome';
import vcb from '../../asset/logo/vietcombank.jpg';

function PaymentMethodPage() {
  return (
    <SafeAreaView
      style={{backgroundColor: '#fff', paddingHorizontal: 15, flex: 1}}>
      <View>
        <View>
          <View style={style.flex}>
            <IconAnt name="creditcard" size={24} color="#FF4500" />
            <Text style={style.text}>Thanh toán thẻ ngân hàng</Text>
          </View>
          <View style={{paddingHorizontal: 15}}>
            <View style={style.flex}>
              <Image source={vcb} style={style.img} />
              <Text style={style.text}>VietcomBank</Text>
            </View>
          </View>
        </View>
        <View style={style.flex}>
          <IconFont name="money" size={24} color="#191970" />
          <Text style={style.text}>Thanh toán tiền mặt</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  flex: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontFamily: 'Poppins-Light',
    color: '#000',
    marginLeft: 10,
  },
  img: {
    width: 30,
    height: 30,
  },
});

export default PaymentMethodPage;
