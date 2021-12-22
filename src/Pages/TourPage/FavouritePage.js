import React from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import dataTour from '../../consts/places';
import TourFavorite from '../../components/Tour/TourFavorite';

function favorite(props) {
  const {navigation} = props;
  return (
    <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
      <StatusBar
        translucent
        barStyle="dark-content"
        backgroundColor="rgba(0,0,0,0)"
      />
      <View style={style.header}>
        <Icon
          name="arrow-back-ios"
          size={28}
          color="#fff"
          onPress={navigation.goBack}
        />
        <View
          style={{
            alignItems: 'center',
            width: '85%',
          }}>
          <Text
            style={{
              color: '#fff',
              fontSize: 23,
              fontFamily: 'Montserrat-Medium',
            }}>
            Tour yêu thích
          </Text>
        </View>
      </View>
      <FlatList
        data={dataTour}
        renderItem={({item}) => (
          <View>
            <TourFavorite
              tour={item}
              onClickBox={() => navigation.navigate('TourDetails')}
            />
          </View>
        )}
        keyExtractor={item => item.tourId}
        contentContainerStyle={{marginHorizontal: 5}}
      />
    </SafeAreaView>
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
    borderBottomWidth: 2,
    borderBottomColor: '#f8f8f8',
  },
});

export default favorite;
