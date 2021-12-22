import React, {useEffect} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import Banner from '../components/Banner/Banner';
import TourItemList from '../components/Tour/TourItemList';
import TravelTypeList from '../components/TravelType/TravelTypeList';
import logo from '../asset/logo/logo-03.png';
import DestionationList from './../components/Destination/DestionationList';
import {
  Cli_GetTourListPagination,
  Cli_GetTourTourIsSuggest,
} from './../Slice/SliceTour';
import {useSelector, useDispatch} from 'react-redux';
import {unwrapResult} from '@reduxjs/toolkit';
import Spinner from 'react-native-loading-spinner-overlay';
import IconAnt from 'react-native-vector-icons/AntDesign';

function HomePage(props) {
  ///state store
  const {navigation} = props;
  const stateTour = useSelector(state => state?.tour);
  //console.log(stateTour.TourIsSuggest);
  ///
  const dispatch = useDispatch();

  //const dataTour
  ///get tour de xuat
  useEffect(() => {
    const fetchApi = () => {
      dispatch(Cli_GetTourTourIsSuggest())
        .then(unwrapResult)
        .then(payload => {
          //console.log(payload);
        })
        .catch(err => {
          console.log(err);
        });
    };
    fetchApi();
  }, []);

  const handleClickLoadTour = () => {
    navigation.navigate('TourPage');
  };

  return (
    <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
      <Spinner
        visible={stateTour.loading === 'loaded' ? false : true}
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

      <StatusBar
        translucent
        barStyle="dark-content"
        backgroundColor="rgba(0,0,0,0)"
      />
      {/**HeaderSearch */}
      <View style={style.header}>
        <Image
          style={{
            width: 100,
            height: 80,
          }}
          source={logo}
        />
        <View style={style.search}>
          <TextInput
            key="textSearch"
            style={{
              flex: 1,
              fontSize: 16,
              fontFamily: 'Poppins-Light',
            }}
            placeholder="Địa điểm, khách sạn,..."
            onPressIn={() => navigation.navigate('SearchHome')}
          />
          <IconAnt name="search1" size={18} color="#000" />
        </View>
      </View>
      {/**End HeaderSearch */}
      <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
        <TravelTypeList />
        <Banner style={{flex: 1}} />
        <View style={{flex: 1}}>
          <TourItemList
            horizontal={true}
            dataTour={stateTour?.TourIsSuggest}
            title="Tin nổi không?"
            description="Giá sốc chỉ có trên Mytour"
            onPresBtn={handleClickLoadTour}
          />
          <TourItemList
            horizontal={true}
            dataTour={stateTour?.TourIsSuggest}
            title="Tour nổi bật"
            description="Tour nổi bật bởi khách hàng"
            onPresBtn={handleClickLoadTour}
          />
          <DestionationList />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const style = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 100,
    padding: 20,
    marginTop: 10,
  },
  search: {
    flexDirection: 'row',
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    alignItems: 'center',
    width: 250,
    paddingHorizontal: 10,
    height: 50,
  },
});
export default HomePage;
