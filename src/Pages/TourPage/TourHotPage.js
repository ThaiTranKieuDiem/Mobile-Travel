import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import dataTour from '../../consts/places';
import TourItemList from '../../components/Tour/TourItemList';
import circle_red from '../../asset/icons/iconBanner/circle-red.png';
import circle from '../../asset/icons/iconBanner/circle.png';
import hot_deals from '../../asset/icons/iconBanner/hot-deal.png';
import {useDispatch, useSelector} from 'react-redux';
import {Cli_GetTourListPagination} from '../../Slice/SliceTour';
import {unwrapResult} from '@reduxjs/toolkit';
import TourFavorite from './../../components/Tour/TourFavorite';

function TourHotPage(props) {
  const {navigation} = props;
  ///
  const [isLoading, setLoading] = useState(true);
  const [dataTour, setDataTour] = useState([]);
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
  });

  ///state store
  //const stateTour = useSelector(state => state.tour);

  const dispatch = useDispatch();
  //console.log(stateTour?.tourList);
  useEffect(() => {
    console.log(isLoading);
    const fetchApi = () => {
      dispatch(Cli_GetTourListPagination(params))
        .then(unwrapResult)
        .then(payload => {
          setDataTour(prev => prev.concat(payload?.data));
          console.log(payload.data);
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
        });
    };
    fetchApi();
  }, [params]);

  const renderFooter = () => {
    return isLoading ? (
      <View>
        <ActivityIndicator />
      </View>
    ) : null;
  };
  const handleLoadMore = () => {
    setParams({
      ...params,
      page: params.page + 1,
    });
    setLoading(true);
  };
  return (
    <SafeAreaView
      style={{flex: 1, position: 'relative', backgroundColor: '#fff'}}>
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor="rgba(0,0,0,0)"
      />
      <View style={style.header}>
        <Text style={style.title}>Tour nổi bật</Text>
        <Text style={style.text}>Tour được đánh giá bởi người dùng</Text>
        <Image
          style={[style.image, {top: 25, right: -25}]}
          source={circle_red}
        />
        <Image
          style={[style.image, {top: 50, right: 10, width: 50, height: 50}]}
          source={circle}
        />
        <Image style={[style.image, {top: 0, left: -20}]} source={circle} />
        <Image
          style={[style.image, {top: 35, left: 15, width: 30, height: 30}]}
          source={circle_red}
        />
        <Image style={[style.image, {top: 100, left: 10}]} source={hot_deals} />
      </View>
      <View style={{marginTop: 16, flex: 3}}>
        <FlatList
          data={dataTour}
          renderItem={({item}) => (
            <View>
              <TourFavorite tour={item} />
            </View>
          )}
          keyExtractor={item => item.tourId}
          contentContainerStyle={{marginHorizontal: 5}}
          ListFooterComponent={renderFooter}
          onEndReached={handleLoadMore}
        />
      </View>

      <Icon
        name="arrow-back-ios"
        size={28}
        color={Colors.white}
        onPress={() => navigation.navigate('HomePage')}
        style={{position: 'absolute', top: 50, left: 20}}
      />
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  header: {
    flex: 1,
    backgroundColor: '#FF4500',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#ffe4b5',
    fontSize: 27,
    textAlign: 'center',
    fontFamily: 'Pacifico-Regular',
  },
  text: {
    color: '#FF4500',
    fontSize: 19,
    textAlign: 'center',
    fontFamily: 'Pacifico-Regular',
    backgroundColor: '#ffe4b5',
    paddingHorizontal: 10,
    borderRadius: 5,
    zIndex: 1,
  },
  image: {
    position: 'absolute',
    width: 64,
    height: 64,
  },
});

export default TourHotPage;
