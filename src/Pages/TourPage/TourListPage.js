import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  View,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Animated,
  TouchableOpacity,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import circle_red from '../../asset/icons/iconBanner/circle-red.png';
import circle from '../../asset/icons/iconBanner/circle.png';
import hot_deals from '../../asset/icons/iconBanner/hot-deal.png';
import {useDispatch} from 'react-redux';
import {Cli_GetTourListPagination} from '../../Slice/SliceTour';
import {unwrapResult} from '@reduxjs/toolkit';
import TourFavorite from './../../components/Tour/TourFavorite';

function TourListPage(props) {
  const {navigation} = props;
  ///
  const [isLoading, setLoading] = useState(true);
  const [dataTour, setDataTour] = useState([]);
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
  });

  const scrolling = useRef(new Animated.Value(0)).current;
  const translation = scrolling.interpolate({
    inputRange: [0, 130],
    outputRange: [-100, 0],
    extrapolate: 'clamp',
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchApi = () => {
      dispatch(Cli_GetTourListPagination(params))
        .then(unwrapResult)
        .then(payload => {
          setDataTour(prev => prev.concat(payload?.data));
          setLoading(false);
          console.log(params);
        })
        .catch(err => {
          console.log(err);
          setLoading(false);
        });
    };
    fetchApi();
  }, [params]);

  const handleLoadMore = () => {
    setParams({
      ...params,
      page: params.page + 1,
    });
    setLoading(true);
  };

  const renderFooter = () => {
    return isLoading ? (
      <View>
        <ActivityIndicator />
      </View>
    ) : null;
  };

  const renderHeader = () => {
    return (
      <View style={style.header}>
        <Icon
          name="arrow-back-ios"
          size={28}
          color={Colors.white}
          onPress={() => navigation.navigate('HomePage')}
          style={{position: 'absolute', top: 50, left: 20, zIndex: 3}}
        />
        <Text style={style.title}>Tin nổi không?</Text>
        <Text style={style.text}>Tour giá sốc chỉ có trên Mytour</Text>
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
    );
  };

  return (
    <SafeAreaView
      style={{flex: 1, position: 'relative', backgroundColor: '#f8f8f8'}}>
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor="rgba(0,0,0,0)"
      />

      <Animated.FlatList
        data={dataTour}
        renderItem={({item}) => (
          <View>
            <TourFavorite tour={item} />
          </View>
        )}
        keyExtractor={item => item.tourId}
        ListFooterComponent={renderFooter}
        onEndReached={handleLoadMore}
        ListHeaderComponent={renderHeader}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: scrolling,
                  //y: iconArrowUp,
                },
              },
            },
          ],
          {useNativeDriver: true},
        )}
      />

      <Animated.View
        style={{
          transform: [{translateY: translation}],
          position: 'absolute',
          backgroundColor: '#fff',
          height: 100,
          top: 0,
          borderBottomColor: '#f8f8f8',
          borderBottomWidth: 2,
          width: '100%',
          padding: 20,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 5,
        }}>
        <StatusBar
          translucent
          barStyle="dark-content"
          backgroundColor="rgba(0,0,0,0)"
        />
        <View style={{flexDirection: 'row', marginTop: 30}}>
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
            Tin nổi không?
          </Text>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  header: {
    backgroundColor: '#FF4500',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 180,
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

export default TourListPage;
