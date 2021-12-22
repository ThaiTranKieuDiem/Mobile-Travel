import React from 'react';
import {View, FlatList} from 'react-native';
import TravelTypeItem from './TravelTypeItem';

const dataTravelType = [
  {
    id: 1,
    name: 'Khách sạn',
    image: require('../../asset/icons/iconTravelItem/hotel-pink.png'),
  },
  {
    id: 2,
    name: 'Chuyến bay',
    image: require('../../asset/icons/iconTravelItem/airplane.png'),
  },
  {
    id: 3,
    name: 'Nhà hàng',
    image: require('../../asset/icons/iconTravelItem/restaurant.png'),
  },
];
function TravelTypeList() {
  return (
    <View style={{height: 130, alignItems: 'center'}}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={dataTravelType}
        renderItem={({item}) => (
          <View>
            <TravelTypeItem typeItem={item} />
          </View>
        )}
        keyExtractor={item => `${item.id}`}
      />
    </View>
  );
}

export default TravelTypeList;
