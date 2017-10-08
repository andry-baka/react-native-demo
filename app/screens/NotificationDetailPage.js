import React, { Component } from 'react';
import {
  View, Text, Button, Dimensions, TouchableOpacity, Image
} from 'react-native';
import Routes from './../config/Routes';
import Images from './../assets/Images';
import NotificationDetailComponent from '../components/NotificationDetail';
import Confetti from 'react-native-confetti';

const { width, height } = Dimensions.get('window');

class NotificationDetailPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this._confettiView) {
      this._confettiView.startConfetti();
    }
  }

  componentWillUnmount ()
  {
    if (this._confettiView) {
      this._confettiView.stopConfetti();
    }
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
        <Confetti
          ref={(node) => this._confettiView = node}
          confettiCount={300}
        />
      </View>
    );
  }
}

export default NotificationDetailPage;

