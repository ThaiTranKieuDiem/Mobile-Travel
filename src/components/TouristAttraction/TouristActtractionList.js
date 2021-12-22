import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import TouristAttractionItem from './TouristAttractionItem';
import {Cli_GetTourAttractByProAndId} from './../../Slice/SliceTouristAttrac';
import {unwrapResult} from '@reduxjs/toolkit';
import SearchHome from '../../Pages/Search/SearchHome';

function TouristAttractionList() {
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const state = useSelector(state => state?.touristAttraction);
  const dispatch = useDispatch();

  /* useEffect(() => {
    dispatch(Cli_GetTourAttractByProAndId(initialValues, params))
      .then(unwrapResult)
      .then(payload => {
        setData(prev => prev.concat(payload?.data));
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, [params]); */
  const handleClickSearch = values => {
    dispatch(Cli_GetTourAttractByProAndId(values, params))
      .then(unwrapResult)
      .then(payload => {
        console.log(payload);
        setData(payload?.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

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
    setIsLoading(true);
  };

  return (
    <View>
      <SearchHome />
      <FlatList
        data={data}
        renderItem={({item}) => (
          <View>
            <TouristAttractionItem data={item} />
          </View>
        )}
        keyExtractor={item => `${item.touristAttrId}`}
        contentContainerStyle={{marginHorizontal: 5}}
        ListFooterComponent={renderFooter}
        onEndReached={handleLoadMore}
      />
    </View>
  );
}

export default TouristAttractionList;
