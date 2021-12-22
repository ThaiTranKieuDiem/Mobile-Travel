import React from 'react';
import {View, FlatList, Text, StyleSheet, TouchableOpacity} from 'react-native';
import TourItem from './TourItem';

function TourItemList(props) {
  const {horizontal, dataTour, column, onPresBtn, title, description} = props;

  const handleClickBtn = () => {
    if (onPresBtn) {
      onPresBtn();
    }
  };

  return (
    <View>
      <Text style={[style.text, {paddingHorizontal: 15}]}>{title}</Text>
      <Text
        style={{
          paddingHorizontal: 15,
          marginBottom: 10,
          fontFamily: 'Poppins-Light',
        }}>
        {description}
      </Text>
      <FlatList
        horizontal={horizontal}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        windowSize={5}
        showsVerticalScrollIndicator={true}
        showsHorizontalScrollIndicator={false}
        data={dataTour}
        numColumns={column}
        renderItem={({item}) => (
          <View>
            <TourItem tour={item} />
          </View>
        )}
        keyExtractor={item => item.tourId}
        contentContainerStyle={{marginHorizontal: 5}}
      />
      <View style={{alignItems: 'center'}}>
        <Text style={style.button} onPress={handleClickBtn}>
          Xem tất cả
        </Text>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  button: {
    textAlign: 'center',
    fontSize: 18,
    borderColor: 'grey',
    borderWidth: 1,
    width: 200,
    height: 40,
    color: '#000',
    lineHeight: 40,
    borderRadius: 10,
    marginBottom: 20,
    fontFamily: 'Poppins-light',
  },
  text: {
    color: '#000',
    fontSize: 24,
    fontFamily: 'Poppins-Medium',
  },
});

export default TourItemList;
