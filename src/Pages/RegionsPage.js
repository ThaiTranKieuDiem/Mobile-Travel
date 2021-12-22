import React from 'react';
import {
  View,
  Text,
  Button,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import homeImage from '../asset/backgound/screen-6.jpg';
import plane from '../asset/icons/iconTravelItem/airplane.png';

const regions = [
  {value: 1, label: 'miền Bắc'},
  {value: 2, label: 'miền trung'},
  {value: 3, label: 'miền nam'},
];

function RegionsPage(props) {
  const {navigation} = props;
  return (
    <View style={style.container}>
      <Image source={homeImage} style={style.image} />
      <View style={style.listText}>
        {regions.map(item => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('HomePage')}
              key={item.value}>
              <View style={style.item}>
                <Text style={style.text}>{item.label}</Text>
                <Image source={plane} />
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
const style = StyleSheet.create({
  container: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  listText: {
    position: 'absolute',
    top: 230,
    left: 80,
  },
  item: {
    borderRadius: 10,
    marginBottom: 25,
    backgroundColor: '#fff',
    backgroundColor: 'rgba(255,255,255, 0.6)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    paddingRight: 30,
    paddingLeft: 30,
  },
  text: {
    color: 'black',
    textTransform: 'uppercase',
    fontSize: 24,
    fontWeight: '500',
    marginRight: 15,
  },
});

export default RegionsPage;
