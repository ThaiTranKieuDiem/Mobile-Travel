import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import DestinationItem from './DestinationItem';
import {useNavigation} from '@react-navigation/native';

function DestionationList(props) {
  const navigation = useNavigation();
  return (
    <View style={{paddingHorizontal: 15, flex: 1}}>
      <Text style={style.text}>Điểm đến yêu thích</Text>
      <Text
        style={{
          marginBottom: 10,
          fontFamily: 'Poppins-Light',
        }}>
        Địa điểm hot nhât do Mytour đề xuất
      </Text>
      <View style={{height: 670, position: 'relative'}}>
        <DestinationItem
          //height={150}
          style={{
            top: 0,
            left: 0,
            height: 150,
            width: '100%',
          }}
          styleImage={[style.image1, {width: '100%', height: 150}]}
          source={{
            uri: 'http://hanoimoi.com.vn/Uploads/images/tuandiep/2020/08/05/Thanh-Pho-Ho-Chi-Minh-Quyet.jpg',
          }}
          place="TP Ho Chi Minh"
        />
        <DestinationItem
          style={{
            width: '40%',
            height: 300,
            top: 170,
            left: 0,
            position: 'absolute',
          }}
          styleImage={[style.image1, {width: '100%', height: 300}]}
          source={{
            uri: 'https://kenh14cdn.com/2017/vinalo-1468654230m4wgx0ur-1483343002915.jpeg',
          }}
          place="TP Da Lat"
        />
        <DestinationItem
          height={140}
          style={{
            width: '55%',
            height: 140,
            top: 170,
            right: 0,
            position: 'absolute',
          }}
          styleImage={[style.image1, {width: '100%', height: 140}]}
          source={{
            uri: 'https://thegioibantin.com/wp-content/uploads/2021/03/Nguo%CC%82%CC%80n-go%CC%82%CC%81c-te%CC%82n-go%CC%A3i-Ba%CC%80-Ri%CC%A3a-%E2%80%93-Vu%CC%83ng-Ta%CC%80u-Co%CC%81-tha%CC%A3%CC%82t-di%CC%A3a-danh-Ba%CC%80-Ri%CC%A3a-du%CC%9Bo%CC%9B%CC%A3c-la%CC%82%CC%81y-tu%CC%9B%CC%80-te%CC%82n-mo%CC%A3%CC%82t-ngu%CC%9Bo%CC%9B%CC%80i-phu%CC%A3-nu%CC%9B%CC%83-te%CC%82n-Nguye%CC%82%CC%83n-Thi%CC%A3-Ri%CC%A3a-hay-kho%CC%82ng4.jpeg',
          }}
          place="TP Vung Tau"
        />
        <DestinationItem
          height={140}
          style={{
            width: '55%',
            height: 140,
            top: 330,
            right: 0,
            position: 'absolute',
          }}
          styleImage={[style.image1, {width: '100%', height: 140}]}
          source={{
            uri: 'https://kinhtenongthon.vn/media/news/be8eca3856293b0591f6240af2b62091/40692162_9381807_image_a_23_1616-1616460198504.jpg',
          }}
          place="TP Da Nang"
        />
        <DestinationItem
          style={{
            width: '55%',
            height: 140,
            top: 490,
            left: 0,
            position: 'absolute',
          }}
          styleImage={[style.image1, {width: '100%', height: 140}]}
          source={{
            uri: 'https://timchuyenbay.com/assets/uploads/2021/03/ho-guom-ha-noi.jpg',
          }}
          place="Ha Noi"
        />
        <DestinationItem
          style={{
            width: '40%',
            height: 140,
            top: 490,
            right: 0,
            position: 'absolute',
          }}
          styleImage={[style.image1, {width: '100%', height: 140}]}
          source={{
            uri: 'https://chuyennhuong.truongphucland.vn/wp-content/uploads/2019/11/shophouse-sun-group-dia-trung-hai-phu-quoc.jpg',
          }}
          place="Phu Quoc"
        />
      </View>
    </View>
  );
}
const style = StyleSheet.create({
  text: {
    color: '#000',
    fontSize: 24,
    fontFamily: 'Poppins-Medium',
  },
  image1: {
    marginVertical: 10,
    borderRadius: 10,
  },
  button: {
    textAlign: 'center',
    fontSize: 18,
    borderColor: 'grey',
    borderWidth: 1,
    width: 200,
    height: 40,
    color: '#000',
    lineHeight: 40,
    borderRadius: 10,
    marginBottom: 20,
    fontFamily: 'Poppins-light',
  },
});
export default DestionationList;
