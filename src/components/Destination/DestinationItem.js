import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

function DestinationItem(props) {
  const {style, source, place, styleImage, height} = props;
  const navigation = useNavigation();
  return (
    <View style={style}>
      <Image style={styleImage} source={source} alt={place} />
      <View style={{top: -65, marginLeft: 10}}>
        <Text
          style={{
            color: '#fff',
            fontFamily: 'Poppins-Medium',
            fontSize: 16,
          }}>
          {place}
        </Text>
        <Text
          style={{
            color: '#fff',
            fontFamily: 'Poppins-SemiBold',
            fontSize: 16,
          }}>
          {place}
        </Text>
      </View>
    </View>
  );
}

export default DestinationItem;
