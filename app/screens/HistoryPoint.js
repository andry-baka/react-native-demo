import React, { Component } from 'react';
import {
  View, Text, Button
} from 'react-native';
import Routes from './../config/Routes';

class HistoryPoint extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Text>HistoryPoint</Text>
        <Button
          title={'Go to Profile'}
          onPress={() => {
            this.props.navigation.goBack();
          }}
        />
      </View>
    );
  }
}

export default HistoryPoint

