import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import IconAnt from 'react-native-vector-icons/AntDesign';
import {Formik} from 'formik';
import TagGroup from 'react-native-tag-group';

const tagGroup = [
  'Hồ Chí Minh',
  ' Hà Nội',
  ' Lâm Đồng',
  ' Đà Nẵng',
  ' Kiên Giang',
  'Bà Rịa - Vũng Tàu',
  ' Cần Thơ',
  ' Khánh Hòa',
  ' Bình Định',
  ' Hải Phòng',
  ' Lai Châu',
  'Quảng Nam',
  'Hà Giang',
  'Phú Yên',
  'An Giang',
  'Ninh Bình',
];

function SearchHome(props) {
  const {navigation} = props;
  const [state, setState] = useState('');

  const initialValues = {
    page: 1,
    limit: 10,
    touristAttrName: '',
  };
  const handleSearch = values => {
    navigation.navigate('TouristAttractionPage', {
      params: values,
      name: values.touristAttrName,
    });
  };

  const handleClickProvince = values => {
    const params = {
      page: 1,
      limit: 10,
      provinceName: values.toString(),
    };
    console.log(params);
    navigation.navigate('TouristAttractionSearchPr', {
      params: params,
    });
  };
  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: '#fff', paddingHorizontal: 15}}>
      <View style={style.header}>
        <IconAnt
          name="close"
          size={28}
          color="#000"
          onPress={navigation.goBack}
        />
        <Formik initialValues={initialValues} onSubmit={handleSearch}>
          {({handleChange, handleBlur, handleSubmit, values}) => {
            return (
              <View style={style.search}>
                <TextInput
                  key="textSearch"
                  style={{
                    flex: 1,
                    fontSize: 16,
                    fontFamily: 'Poppins-Light',
                  }}
                  placeholder="Địa điểm du lịch,..."
                  name="touristAttrName"
                  onChangeText={handleChange('touristAttrName')}
                  onBlur={handleBlur('touristAttrName')}
                  value={values.touristAttrName}
                />
                <IconAnt
                  name="search1"
                  size={18}
                  color="grey"
                  onPress={handleSubmit}
                />
              </View>
            );
          }}
        </Formik>
      </View>
      <View style={style.content}>
        <TagGroup
          //ref={ref => (tagGroup = ref)}
          source={tagGroup}
          tagStyle={{
            height: 35,
            borderColor: '#fff',
            backgroundColor: '#f8f8f8',
          }}
          textStyle={{fontSize: 14, fontFamily: 'Poppins-Light'}}
          onSelectedTagChange={handleClickProvince}
        />
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 100,

    marginTop: 10,
  },
  search: {
    flexDirection: 'row',
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    alignItems: 'center',
    width: 320,
    paddingHorizontal: 10,
  },
  content: {
    flex: 2,
  },
});

export default SearchHome;
