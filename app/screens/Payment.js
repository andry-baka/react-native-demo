import React, { Component } from 'react';
import {
  View, Text, Button, TouchableOpacity, Image, Dimensions, ScrollView
} from 'react-native';
import Routes from './../config/Routes';
import Images from './../assets/Images';
import GaugeProgress from './../components/GaugeProgress';
const { width, height } = Dimensions.get('window');

export default class Payment extends Component {
  constructor(props) {
    super(props);
  }
  _renderHeader = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginTop: 40,
          justifyContent: 'space-between',
          width: width - 50,
          shadowColor: '#000', shadowOffset: {width: 0, height: 1}, shadowOpacity: 0.6, shadowRadius: 0.5,
          backgroundColor: 'transparent'
        }}
      >
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
            color: '#f3ebdf',
            fontSize: 20,
            fontWeight: '700',
            backgroundColor: 'transparent'
          }}
        >
          Payment
        </Text>
        <View
          style={{
            width: 20,
            height: 20
          }}
        />
      </View>
    )
  };

  _renderAnimations = () => (
    <GaugeProgress
      diameter={260}
      color={'#BBF236'}
      autoStart={true}
      targetProgress={1}
      progressPadding={0}
      maxProgress={0.75}
      rotate={135}
      progressWidth={16}
    />
  );

  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          backgroundColor: '#8e816c'
        }}
      >
        { this._renderHeader() }
        { this._renderAnimations() }
      </View>
    );
  }
}

