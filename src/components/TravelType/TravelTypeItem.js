import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function TravelTypeItem(props) {
  const {typeItem} = props;
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Icon size={24} name={typeItem.icon} color={typeItem.color} />
        <Text style={styles.text} numberOfLines={3}>
          {typeItem.name}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  box: {
    padding: 10,
    width: 150,
    height: 130,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
  },
  text: {
    fontSize: 16,
    fontFamily: 'Poppins-Light',
    color: '#000',
    marginTop: 10,
  },
});

export default TravelTypeItem;
