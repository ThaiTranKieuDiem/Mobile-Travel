import {unwrapResult} from '@reduxjs/toolkit';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Text,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Cli_GetTourAttractByProAndId} from '../../Slice/SliceTouristAttrac';
import TouristAttractionItem from './../../components/TouristAttraction/TouristAttractionItem';
import IconAnt from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LottieView from 'lottie-react-native';

function TouristAttractionPage(props) {
  const {route, navigation} = props;
  ////
  const [isLoading, setIsLoading] = useState(true);
  const [loadingPage, setLoadingPage] = useState(true);
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    count: 0,
    totalPage: 1,
  });
  ////
  const dispatch = useDispatch();
  ////
  const {params} = route.params;
  const {name} = route.params;
  ///
  const [filter, setFilter] = useState(params);

  useEffect(() => {
    setTimeout(async () => {
      dispatch(Cli_GetTourAttractByProAndId(filter))
        .then(unwrapResult)
        .then(payload => {
          setIsLoading(false);
          setData(prev => prev.concat(payload?.data));
          setPagination(payload?.pagination);
          setLoadingPage(false);
        })
        .catch(err => {
          console.log(err);
          setLoadingPage(false);
          setIsLoading(false);
        }, 3000);
    });
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
    return isLoading ? (
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

  const renderHeader = () => {
    return (
      <View>
        <Text
          style={{
            marginVertical: 10,
            fontSize: 18,
            fontFamily: 'Poppins-Light',
            color: '#000',
          }}>
          View {pagination.count} Result
        </Text>
      </View>
    );
  };

  return (
    <View style={{backgroundColor: '#fff', paddingHorizontal: 10, flex: 1}}>
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
            value={name}
          />
          <IconAnt name="search1" size={18} color="#000" />
        </View>
      </View>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <View>
            <TouristAttractionItem data={item} />
          </View>
        )}
        keyExtractor={item => item.touristAttrId}
        contentContainerStyle={{marginHorizontal: 5}}
        ListFooterComponent={renderFooter}
        ListHeaderComponent={renderHeader}
        onEndReached={handleLoadMore}
      />
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
});

export default TouristAttractionPage;
