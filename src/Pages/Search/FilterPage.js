import React, {useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  ScrollView,
  Button,
  StyleSheet,
} from 'react-native';
import TagGroup from 'react-native-tag-group';
import {useDispatch, useSelector} from 'react-redux';
import {Cli_GetProvince} from './../../Slice/SliceProvince';
import {unwrapResult} from '@reduxjs/toolkit';
import Spinner from 'react-native-loading-spinner-overlay';
import DatePicker from 'react-native-date-picker';
import IconAnt from 'react-native-vector-icons/AntDesign';
import {TextInput} from 'react-native';
import {format} from 'date-fns';
import {useNavigation} from '@react-navigation/native';

function FilterPage(props) {
  const navigation = useNavigation();
  ///
  const [province1, setProvince1] = useState([]);
  const [province2, setProvince2] = useState([]);
  const [province3, setProvince3] = useState([]);
  ///địa điểm xuất phát
  const [disabled1, setDisable1] = useState(false);
  const [disabled2, setDisable2] = useState(false);
  const [disableBtn, setDisableBtn] = useState(true);
  const [disableBtn2, setDisableBtn2] = useState(true);
  const [btnClose, setBtnClose] = useState(true);
  //
  const [departurePlaceFrom, setDeparturePlaceFrom] = useState('');
  //địa điểm du lịch
  const [disabledTo1, setDisableTo1] = useState(false);
  const [disabledTo2, setDisableTo2] = useState(false);
  const [disableBtnTo, setDisableBtnTo] = useState(true);
  const [disableBtn2To, setDisableBtn2To] = useState(true);
  const [btnCloseTo, setBtnCloseTo] = useState(true);
  //
  const [departurePlaceToName, setDeparturePlaceToName] = useState('');
  ///datePicker start
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());

  //
  //
  const dispatch = useDispatch();
  //
  const state = useSelector(state => state.province);

  ///

  useEffect(() => {
    const fetchApi = () => {
      dispatch(Cli_GetProvince({}))
        .then(unwrapResult)
        .then(payload => {
          var results1 = payload.slice(0, 10);
          var results2 = payload.slice(10, 40);
          var results3 = payload.slice(40, 63);
          setProvince1(results1);
          setProvince2(results2);
          setProvince3(results3);
        })
        .catch(err => {
          console.log(err);
        });
    };
    fetchApi();
  }, []);

  //địa điểm xuất phát

  const handleClickMore = () => {
    setDisable2(true);
    setDisableBtn2(false);
  };
  const handleClickNext = () => {
    setDisable1(true);
    setDisableBtn(false);
  };
  const handleClose = () => {
    setDisable1(false);
    setDisable2(false);
    setDisableBtn(true);
    setDisableBtn2(true);
  };

  const handleClickDeparturePlaceFrom = values => {
    setDeparturePlaceFrom(values);
  };

  //địa điểm du lịch
  const handleClickMoreTo = () => {
    setDisableTo2(true);
    setDisableBtn2To(false);
  };
  const handleClickNextTo = () => {
    setDisableTo1(true);
    setDisableBtnTo(false);
  };
  const handleCloseTo = () => {
    setDisableTo1(false);
    setDisableTo2(false);
    setDisableBtnTo(true);
    setDisableBtn2To(true);
  };
  const handleClickDeparturePlaceTo = values => {
    setDeparturePlaceToName(values);
  };
  //

  const handleClickButton = () => {
    var dateFilter = format(date, 'yyyy-MM-dd');
    var nowDate = format(new Date(), 'yyyy-MM-dd');
    const params = {
      DeparturePlaceFromName: departurePlaceFrom,
      departurePlaceToName: departurePlaceToName,
      DateStart: dateFilter === nowDate ? '' : dateFilter,
      limit: 10,
      page: 1,
    };
    navigation.navigate('TouristAttractionSearchPr', {search: {params}});
  };

  return (
    <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
      <Spinner
        visible={state.loading === 'loaded' ? false : true}
        textContent=""
        textStyle={{color: '#FFF'}}
        animation="fade"
        style={{
          flex: 1,
          justifyContent: 'center',
          textAlign: 'center',
          paddingTop: 30,
          backgroundColor: '#ecf0f1',
          padding: 8,
        }}
      />
      <ScrollView>
        {/**tìm kiếm theo địa điểm xuất phát */}
        <View>
          <Text
            style={{
              fontFamily: 'Poppins-Medium',
              color: '#000',
              paddingVertical: 15,
              fontSize: 15,
            }}>
            Theo Địa điểm xuất phát
          </Text>
          <View>
            <TagGroup
              singleChoiceMode={true}
              source={province1.map(item => {
                return item.label;
              })}
              tagStyle={style.tag}
              textStyle={{
                fontSize: 14,
                fontFamily: 'Poppins-Light',
                color: '#000',
              }}
              onSelectedTagChange={handleClickDeparturePlaceFrom}
            />
            {disableBtn && (
              <Text
                style={[
                  style.text,
                  {textAlign: 'center', width: '100%', padding: 10},
                ]}
                onPress={handleClickNext}>
                Hiển thị nhiều hơn
              </Text>
            )}
          </View>
          {disabled1 && (
            <View>
              <TagGroup
                singleChoiceMode={true}
                source={province2.map(item => {
                  return item.label;
                })}
                tagStyle={style.tag}
                textStyle={{
                  fontSize: 14,
                  fontFamily: 'Poppins-Light',
                  color: '#000',
                }}
                onSelectedTagChange={handleClickDeparturePlaceFrom}
              />
              {disableBtn2 && (
                <Text
                  style={[
                    style.text,
                    {textAlign: 'center', width: '100%', padding: 10},
                  ]}
                  onPress={handleClickMore}>
                  Hiển thị thêm
                </Text>
              )}
            </View>
          )}
          {disabled2 && (
            <View>
              <TagGroup
                singleChoiceMode={true}
                source={province3.map(item => {
                  return item.label;
                })}
                tagStyle={style.tag}
                textStyle={{
                  fontSize: 14,
                  fontFamily: 'Poppins-Light',
                  color: '#000',
                }}
                onSelectedTagChange={handleClickDeparturePlaceFrom}
              />
              {btnClose && (
                <Text
                  style={[
                    style.text,
                    {textAlign: 'center', width: '100%', padding: 10},
                  ]}
                  onPress={handleClose}>
                  Thu gọn
                </Text>
              )}
            </View>
          )}
        </View>
        {/**end */}
        {/**Tìm kiếm theo địa điểm du lịch */}
        <View>
          <Text
            style={{
              fontFamily: 'Poppins-Medium',
              color: '#000',
              paddingVertical: 15,
              fontSize: 15,
            }}>
            Theo Địa điểm du lịch
          </Text>
          <View>
            <TagGroup
              singleChoiceMode={true}
              source={province1.map(item => {
                return item.label;
              })}
              tagStyle={style.tag}
              textStyle={{
                fontSize: 14,
                fontFamily: 'Poppins-Light',
                color: '#000',
              }}
              onSelectedTagChange={handleClickDeparturePlaceTo}
            />
            {disableBtnTo && (
              <Text
                style={[
                  style.text,
                  {textAlign: 'center', width: '100%', padding: 10},
                ]}
                onPress={handleClickNextTo}>
                Hiển thị nhiều hơn
              </Text>
            )}
          </View>
          {disabledTo1 && (
            <View>
              <TagGroup
                singleChoiceMode={true}
                source={province2.map(item => {
                  return item.label;
                })}
                tagStyle={style.tag}
                textStyle={{
                  fontSize: 14,
                  fontFamily: 'Poppins-Light',
                  color: '#000',
                }}
                onSelectedTagChange={handleClickDeparturePlaceTo}
              />
              {disableBtn2To && (
                <Text
                  style={[
                    style.text,
                    {textAlign: 'center', width: '100%', padding: 10},
                  ]}
                  onPress={handleClickMoreTo}>
                  Hiển thị thêm
                </Text>
              )}
            </View>
          )}
          {disabledTo2 && (
            <View>
              <TagGroup
                singleChoiceMode={true}
                source={province3.map(item => {
                  return item.label;
                })}
                tagStyle={style.tag}
                textStyle={{
                  fontSize: 14,
                  fontFamily: 'Poppins-Light',
                  color: '#000',
                }}
                onSelectedTagChange={handleClickDeparturePlaceTo}
              />
              {btnCloseTo && (
                <Text
                  style={[
                    style.text,
                    {textAlign: 'center', width: '100%', padding: 10},
                  ]}
                  onPress={handleCloseTo}>
                  Thu gọn
                </Text>
              )}
            </View>
          )}
        </View>
        {/**end */}
        {/**Thoe ngày */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontFamily: 'Poppins-Medium',
              color: '#000',
              paddingVertical: 15,
              fontSize: 15,
            }}>
            Ngày khởi hành
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TextInput
              value={format(date, 'yyyy-MM-dd')}
              editable={false}
              style={style.date}></TextInput>
            <IconAnt
              name="calendar"
              onPress={() => setOpen(true)}
              size={24}
              color="#000"
            />
            <DatePicker
              modal
              mode="date"
              open={open}
              date={date}
              minimumDate={new Date()}
              onConfirm={date => {
                setOpen(false);
                setDate(date);
                console.log(date);
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />
          </View>
        </View>
        {/**end */}
        <View
          style={{
            flexDirection: 'row',
            marginTop: 30,
            justifyContent: 'flex-end',
          }}>
          <Text style={style.btn} onPress={handleClickButton}>
            Tìm kiếm
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  text: {
    fontSize: 15,
    fontFamily: 'Poppins-Light',
    color: '#000',
  },
  tag: {
    height: 35,
    borderColor: '#fff',
    backgroundColor: '#f8f8f8',
    width: '47%',
  },
  date: {
    width: 200,
    height: 40,
    backgroundColor: '#f8f8f8',
    color: '#000',
    borderRadius: 10,
  },
  btn: {
    marginTop: 10,
    backgroundColor: 'rgb(254,46,100)',
    borderRadius: 10,
    fontSize: 18,
    width: '100%',
    fontFamily: 'Poppins-Medium',
    paddingVertical: 10,
    paddingHorizontal: 20,
    color: '#fff',
    textAlign: 'center',
  },
});

export default FilterPage;
