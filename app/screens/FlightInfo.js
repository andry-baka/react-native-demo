import React, { Component } from 'react';
import {
  View, Text, Button
} from 'react-native';
import Routes from './../config/Routes';

export default class Profile extends Component {
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
        <Text>FlightInfo</Text>
        <Button
          title={'Go to Profile'}
          onPress={() => {
            this.props.navigation.goBack();
          }}
        />
        <Button
          title={'Go to Flight Booking'}
          onPress={() => {
            this.props.navigation.navigate(Routes.FlightBooking);
          }}
        />
      </View>
    );
  }
}


