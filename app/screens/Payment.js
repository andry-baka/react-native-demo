import React, { Component } from 'react';
import {
  View, Text, Button, TouchableOpacity, Image, Dimensions, ScrollView, Animated, Easing
} from 'react-native';
import Routes from './../config/Routes';
import Images from './../assets/Images';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { NavigationActions } from 'react-navigation';
const { width, height } = Dimensions.get('window');

export default class Payment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      running: false,
      message: '',
      fingerprintTop: new Animated.Value(0),
      fingerPrintOpacity: new Animated.Value(0),
      masterCardTop: new Animated.Value(0),
      masterCardRotate: new Animated.Value(0),
      masterCardOpacity: new Animated.Value(0),
      checkRotate: new Animated.Value(0),
      checkOpacity: new Animated.Value(0),
      planeOpacity: new Animated.Value(0),
      planeTop: new Animated.Value(0),
      planeWidth: new Animated.Value(0)
    };
  }

  componentDidMount() {
    this.setState({
      message: 'Authenticate your identity\nfor payment'
    });
    this.state.fingerPrintOpacity.setValue(1);
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutId);
  }

  _playAnimation = async () => {
    await this._animateFingerPrint();
    await this._animateMasterCard();
    await this._animateCheck();
    await this._animatePlane();
  };

  _animateCheck = () => {
    this.setState({
      message: 'All set, you are\nReady to Go...'
    });
    this.state.checkOpacity.setValue(0);
    this.state.checkRotate.setValue(-0.15);
    Animated.parallel([
      Animated.timing(
        this.state.checkOpacity,
        {
          delay: 290,
          toValue: 1,
          duration: 280,
          easing: Easing.linear
        }
      ),
      Animated.timing(
        this.state.checkRotate,
        {
          delay: 290,
          toValue: 0,
          duration: 280,
          easing: Easing.linear
        }
      )
    ]).start();
  };

  _animateMasterCard = async () => {
    this.setState({
      message: 'Process your payment through\nMaster Card'
    });
    this.refs.circularProgress.performLinearAnimation(100, 1800);
    this.state.masterCardTop.setValue(10);
    this.state.masterCardOpacity.setValue(0);
    Animated.parallel([
      Animated.timing(
        this.state.masterCardTop,
        {
          toValue: 0,
          duration: 500,
          easing: Easing.linear
        }
      ),
      Animated.timing(
        this.state.masterCardOpacity,
        {
          toValue: 1,
          duration: 500,
          easing: Easing.linear
        }
      )
    ]).start();
    await this._delay(1000);
    Animated.parallel([
      Animated.timing(
        this.state.masterCardOpacity,
        {
          toValue: 0,
          duration: 300,
          easing: Easing.linear
        }
      ),
      Animated.timing(
        this.state.masterCardRotate,
        {
          toValue: 0.15,
          duration: 300,
          easing: Easing.linear
        }
      )
    ]).start();
  };

  _animateFingerPrint = async () => {
    this.refs.circularProgress.performLinearAnimation(50, 1000);
    this.state.fingerPrintOpacity.setValue(1);
    this.state.fingerprintTop.setValue(0);
    await this._delay(1000);
    Animated.parallel([
      Animated.timing(
        this.state.fingerPrintOpacity,
        {
          toValue: 0,
          duration: 500,
          easing: Easing.linear
        }
      ),
      Animated.timing(
        this.state.fingerprintTop,
        {
          toValue: -10,
          duration: 500,
          easing: Easing.linear
        }
      )
    ]).start();
  };

  _animatePlane = async () => {
    await this._delay(1000);
    this.setState({
      message: ''
    });
    this.refs.circularProgress.performLinearAnimation(0, 0);
    this.state.checkOpacity.setValue(0);
    this.state.planeOpacity.setValue(0);
    this.state.planeWidth.setValue(750);
    this.state.planeTop.setValue(0);
    Animated.parallel([
      Animated.timing(
        this.state.planeOpacity,
        {
          toValue: 1,
          duration: 800,
          easing: Easing.linear
        }
      ),
      Animated.timing(
        this.state.planeWidth,
        {
          toValue: 250,
          duration: 800,
          easing: Easing.linear
        }
      )
    ]).start();
    Animated.timing(
      this.state.planeTop,
      {
        delay: 1200,
        toValue: -800,
        duration: 1200,
        easing: Easing.easeOut
      }
    ).start();
    await this._delay(1500);
    const resetAction = NavigationActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({ routeName:  Routes.Profile }),
        NavigationActions.navigate({ routeName: Routes.FlightInfo })
      ]
    });
    this.props.navigation.dispatch(resetAction);
  };

  _delay = (timeout) => {
    return new Promise(resolve => {
      clearTimeout(this.timeoutId);
      this.timeoutId = setTimeout(resolve, timeout)
    });
  };

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

  _renderAnimations = () => {
    const masterCardSpin = this.state.masterCardRotate.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    });

    const checkSpin = this.state.checkRotate.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    });
    return (
        <View style={{ position: 'absolute', top: 25, width: 100, height: 100, alignItems: 'center', justifyContent: 'center' }}>
          <Animated.Image
            source={Images.fingerprint}
            style={{
              position: 'absolute',
              width: 50, height: 50,
              tintColor: '#fff',
              resizeMode: 'contain',
              opacity: this.state.fingerPrintOpacity,
              top: this.state.fingerprintTop,
            }}
          />
          <Animated.Image
            source={Images.mastercard}
            style={{
              position: 'absolute',
              width: 50, height: 50,
              tintColor: '#fff',
              resizeMode: 'contain',
              opacity: this.state.masterCardOpacity,
              top: this.state.masterCardTop,
              transform: [{rotate: masterCardSpin}]
            }}
          />
          <Animated.Image
            source={Images.check}
            style={{
              position: 'absolute',
              width: 36, height: 36,
              top: 5,
              tintColor: '#fff',
              resizeMode: 'contain',
              opacity: this.state.checkOpacity,
              transform: [{rotate: checkSpin}]
            }}
          />
        </View>
    )
  };

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
        <View style={{flex: 1, marginTop: -150, alignItems: 'center', justifyContent: 'center'}}>
          <View style={{ width: 100, height: 100 }}>
            <AnimatedCircularProgress
              ref='circularProgress'
              size={100}
              width={3}
              fill={0}
              tintColor="#fff"
              backgroundColor="rgba(0,0,0,0)"
              rotation={0}
            >
              { fill => this._renderAnimations() }
            </AnimatedCircularProgress>
          </View>
          <Text
            style={{
              color: '#fff',
              fontWeight: 'bold',
              marginTop: 14,
              textAlign: 'center'
            }}
          >
            { this.state.message }
          </Text>
        </View>
        <Animated.Image
          source={Images.bigPlane}
          style={{
            position: 'absolute',
            resizeMode: 'contain',
            width: this.state.planeWidth,
            opacity: this.state.planeOpacity,
            top: this.state.planeTop,
            shadowColor: '#000', shadowOffset: {width: 0, height: 1}, shadowOpacity: 0.6, shadowRadius: 1.5,
          }}
        />
        {
          this.state.running === false &&
          <TouchableOpacity
            style={{
              position: 'absolute',
              width,
              height: 500,
              top: height - 500,
            }}
            activeOpacity={0}
            onPress={() => {
              this.setState({
                running: true
              });
              this._playAnimation()
            }}
          />
        }
      </View>
    );
  }
}

