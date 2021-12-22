import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import Swiper from 'react-native-swiper';
import backpack from '../asset/icons/iconViewPage/backpack.png';
import flight from '../asset/icons/iconViewPage/flight.png';
import line from '../asset/icons/iconViewPage/destination-line.png';

function WelcomePage(props) {
  const {navigation} = props;
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Swiper style={styles.wrapper}>
        <View style={styles.slide1}>
          <Image style={styles.flight} source={flight} />
          <Image style={styles.line} source={line} />
          <View style={{top: 220}}>
            <Text style={[styles.text, {color: '#fff'}]}>Cùng MYTOUR </Text>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Text style={[styles.text, {color: 'yellow'}]}>#Du lịch</Text>
              <Text style={[styles.text, {color: '#FFBF00', fontSize: 40}]}>
                {' '}
                4.0
              </Text>
            </View>
            <Text style={[styles.text, {color: '#fff', fontSize: 28}]}>
              Chạm tay, có ngay kì nghỉ
            </Text>
          </View>
          <Image style={styles.backpack} source={backpack} />
        </View>
        <View style={styles.slide2}>
          <Text style={styles.text}>Ứng dụng thõa mãn mọi </Text>
          <Text style={styles.text}>nhu cầu du lịch</Text>
        </View>
        <View style={styles.slide3}>
          <Text style={styles.text}>Ưu đãi độc quyền</Text>
          <Text style={styles.text}>dành riêng cho app</Text>
        </View>
      </Swiper>
      <TouchableOpacity>
        <Text
          style={styles.next}
          onPress={() => navigation.navigate('HomePage')}>
          Bỏ qua
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {},
  slide: {
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  text: {
    fontFamily: 'IndieFlower-Regular',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  slide1: {
    flex: 1,
    backgroundColor: '#9DD6EB',
  },
  flight: {
    top: 50,
    position: 'absolute',
    right: 10,
  },
  line: {
    width: 80,
    height: 80,
    top: 200,
    left: 200,
  },
  backpack: {
    top: 300,
    left: 50,
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  next: {
    position: 'absolute',
    bottom: 40,
    right: 30,
    textAlign: 'center',
    fontSize: 16,
    width: 80,
    height: 30,
    color: '#fff',
    backgroundColor: 'rgba(0,0,0, 0.3)',
    borderRadius: 10,
    lineHeight: 30,
  },
});

export default WelcomePage;
