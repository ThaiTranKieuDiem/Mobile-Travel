import {unwrapResult} from '@reduxjs/toolkit';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch} from 'react-redux';
import {Cli_GetTourAttractByProvinceName} from '../../Slice/SliceTouristAttrac';
import TouristAttractionItem from './../../components/TouristAttraction/TouristAttractionItem';

function TouristAttractionSearchPr(props) {
  const {navigation, route} = props;
  //
  const {params} = route.params;
  ///
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(params);
  ////
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(async () => {
      dispatch(Cli_GetTourAttractByProvinceName(filter))
        .then(unwrapResult)
        .then(payload => {
          setIsLoading(false);
          setData(prev => prev.concat(payload?.data));
        })
        .catch(err => {
          console.log(err);
        }, 5000);
    });
  }, [filter]);

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
  return (
    <View style={{backgroundColor: '#fff', paddingHorizontal: 10, flex: 1}}>
      <View style={style.header}>
        <Icon
          name="arrow-back-ios"
          size={28}
          color="#000"
          onPress={() => navigation.navigate('HomePage')}
        />
        <Text style={style.text}>{filter.provinceName}</Text>
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
        onEndReached={handleLoadMore}
      />
    </View>
  );
}
const style = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 100,
    marginTop: 10,
  },
  text: {
    color: '#000',
    fontSize: 24,
    fontFamily: 'Montserrat-Medium',
    width: '85%',
    textAlign: 'center',
  },
});
export default TouristAttractionSearchPr;
