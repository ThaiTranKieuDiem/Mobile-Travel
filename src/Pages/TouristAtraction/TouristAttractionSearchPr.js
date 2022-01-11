import {unwrapResult} from '@reduxjs/toolkit';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch} from 'react-redux';
import {Cli_GetTourListPagination} from '../../Slice/SliceTour';
import TourFavorite from './../../components/Tour/TourFavorite';
import IconAnt from 'react-native-vector-icons/AntDesign';
import LottieView from 'lottie-react-native';
import notFound from '../../asset/icons/iconViewPage/no.png';

function TouristAttractionSearchPr(props) {
  const {navigation, route} = props;
  //
  //
  const {search} = route.params;
  ///
  ///
  const [isLoading, setIsLoading] = useState(true);
  const [loadingPage, setLoadingPage] = useState(true);
  ///
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState({
    DeparturePlaceFromName: search.params.DeparturePlaceFromName,
    DeparturePlaceToName: search.params.departurePlaceToName,
    DateStart: search.params.DateStart,
    limit: 10,
    page: 1,
  });

  const [pagination, setPagination] = useState({
    currentPage: 1,
    count: 0,
    totalPage: 1,
  });
  ////
  const dispatch = useDispatch();
  //

  useEffect(() => {
    const fetchApi = () => {
      const stateOld=filter;

      dispatch(Cli_GetTourListPagination(filter))
        .then(unwrapResult)
        .then(payload => {
          const dataOld = data;
          setData(dataOld.concat(payload?.data));
          setPagination(payload?.pagination);
          setLoadingPage(false);
          setIsLoading(false);
        })
        .catch(err => {
          console.log(err);
          setIsLoading(false);
          setLoadingPage(false);
        });
    };
    fetchApi();
  }, [filter]);

  if (loadingPage) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
        }}>
        <LottieView
          source={require('../../asset/animation/84272-loading-colour.json')}
          autoPlay
          loop
        />
      </View>
    );
  }

  const renderFooter = () => {
    return isLoading && pagination.count > 2 ? (
      <View>
        <ActivityIndicator />
      </View>
    ) : null;
  };

  const handleLoadMore = () => {
    setFilter({
      ...filter,
      page: filter.page + 1,
    });
    setIsLoading(true);
  };

  const renderText = () => {
    let text = '';
    if (
      filter.DeparturePlaceFromName !== '' &&
      filter.DeparturePlaceToName != ''
    ) {
      return (text = `Danh sách tour khởi hành từ ${filter.DeparturePlaceFromName} đến ${filter.DeparturePlaceToName}`);
    }
    if (filter.DeparturePlaceFromName !== '') {
      return (text = `Danh sách tour khởi hành từ ${filter.DeparturePlaceFromName}`);
    }
    if (filter.DeparturePlaceToName !== '') {
      return (text = `Danh sách tour khởi hành đến ${filter.DeparturePlaceToName}`);
    }
    if (filter.DateStart !== '') {
      return (text = `Danh sách tour khởi hành ngày ${filter.DateStart}`);
    } else {
      return (text = `Danh sách tour khởi hành từ ${filter.DeparturePlaceFromName} đến ${filter.DeparturePlaceToName} vào ngày  ${filter.DateStart}`);
    }
  };

  const renderHeader = () => {
    return (
      <View style={{paddingHorizontal: 15}}>
        <View style={style.location}>
          <View style={style.flex}>
            <Text
              style={{
                color: '#191970',
                fontFamily: 'Poppins-Medium',
                fontSize: 18,
              }}>
              {renderText()}
            </Text>
          </View>
        </View>
        <Text style={[style.text, {marginVertical: 10}]}>
          View {pagination.count} Result
        </Text>
      </View>
    );
  };

  const emptyComponent = ({item}) => {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 15,
        }}>
        <Image source={notFound} style={{width: 150, height: 150}} />
        <Text
          style={{
            color: '#191970',
            fontFamily: 'Poppins-Medium',
            fontSize: 18,
          }}>
          Chúng tôi hiện tại chưa có chuyến tour nào cho hành trình này!
        </Text>
      </View>
    );
  };

  return (
    <View style={{backgroundColor: '#fff', paddingHorizontal: 10, flex: 1}}>
      <StatusBar
        translucent
        barStyle="dark-content"
        backgroundColor="rgba(0,0,0,0)"
      />
      <View style={style.header}>
        <Icon
          name="arrow-back-ios"
          size={28}
          color="#000"
          onPress={() => navigation.navigate('HomePage')}
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
      <View style={{flex: 1}}>
        {renderHeader()}
        <FlatList
          data={data}
          renderItem={({item, index}) => (
            <View key={index}>
              <TourFavorite tour={item} />
            </View>
          )}
          keyExtractor={item => `${item.tourId}`}
          contentContainerStyle={{marginHorizontal: 5}}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={emptyComponent}
          onEndReached={handleLoadMore}
        />
      </View>
    </View>
  );
}
const style = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 100,
    marginTop: 10,
  },
  search: {
    flexDirection: 'row',
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    alignItems: 'center',
    width: 320,
    paddingHorizontal: 10,
    height: 50,
  },
  title: {
    color: '#000',
    fontSize: 24,
    fontFamily: 'Montserrat-Medium',
    width: '85%',
    textAlign: 'center',
  },
  location: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#f0f0f0',
    borderBottomWidth: 1,
    justifyContent: 'space-between',
  },
  flex: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontFamily: 'Poppins-Light',
    color: '#000',
  },
});
export default TouristAttractionSearchPr;
