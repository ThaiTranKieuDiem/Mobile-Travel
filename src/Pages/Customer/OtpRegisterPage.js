import React from 'react';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {StyleSheet, View} from 'react-native';

function OtpRegisterPage() {
  return (
    <View style={styles.container}>
      <OTPInputView
        pinCount={4}
        style={styles.otpView}
        autoFocusOnLoad={true}
        codeInputFieldStyle={styles.underlineStyleBase}
        onCodeFilled={value => {
          console.log(value);
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpView: {
    width: '80%',
    height: 200,
    color: 'black',
  },
  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
    color: 'black',
    borderBottomColor: '#17BED0',
  },
});

export default OtpRegisterPage;
