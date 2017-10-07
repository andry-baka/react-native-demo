import React, { Component } from 'react';
import {
  View, Text, Button, Dimensions, TouchableOpacity, Image
} from 'react-native';
import Routes from './../config/Routes';
import Images from './../assets/Images';
import NotificationList from '../components/NotificationList';


const { width, height } = Dimensions.get('window');

class NotificationPage extends Component {
  constructor(props) {
    super(props);
  }

  _renderHeaderHeader = () => {
    return (
      <View style={{
        flexDirection: 'row',
        marginTop: 40,
        justifyContent: 'space-between',
        width: width - 50,
      }}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.goBack();
          }}
        >
          <Image
            source={Images.back}
            style={{
              width: 20,
              height: 20
            }}
          />
        </TouchableOpacity>
        <Text
          style={{
            color: '#fff',
            fontSize: 20,
            fontWeight: '700'
          }}
        >
          Notifications
        </Text>
        <View
          style={{
            width: 20,
            height: 20
          }}
        />
      </View>
      )
  } 

  render() {
    return (
      <View style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#8e816c'
      }}>
        {this._renderHeaderHeader()}
        <NotificationList />
      </View>
    );
  }
}

export default NotificationPage;

