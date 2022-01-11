import React from 'react';
import {View, Image, TouchableOpacity, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

function DestinationItem(props) {
  const {style, source, place, styleImage, province} = props;
  const navigation = useNavigation();
  const handleClickProvince = name => {
    const params = {
      DeparturePlaceFromName: '',
      departurePlaceToName: name,
      DateStart: '',
      limit: 10,
      page: 1,
    };
    navigation.navigate('TouristAttractionSearchPr', {
      search: {params},
    });
  };
  return (
    <View style={style}>
      <TouchableOpacity
        onPress={() => {
          handleClickProvince(province);
        }}>
        <Image style={styleImage} source={source} alt={place} name={province} />
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
      </TouchableOpacity>
    </View>
  );
}

export default DestinationItem;
