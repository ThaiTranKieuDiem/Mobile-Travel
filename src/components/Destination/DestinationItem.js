import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  TouchableHighlight,
  NativeModules,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

function DestinationItem(props) {
  const {style, source, place, styleImage, onClick} = props;
  const navigation = useNavigation();
  return (
    <View style={style}>
      <Image style={styleImage} source={source} alt={place} />
      <View style={{top: -45, marginLeft: 10}}>
        <Text
          style={{
            color: '#fff',
            fontFamily: 'Poppins-Medium',
            fontSize: 16,
          }}>
          {place}
        </Text>
      </View>
    </View>
  );
}

export default DestinationItem;
