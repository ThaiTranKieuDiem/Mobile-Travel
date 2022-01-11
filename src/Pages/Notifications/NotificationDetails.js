import React, {useState} from 'react';
import {View, Text, StyleSheet, Modal, Image} from 'react-native';
import IconAnt from 'react-native-vector-icons/AntDesign';
import announcement from '../../asset/icons/iconViewPage/announcement.png';

function NotificationDetails(props) {
  const {promotionDetails, onClickClose, modalVisible} = props;

  const handleClickClose = () => {
    if (onClickClose) {
      onClickClose();
    }
  };
  var dateStart =
    promotionDetails.dateStart === undefined
      ? 0
      : promotionDetails.dateStart.substring(0, 10);
  var dateEnd =
    promotionDetails.dateEnd === undefined
      ? 0
      : promotionDetails.dateEnd.substring(0, 10);
  return (
    <View>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={style.modalView}>
          <View style={{flexDirection: 'row'}}>
            <IconAnt name="close" size={24} onPress={handleClickClose} color="#003d71" />
          </View>
          <Text
            style={[
              style.text,
              {fontSize: 20, textAlign: 'center', fontFamily: 'Poppins-Medium'},
            ]}>
            {promotionDetails.promotionName}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={style.text}>Ngày bắt đầu: </Text>
            <Text style={[style.text, {fontFamily: 'Poppins-Medium'}]}>
              {dateStart}
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={style.text}>Ngày kết thúc: </Text>
            <Text style={[style.text, {fontFamily: 'Poppins-Medium'}]}>
              {dateEnd}
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={style.text}>Giảm giá: </Text>
            <Text
              style={[
                style.text,
                {fontFamily: 'Poppins-Medium', color: 'rgb(254,46,100)'},
              ]}>
              {promotionDetails.discount}%
            </Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <Image source={announcement} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const style = StyleSheet.create({
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#003d71',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 200,
    marginHorizontal: 20,
  },
  text: {
    color: '#003d71',
    fontSize: 17,
    fontFamily: 'Poppins-Light',
  },
});

export default NotificationDetails;
