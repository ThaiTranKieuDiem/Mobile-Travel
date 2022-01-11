import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, TextInput, StyleSheet} from 'react-native';
import IconAnt from 'react-native-vector-icons/AntDesign';
import {Formik} from 'formik';
import FilterPage from './FilterPage';
import {showMessage, hideMessage} from 'react-native-flash-message';

function SearchHome(props) {
  const {navigation} = props;

  const initialValues = {
    page: 1,
    limit: 10,
    touristAttrName: '',
  };
  const handleSearch = values => {
    if (values.touristAttrName === '') {
      showMessage({
        message: 'Chưa nhập từ khóa',
        type: 'warning',
      });
    } else {
      navigation.navigate('TouristAttractionPage', {
        params: values,
        name: values.touristAttrName,
      });
    }
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
        <FilterPage />
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 80,
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
