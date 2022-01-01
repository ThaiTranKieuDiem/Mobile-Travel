import React from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

function TouristAttractionItem(props) {
  const {data} = props;
  const navigation = useNavigation();
  const BaseUrlServer = 'http://192.168.1.81:8000/ImagesTouristAttractions/';

  const handleClick = values => {
    const params = {
      touristAttrId: values,
    };
    navigation.navigate('TouristAttrDetailPage', {touristAttrId: params});
  };

  return (
    <View>
      <TouchableOpacity
        style={{marginTop: 10, height: 200}}
        onPress={() => {
          handleClick(data.touristAttrId);
        }}>
        <Image
          style={style.image}
          source={{uri: BaseUrlServer + data.imagesList}}
        />
        <View style={{top: -65, marginLeft: 10}}>
          <Text
            numberOfLines={1}
            style={{
              color: '#fff',
              fontFamily: 'Poppins-Medium',
              fontSize: 16,
            }}>
            {data.touristAttrName}
          </Text>
          <Text
            style={{
              color: '#fff',
              fontFamily: 'Poppins-SemiBold',
              fontSize: 16,
            }}>
            {data.provinceName}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
const style = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
});

export default TouristAttractionItem;
