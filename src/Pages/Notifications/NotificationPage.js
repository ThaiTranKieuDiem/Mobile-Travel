import React, {useEffect, useState} from 'react';
import {Text, View, StatusBar, FlatList} from 'react-native';
import Notification from '../../components/Notification/Notification';
import {useDispatch, useSelector} from 'react-redux';
import {Cli_GetDataPromotion} from '../../Slice/SlicePromotion';
import {unwrapResult} from '@reduxjs/toolkit';
import LottieView from 'lottie-react-native';

function NotificationPage() {
  const dispatch = useDispatch();
  const state = useSelector(state => state?.promotion);
  const [data, setData] = useState([]);
  const [loadingPage, setLoadingPage] = useState(false);


  ///
  useEffect(() => {
    setLoadingPage(false);
    const fetchApi = () => {
      const params = {
        PromotionName: '',
        IsApplyAll: '',
      };
      dispatch(Cli_GetDataPromotion(params))
        .then(unwrapResult)
        .then(payload => {
          setLoadingPage(true);
          setData(payload);
        })
        .catch(err => {
          setLoadingPage(true);
        });
    };
    fetchApi();
  }, []);
  ///

  if (loadingPage === false) {
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
  ///
  return (
    <View style={{flex: 1, backgroundColor: '#fff', paddingVertical: 10}}>
      <StatusBar
        translucent
        barStyle="dark-content"
        backgroundColor="rgba(0,0,0,0)"
      />
      <FlatList
        data={data}
        renderItem={({item}) => (
          <View>
            <Notification promotion={item} />
          </View>
        )}
        keyExtractor={item => item.promotionId}
      />
    </View>
  );
}

export default NotificationPage;
