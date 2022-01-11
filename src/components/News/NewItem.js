import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import img from '../../asset/backgound/kyco2.jpg';

function NewItem(props) {
  const {news, onClick, style} = props;
  const handleClickNews = id => {
    if (onClick) {
      onClick(id);
    }
  };
  return (
    <View style={style.container}>
      <TouchableWithoutFeedback
        onPress={id => {
          handleClickNews(news.newsId);
        }}>
        <View
          style={{
            position: 'relative',
            marginBottom: 10,
            backgroundImage:
              'linear-gradient(180deg,hsla(0.5%,68.6%,0)0,rgba(48,48,48,.71),rgba(19,19,19,.8))',
          }}>
          <Image source={{uri: news.newsImg}} style={style.img} />
          <View
            style={{position: 'absolute', paddingHorizontal: 15, bottom: 0}}>
            <Text style={style.kindOfNews}>{news.kindOfNew}</Text>
            <Text style={style.name} numberOfLines={2}>
              {news.newsName}
            </Text>
            <Text style={style.date}>{news.dateUpdate}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

export default NewItem;
