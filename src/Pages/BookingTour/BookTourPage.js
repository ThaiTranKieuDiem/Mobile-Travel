import React, {useEffect, useState} from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {formatPrice} from '../../utils/FormatNumber';

function BookTourPage(props) {
  const {navigation, route} = props;
  ///
  const [countAdult, setCountAdult] = useState(0);
  const [countChildren, setCountChildren] = useState(0);
  const [countBaby, setCountBaby] = useState(0);

  ///
  const {params} = route.params;


  //
  const numTicket = {
    adult: countAdult,
    children: countChildren,
    baby: countBaby,
  };
  //

  const handelClickAddPeople = values => {
    if (values === 'addAdult') {
      setCountAdult(prevCount => prevCount + 1);
    }
    if (values === 'addChildren') {
      setCountChildren(prevCount => prevCount + 1);
    }
    if (values === 'addBaby') {
      setCountBaby(prevCount => prevCount + 1);
    }
  };
  //
  const handelClickDeletePeople = values => {
    if (values === 'deleteAdult') {
      setCountAdult(prevCount => prevCount - 1);
    }
    if (values === 'deleteChildren') {
      setCountChildren(prevCount => prevCount - 1);
    }
    if (values === 'deleteBaby') {
      setCountBaby(prevCount => prevCount - 1);
    }
  };
  //

  const SumMoney = () => {
    let sum =
      countAdult * params.adultUnitPrice +
      countChildren * params.childrenUnitPrice +
      countBaby * params.babyUnitPrice;
    return sum;
  };
  //console.log(SumMoney);

  const handleClick = () => {
    if (SumMoney() === 0) {
      Alert.alert('Vui lòng chọn vé');
    } else {
      navigation.navigate('InformationTicket', {
        tour: params,
        ticket: numTicket,
      });
    }
  };

  return (
    <SafeAreaView style={{backgroundColor: '#F8F8F8', flex: 1}}>
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor="rgba(0,0,0,0)"
      />
      <ScrollView>
        <View style={style.header}>
          <Icon
            name="arrow-back-ios"
            size={28}
            color="#fff"
            onPress={navigation.goBack}
          />
          <Text
            style={{
              color: '#fff',
              fontSize: 23,
              fontFamily: 'Montserrat-Medium',
              marginLeft: 50,
            }}>
            Tùy chọn vé tour
          </Text>
        </View>
        <View
          style={{
            alignItems: 'center',
            flex: 1,
          }}>
          {/**box  */}
          <View style={style.boxDetails}>
            <Text
              style={{
                color: '#000',
                fontFamily: 'Poppins-Medium',
                fontSize: 19,
              }}>
              Tour biển Phú Quốc
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Icon name="flash-on" size={24} color="#FF4500" />
              <Text style={{fontSize: 16, marginVertical: 5}}>
                Xác nhận tức thời
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Icon name="attach-money" size={24} />
              <Text style={{fontSize: 16, marginVertical: 5}}>
                Hoàn trả tiền miễn phí trong 48h
              </Text>
            </View>
          </View>

          {/**Hành khách */}
          <View
            style={{
              width: '93%',
              borderRadius: 10,
              overflow: 'hidden',
              backgroundColor: '#fff',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                textAlign: 'left',
                padding: 20,
              }}>
              <Icon name="align-vertical-center" color="#FF4500" size={24} />
              <Text
                style={{
                  color: '#000',
                  fontFamily: 'Poppins-Medium',
                  fontSize: 19,
                }}>
                Hành khách
              </Text>
            </View>
            <View style={style.boxCount}>
              <View>
                <Text style={style.textCount}>Người lớn</Text>
                <Text style={[style.textCount, {color: '#f00'}]}>
                  {formatPrice(params.adultUnitPrice)}
                </Text>
              </View>
              <View style={style.count}>
                <Text
                  id="deleteAdult"
                  style={[
                    style.boxBtn,
                    {color: '#FF4500', borderColor: '#FF4500'},
                  ]}
                  onPress={value => {
                    handelClickDeletePeople(value._targetInst.memoizedProps.id);
                  }}>
                  -
                </Text>
                <Text style={{fontSize: 20, lineHeight: 30, height: 30}}>
                  {countAdult}
                </Text>
                <Text
                  id="addAdult"
                  style={[style.boxBtn, {color: '#f00', borderColor: '#f00'}]}
                  onPress={value => {
                    handelClickAddPeople(value._targetInst.memoizedProps.id);
                  }}>
                  +
                </Text>
              </View>
            </View>
            <View style={style.boxCount}>
              <View>
                <Text style={style.textCount}>Trẻ nhỏ</Text>
                <Text style={[style.textCount, {color: '#f00'}]}>
                  {formatPrice(params.childrenUnitPrice)}
                </Text>
              </View>
              <View style={style.count}>
                <Text
                  id="deleteChildren"
                  style={[
                    style.boxBtn,
                    {color: '#FF4500', borderColor: '#FF4500'},
                  ]}
                  onPress={value => {
                    handelClickDeletePeople(value._targetInst.memoizedProps.id);
                  }}>
                  -
                </Text>
                <Text style={{fontSize: 20, lineHeight: 30, height: 30}}>
                  {countChildren}
                </Text>
                <Text
                  id="addChildren"
                  style={[style.boxBtn, {color: '#f00', borderColor: '#f00'}]}
                  onPress={value => {
                    handelClickAddPeople(value._targetInst.memoizedProps.id);
                  }}>
                  +
                </Text>
              </View>
            </View>
            <View style={style.boxCount}>
              <View>
                <Text style={style.textCount}>Em bé</Text>
                <Text style={[style.textCount, {color: '#f00'}]}>
                  {formatPrice(params.babyUnitPrice)}
                </Text>
              </View>
              <View style={style.count}>
                <Text
                  id="deleteBaby"
                  style={[
                    style.boxBtn,
                    {color: '#FF4500', borderColor: '#FF4500'},
                  ]}
                  onPress={value => {
                    handelClickDeletePeople(value._targetInst.memoizedProps.id);
                  }}>
                  -
                </Text>
                <Text style={{fontSize: 20, lineHeight: 30, height: 30}}>
                  {countBaby}
                </Text>
                <Text
                  id="addBaby"
                  style={[style.boxBtn, {color: '#f00', borderColor: '#f00'}]}
                  onPress={value => {
                    handelClickAddPeople(value._targetInst.memoizedProps.id);
                  }}>
                  +
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={style.footer}>
        <Text
          style={{
            fontSize: 20,
            fontFamily: 'Poppins-Medium',
            color: '#FF4500',
            marginTop: 10,
          }}>
          {formatPrice(SumMoney())}
        </Text>
        <Text
          style={[style.textBtn, {backgroundColor: '#87CEFA'}]}
          onPress={handleClick}>
          Đặt Ngay
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
    alignItems: 'center',
    height: 150,
    flexDirection: 'row',
  },
  boxDetails: {
    backgroundColor: '#fff',
    width: '93%',
    padding: 20,
    borderRadius: 10,
    transform: [{translateY: -40}],
  },
  information: {
    backgroundColor: '#fff',
    width: '93%',
    padding: 20,
    borderRadius: 10,
  },
  text: {
    fontSize: 16,
    textAlign: 'left',
    width: '100%',
    marginLeft: 20,
    marginBottom: 10,
  },

  boxCount: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#F8F8F8',
    borderBottomWidth: 2,
  },
  count: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 120,
  },
  boxBtn: {
    borderRadius: 5,
    borderWidth: 1,
    width: 30,
    height: 30,
    textAlign: 'center',
    lineHeight: 30,
    fontWeight: '400',
    fontSize: 20,
    fontFamily: 'Poppins-Light',
  },
  footer: {
    backgroundColor: '#fff',
    height: 80,
    paddingHorizontal: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    marginTop: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  textBtn: {
    backgroundColor: '#87CEEB',
    color: '#fff',
    borderRadius: 5,
    height: 40,
    textAlign: 'center',
    lineHeight: 40,
    fontSize: 16,
    width: '48%',
    fontFamily: 'Poppins-Medium',
  },
  textCount: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
});

export default BookTourPage;
