import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {formatPrice} from '../../utils/FormatNumber';
import {showMessage, hideMessage} from 'react-native-flash-message';

function BookTourPage(props) {
  const {navigation, route} = props;
  //
  const {params} = route.params;
  ///
  const [countAdult, setCountAdult] = useState(
    params.travelTypeId === '8f64fb01-91fe-4850-a004-35cf26a1c1ef'
      ? params.groupNumber
      : 1,
  );

  const [countChildren, setCountChildren] = useState(0);
  const [countBaby, setCountBaby] = useState(0);
  const [countYoung, setCountYoung] = useState(0);
  const [totalCount, setTotalCount] = useState(
    params.travelTypeId === '8f64fb01-91fe-4850-a004-35cf26a1c1ef'
      ? params.groupNumber
      : 1,
  );

  ///
  const scrolling = useRef(new Animated.Value(0)).current;
  const translation = scrolling.interpolate({
    inputRange: [100, 130],
    outputRange: [-100, 0],
    extrapolate: 'clamp',
  });

  ///

  const promotion = (params.adultUnitPrice * params.promotion) / 100;
  const promotionChildren = (params.childrenUnitPrice * params.promotion) / 100;
  const promotionBaby = (params.babyUnitPrice * params.promotion) / 100;
  ///
  const numTicket = {
    adult: countAdult,
    children: countChildren,
    baby: countBaby,
    infant: countYoung,
  };
  //
  const handelClickAddPeople = values => {
    if (params.groupNumber > 0) {
      showMessage({
        message: `Số lượng vé tối đa là ${params.groupNumber} `,
        type: 'danger',
        backgroundColor: '#D13B3B',
      });
    } else {
      if (totalCount > params.quanity - 1) {
        showMessage({
          message: 'Đã đủ số lượng người tham gia',
          type: 'danger',
          backgroundColor: '#D13B3B',
        });
      } else {
        if (values === 'addAdult') {
          setCountAdult(prevCount => prevCount + 1);
          //setTotalCount(countAdult + 1 + countChildren + countBaby + countYoung);
        }
        if (values === 'addChildren') {
          setCountChildren(prevCount => prevCount + 1);
          //setTotalCount(countAdult + 1 + countChildren + countBaby + countYoung);
        }
        if (values === 'addBaby') {
          setCountBaby(prevCount => prevCount + 1);
          //setTotalCount(countAdult + 1 + countChildren + countBaby + countYoung);
        }
        if (values == 'addYoung') {
          if (countYoung === 2) {
            showMessage({
              message: 'Số vé em bé không được lớn hơn 2',
              type: 'danger',
              backgroundColor: '#D13B3B',
            });
          } else {
            setCountYoung(prevCount => prevCount + 1);
          }
          //setTotalCount(countAdult + 1 + countChildren + countBaby + countYoung);
        }
        setTotalCount(countAdult + 1 + countChildren + countBaby + countYoung);
      }
    }
  };
  //
  const handelClickDeletePeople = values => {
    if (params.groupNumber > 0) {
      showMessage({
        message: `Số lượng vé tối thiểu là ${params.groupNumber} `,
        type: 'danger',
        backgroundColor: '#D13B3B',
      });
    } else {
      if (values === 'deleteAdult') {
        if (countAdult === 1) {
          showMessage({
            message: 'Số vé người lớn tổi thiểu là 1',
            type: 'danger',
            backgroundColor: '#D13B3B',
          });
        } else {
          setCountAdult(prevCount => prevCount - 1);
        }
      }
      if (values === 'deleteChildren') {
        if (countChildren === 0) {
          showMessage({
            message: 'Số vé trẻ nhỏ không được là 0',
            type: 'danger',
            backgroundColor: '#D13B3B',
          });
        } else {
          setCountChildren(prevCount => prevCount - 1);
        }
      }
      if (values === 'deleteBaby') {
        if (countBaby === 0) {
          showMessage({
            message: 'Số vé trẻ em không được là 0',
            type: 'danger',
            backgroundColor: '#D13B3B',
          });
        } else {
          setCountBaby(prevCount => prevCount - 1);
        }
      }
      if (values == 'deleteYoung') {
        if (countYoung === 0) {
          showMessage({
            message: 'Số vé em bé không được là 0',
            type: 'danger',
            backgroundColor: '#D13B3B',
          });
        } else {
          setCountYoung(prevCount => prevCount - 1);
        }
      }
      setTotalCount(countAdult - 2 + countChildren + countBaby + countYoung);
    }
  };

  const adultUnitPrice = params.adultUnitPrice - promotion;
  const childrenUnitPrice =
    params.childrenUnitPrice === 0
      ? 0
      : params.childrenUnitPrice - promotionChildren;
  const babyUnitPrice =
    params.babyUnitPrice === 0 ? 0 : params.babyUnitPrice - promotionBaby;

  let sum =
    countAdult * adultUnitPrice +
    countChildren * childrenUnitPrice +
    countBaby * babyUnitPrice;

  const handleClick = () => {
    if (sum === 0) {
      Alert.alert('Vui lòng chọn vé');
    } else {
      navigation.navigate('PaymenTicketPage', {
        tour: params,
        ticket: numTicket,
        sumMoney: sum,
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

      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: scrolling,
                },
              },
            },
          ],
          {useNativeDriver: true},
        )}
        style={{flex: 1}}>
        <View
          style={{
            alignItems: 'center',
            flex: 1,
          }}>
          {/**box  */}
          <View style={[style.header]}>
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
          <View style={style.boxDetails}>
            <Text
              style={{
                color: '#000',
                fontFamily: 'Poppins-Medium',
                fontSize: 19,
              }}>
              {params.tourName}
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
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
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
                  {formatPrice(adultUnitPrice)}
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
                  {formatPrice(childrenUnitPrice)}
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
                <Text style={style.textCount}>Trẻ em</Text>
                <Text style={[style.textCount, {color: '#f00'}]}>
                  {formatPrice(babyUnitPrice)}
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
            <View style={style.boxCount}>
              <View>
                <Text style={style.textCount}>Em bé</Text>
                <Text style={[style.textCount, {color: '#f00'}]}>
                  {formatPrice(0)}
                </Text>
              </View>
              <View style={style.count}>
                <Text
                  id="deleteYoung"
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
                  {countYoung}
                </Text>
                <Text
                  id="addYoung"
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
        <View style={style.footer}>
          <View>
            <Text
              style={{
                fontSize: 20,
                fontFamily: 'Salsa-Regular',
                textDecorationLine: 'line-through',
                color: '#FF4500',
              }}>
              {formatPrice(
                countAdult * params.adultUnitPrice +
                  countChildren * params.childrenUnitPrice +
                  countBaby * params.babyUnitPrice,
              )}
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontFamily: 'Salsa-Regular',
                color: '#FF4500',
              }}>
              {formatPrice(sum)}
            </Text>
          </View>
          <Text
            style={[style.textBtn, {backgroundColor: '#87CEFA'}]}
            onPress={handleClick}>
            Đặt Ngay
          </Text>
        </View>
      </Animated.ScrollView>
      <Animated.View
        style={[
          style.header,
          {
            transform: [{translateY: translation}],
            position: 'absolute',
            backgroundColor: '#fff',
            height: 80,
            top: 0,
            borderBottomColor: '#f8f8f8',
            borderBottomWidth: 2,
          },
        ]}>
        <Icon
          name="arrow-back-ios"
          size={28}
          color="#000"
          onPress={navigation.goBack}
        />
        <Text
          style={{
            color: '#000',
            fontSize: 23,
            fontFamily: 'Montserrat-Medium',
            marginLeft: 50,
          }}>
          Tùy chọn vé tour
        </Text>
      </Animated.View>
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
    top: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  boxDetails: {
    backgroundColor: '#fff',
    width: '93%',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginVertical: 20,
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
