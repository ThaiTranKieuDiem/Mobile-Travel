import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  Text,
  StatusBar,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Cli_GetDataNews} from './../../Slice/SliceNews';
import {unwrapResult} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';

function NewsByKindPage(props) {
  const {navigation, route} = props;
  const {params} = route.params;
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [param, setParam] = useState({
    Page: 1,
    Limit: 10,
    MainPage: false,
    KindOfNewsID: params.KindOfNewsID,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchApi = () => {
      dispatch(Cli_GetDataNews(param))
        .then(unwrapResult)
        .then(payload => {
          setNews(payload);
          console.log(payload);
          setLoading(false);
        })
        .catch(err => {
          setLoading(false);
          console.log(err);
        });
    };
    fetchApi();
  }, []);

  const handleClickNews = id => {
    navigation.navigate('NewsDetails', {params: id});
  };

  const itemView = ({item}) => {
    return (
      <View style={style.container}>
        <TouchableWithoutFeedback
          onPress={id => {
            handleClickNews(item.newsId);
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
              height: 240,
            }}>
            <Image source={{uri: item.newsImg}} style={style.img} />
            <View style={{width: '50%', marginLeft: 5}}>
              <Text style={style.name} numberOfLines={2}>
                {item.newsName.trim()}
              </Text>
              <View
                style={{
                  alignItems: 'flex-start',
                  flexDirection: 'row',
                }}>
                <Text style={style.kindOfNews}>{item.kindOfNew} - </Text>
                <Text style={style.date}>{item.dateUpdate}</Text>
              </View>
              <Text
                style={{
                  fontSize: 17,
                  color: '#000',
                  fontFamily: 'Poppins-Light',
                  marginTop: 10,
                  lineHeight: 26,
                }}
                numberOfLines={6}>
                {item.content}
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  };
  const ItemSeparatorView = () => {
    return <View style={style.separator}></View>;
  };

  const handleLoadMore = () => {
    setParam({
      ...param,
      page: param.page + 1,
    });
    setLoading(true);
  };

  const renderFooter = () => {
    return loading ? (
      <View>
        <ActivityIndicator />
      </View>
    ) : null;
  };

  return (
    <View style={{flex: 1}}>
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
            flexDirection: 'row',
          }}>
          <Icon
            name="arrow-back-ios"
            size={28}
            color="#fff"
            onPress={navigation.goBack}
          />
          <Text
            style={{
              color: '#fff',
              fontSize: 23,
              fontFamily: 'Montserrat-Medium',
              width: '80%',
              textAlign: 'center',
            }}>
            {params.KindOfNewsName}
          </Text>
        </View>
      </View>
      <FlatList
        data={news?.data}
        renderItem={itemView}
        keyExtractor={item => item.newsId}
        ItemSeparatorComponent={ItemSeparatorView}
        onEndReached={handleLoadMore}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
}

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
  img: {
    height: 240,
    width: '40%',
    borderRadius: 10,
  },
  kindOfNews: {
    fontSize: 13,
    color: '#FD5056',
    fontFamily: 'Poppins-Medium',
  },
  name: {
    fontSize: 20,
    color: '#2d4271',
    fontFamily: 'Poppins-Medium',
  },
  date: {
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
  },
  container: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    height: 270,
    paddingHorizontal: 10,
  },
  separator: {
    flex: 1,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
});

export default NewsByKindPage;
