import React, {useEffect, useState} from 'react';
import {
  StatusBar,
  View,
  Text,
  ScrollView,
  Image,
  useWindowDimensions,
  StyleSheet,
  FlatList,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {Cli_GetDataNewsDetails} from '../../Slice/SliceNews';
import {unwrapResult} from '@reduxjs/toolkit';
import RenderHtml from 'react-native-render-html';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LottieView from 'lottie-react-native';
import {Cli_GetDataNews} from './../../Slice/SliceNews';
import NewItem from './../../components/News/NewItem';
import {useIsFocused} from '@react-navigation/native';

function NewsDetails(props) {
  const {route, navigation} = props;
  const {params} = route.params;
  const dispatch = useDispatch();
  const {width} = useWindowDimensions();
  const [dataCliDetails, setDataCliDetails] = useState({});
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [values, setValues] = useState({
    newsID: params,
  });
  const isFocused = useIsFocused();

  useEffect(() => {
    setLoading(true);
    const fetchApiNewDetails = () => {
      dispatch(Cli_GetDataNewsDetails(values))
        .then(unwrapResult)
        .then(payload => {
          setLoading(false);
          setDataCliDetails(payload);
        })
        .catch(err => {
          setLoading(false);
          console.log(err);
        });
    };
    fetchApiNewDetails();
  }, [values]);

  useEffect(() => {
    const fetchApi = () => {
      const params = {
        KindOfNewsID: dataCliDetails?.KindOfNewsID,
        Page: 2,
        Limit: 3,
        MainPage: false,
      };
      dispatch(Cli_GetDataNews(params))
        .then(unwrapResult)
        .then(payload => {
          setNews(payload?.data);
        })
        .catch(err => {
          console.log(err);
        });
    };
    fetchApi();
  }, [values]);

  const handleClickNews = id => {
    console.log(id);
    setValues({
      newsID: id,
    });
  };

  const source = {
    html: `
    <div style="padding: 0px 10px">
      <h1 style="color:#003d71" >${dataCliDetails?.newsName}</h1>
      <div>
        <span style='font-weight: bold'>${
          dataCliDetails?.enumerationTranslate
        }</span>
        <span>&emsp;${dataCliDetails?.dateUpdate}</span> 
        <div style="line-height: 26px; font-size: 18px; font-family: 'Poppins',sans-serif ">
            ${String(dataCliDetails?.content)
              .replace('<ul>', '')
              .replace('</ul>', '')
              .replace('<p style="text-align:start;"></p>', '')}
        </div>
      </div>
    </div>
          
        
    `,
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
          source={require('../../asset/animation/84272-loading-colour.json')}
          autoPlay
          loop
        />
      </View>
    );
  }

  return (
    <View
      style={{
        backgroundColor: '#fff',
        flex: 1,
      }}>
      <StatusBar
        translucent
        barStyle="dark-content"
        backgroundColor="rgba(0,0,0,0)"
      />
      <View style={style.header}>
        <Icon
          name="arrow-back-ios"
          size={28}
          color="#003d71"
          style={{left: 20, marginTop: 50}}
          onPress={navigation.goBack}
        />
        <Text style={style.title}>{dataCliDetails?.enumerationTranslate}</Text>
      </View>
      <ScrollView>
        <RenderHtml
          source={source}
          contentWidth={width}
          style={{fontFamily: 'Poppins-Light'}}
        />
        <Text style={style.text}>Các tin tức liên quan</Text>
        <FlatList
          data={news}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
            <View>
              <NewItem news={item} onClick={handleClickNews} style={styles} />
            </View>
          )}
          keyExtractor={item => item.newsId}
        />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  img: {
    height: 200,
    width: 250,
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
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
});

const style = StyleSheet.create({
  header: {
    width: '100%',
    height: 100,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    flexDirection: 'row',
  },
  title: {
    color: '#003d71',
    fontSize: 27,
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
    marginTop: 45,
    marginLeft: 40,
  },
  text: {
    padding: 10,
    color: '#003d71',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
});

export default NewsDetails;
