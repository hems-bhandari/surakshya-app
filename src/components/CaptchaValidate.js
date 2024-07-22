import * as React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import ConfirmHcaptcha from '@hcaptcha/react-native-hcaptcha';

const siteKey = '5afb77b7-d291-4106-b7ba-0b2273bcd8a7';
const baseUrl = 'https://hcaptcha.com';

export default class CaptchaValidate {
  onMessage = event => {
    if (event && event.nativeEvent.data) {
      if (['cancel'].includes(event.nativeEvent.data)) {
        this.captchaForm.hide();
      } else if (['error', 'expired'].includes(event.nativeEvent.data)) {
        this.captchaForm.hide();
      } else {
        console.log('Verified code from hCaptcha', event.nativeEvent.data);
        this.captchaForm.hide();
      }
    }
  };

  render() {
    return (
      <View>
        <ConfirmHcaptcha
          ref={_ref => (this.captchaForm = _ref)}
          siteKey={siteKey}
          baseUrl={baseUrl}
          languageCode="en"
          onMessage={this.onMessage}
        />
        <TouchableOpacity
          onPress={() => {
            this.captchaForm.show();
          }}>
          <Text>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

