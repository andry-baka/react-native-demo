import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View, StyleSheet, Dimensions, Text, TouchableOpacity, Animated
} from 'react-native';
const { width } = Dimensions.get('window');
const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);
class Notification extends Component {
  constructor(props) {
    super(props);

    this.state = {
      top: new Animated.Value(-100),
      message: ''
    }
  }

  componentWillReceiveProps(newProps) {
    const { notificationObject } = newProps;
    this._show(notificationObject);
    this.timeOutId = setTimeout(this._hide, 5000);
  }

  _show = (notificationObject) => {
    const { message } = notificationObject;
    this.setState({
      message
    });
    Animated.timing(
      this.state.top,
      {
        toValue: 30,
      }
    ).start();
  };

  _hide = () => {
    Animated.timing(
      this.state.top,
      {
        toValue: -100,
      }
    ).start();
  };

  _onPress = () => {
    clearTimeout(this.timeOutId);
    this._hide();
  };

  render() {
    const { message, top } = this.state;
    return (
      <View
        style={[
          StyleSheet.absoluteFillObject
        ]}
        pointerEvents={'box-none'}
      >
        <AnimatedTouchableOpacity
          activeOpacity={0.6}
          onPress={this._onPress}
          style={{
            width: width - 40,
            top,
            left: 20,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            borderRadius: 8
          }}
        >
          <Text
            style={{
              color: '#fff',
              padding: 12,
              backgroundColor: 'transparent'
            }}
          >
            { message }
          </Text>
        </AnimatedTouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  notificationObject: state.notificationReducer.notificationObject
});
export default connect(mapStateToProps)(Notification);

