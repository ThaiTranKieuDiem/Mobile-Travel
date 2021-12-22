import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

function TravelTypeItem(props) {
  const {typeItem} = props;
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <View style={styles.box}>
          <Image style={styles.image} source={typeItem.image} />
        </View>
        <Text style={styles.text}>{typeItem.name}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    marginHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 80,
    height: 80,
    alignItems: 'center',
    backgroundColor: '#FFE4E1',
    justifyContent: 'center',
    borderRadius: 50,
  },
  image: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
  },
  text: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#000',
  },
});

export default TravelTypeItem;
