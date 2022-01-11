import React from 'react';
import {View, FlatList} from 'react-native';
import TravelTypeItem from './TravelTypeItem';

const dataTravelType = [
  {
    id: 1,
    name: 'Đặt ngay hôm nay',
    icon: 'clock-o',
    color: '#C0C0C0',
  },
  {
    id: 2,
    name: 'Xác nhận tức thời',
    icon: 'flash',
    color: '#FF4500',
  },
  {
    id: 3,
    name: 'Miễn phí hoàn hủy trước khi sử dụng dịch vụ',
    icon: 'dollar',
    color: '#C0C0C0',
  },
  {
    id: 4,
    name: 'Vé theo ngày cố định',
    icon: 'calendar-check-o',
    color: '#C0C0C0',
  },
  {
    id: 5,
    name: 'Xuất trình vé điện tử hoặc in voucher',
    icon: 'print',
    color: '#C0C0C0',
  },
  {
    id: 6,
    name: 'Đón tại điểm hẹn',
    icon: 'car',
    color: '#C0C0C0',
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
