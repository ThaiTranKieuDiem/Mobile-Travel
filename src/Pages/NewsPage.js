import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  FlatList,
} from 'react-native';
import NewItem from '../components/News/NewItem';
import {useDispatch} from 'react-redux';
import {Cli_GetDataNews} from './../Slice/SliceNews';
import {unwrapResult} from '@reduxjs/toolkit';
import {useIsFocused} from '@react-navigation/native';
import {ScrollView} from 'react-native';
import LottieView from 'lottie-react-native';

function NewsPage(props) {
  const {navigation} = props;
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  ///

  ///

  useEffect(() => {
    const fetchApi = () => {
      const params = {
        Page: 1,
        Limit: 3,
        MainPage: true,
      };
      dispatch(Cli_GetDataNews(params))
        .then(unwrapResult)
        .then(payload => {
          setLoading(false);
          setNews(payload);
        })
        .catch(err => {
          setLoading(false);
          console.log(err);
        });
    };
    fetchApi();
  }, [isFocused]);

  const handleClickNews = id => {
    console.log(id);
    navigation.navigate('NewsDetails', {params: id});
  };

  const handleClickSeeAll = (id, values) => {
    const params = {
      KindOfNewsID: id,
      KindOfNewsName: values,
    };
    navigation.navigate('NewsByKindPage', {params: params});
  };

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
        }}>
        <LottieView
          source={require('../asset/animation/84272-loading-colour.json')}
          autoPlay
          loop
        />
      </View>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={style.header}>
        <StatusBar
          translucent
          barStyle="light-content"
          backgroundColor="rgba(0,0,0,0)"
        />
        <View
          style={{
            alignItems: 'center',
            width: '100%',
          }}>
          <Text
            style={{
              color: '#fff',
              fontSize: 23,
              fontFamily: 'Montserrat-Medium',
            }}>
            Tin tức
          </Text>
        </View>
      </View>
      <ScrollView>
        {news.map((item, key) => (
          <View
            key={key}
            style={{
              paddingHorizontal: 10,
              marginTop: 10,
              position: 'relative',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={style.text}>{`${item?.kindOfNew}`}</Text>
              <Text
                style={[
                  style.text,
                ]}
                onPress={id => {
                  handleClickSeeAll(
                    `${item?.enumerationId}`,
                    `${item?.kindOfNew}`,
                  );
                }}>
                Xem tất cả
              </Text>
            </View>
            <FlatList
              data={item?.data}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => (
                <View>
                  <NewItem
                    news={item}
                    onClick={handleClickNews}
                    style={styles}
                  />
                </View>
              )}
              keyExtractor={item => item.newsId}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  img: {
    height: 200,
    width: 280,
    borderRadius: 10,
  },
  kindOfNews: {
    fontSize: 16,
    color: '#FD5056',
    padding: 2,
    backgroundColor: 'rgba(255, 255, 255,0.7)',
    width: 180,
    borderRadius: 15,
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
  },
  name: {
    fontSize: 20,
    color: '#FFFFFF',
    fontFamily: 'Poppins-Medium',
  },
  date: {
    fontSize: 14,
    color: '#FFFFFF',
    fontFamily: 'Poppins-Medium',
    marginTop: 15,
  },
  container: {
    paddingHorizontal: 5,
    backgroundColor: '#fff',
  },
});

const style = StyleSheet.create({
  header: {
    backgroundColor: '#87CEFA',
    padding: 20,
    justifyContent: 'flex-start',
    width: '100%',
    alignItems: 'flex-end',
    height: 100,
    flexDirection: 'row',
  },
  text: {
    color: '#2d4271',
    fontSize: 20,
    fontFamily: 'Popping-Medium',
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default NewsPage;
