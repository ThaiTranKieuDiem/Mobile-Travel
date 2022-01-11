import React, {useEffect} from 'react';
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
} from 'react-native';
import TourCart from './../../components/Tour/TourCart';
import cart from '../../asset/icons/iconTravelItem/shopping-cart.png';

function CartLogin(props) {
  const {onClick, data, user, loadMore, isLoading} = props;

  const handleClick = id => {
    if (onClick) {
      onClick(id);
    }
  };

  const emptyComponent = () => {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          color: '#fff',
          paddingHorizontal: 15,
          height: 630,
          width: '100%',
        }}>
        <Image source={cart} style={{width: 250, height: 250}} />
        <Text style={style.text}>{user} ơi! Bạn vẫn chưa có tour nào!</Text>
        <Text style={style.text}>
          Hãy nhanh tay đặt ngay để trải nghiệm những dịch vụ của Mytour nhé{' '}
        </Text>
      </View>
    );
  };

  const handleLoadMore = () => {
    if (loadMore) {
      loadMore();
    }
  };

  const renderFooter = () => {
    return isLoading && data.length > 2 ? (
      <View>
        <ActivityIndicator />
      </View>
    ) : null;
  };

  return (
    <View style={{backgroundColor: '#f8f8f8', flex: 1}}>
      <StatusBar translucent barStyle="dark-content" backgroundColor="#fff" />
      <FlatList
        data={data}
        renderItem={({item}) => (
          <View>
            <TourCart
              booked={item}
              onClick={id => {
                handleClick(item.bookingTourId);
              }}
            />
          </View>
        )}
        keyExtractor={item => item.bookingTourId}
        ListEmptyComponent={emptyComponent}
        ListFooterComponent={renderFooter}
        onEndReached={handleLoadMore}
      />
    </View>
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
  },
  content: {
    flex: 1,
  },
  text: {
    fontFamily: 'Poppins-Light',
    fontSize: 16,
    textAlign: 'center',
    color: '#000',
  },
});

export default CartLogin;
