import React, { Component } from 'react';
import {
  View, Text, Button, Dimensions, TouchableOpacity, Image
} from 'react-native';
import Routes from './../config/Routes';
import Images from './../assets/Images';
import NotificationDetailComponent from '../components/NotificationDetail';


const { width, height } = Dimensions.get('window');

class NotificationDetailPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{
        flex: 1,
        backgroundColor: '#8e816c'
      }}>
        <View style={{
          alignItems: 'center'
        }}>
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
              Notification
            </Text>
            <View
              style={{
                width: 20,
                height: 20
              }}
            />
          </View>
        </View>
        <NotificationDetailComponent />
      </View>
    );
  }
}

export default NotificationDetailPage;

