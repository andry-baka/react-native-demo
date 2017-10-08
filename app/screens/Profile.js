import React, { Component } from 'react';
import moment from 'moment';
import {
  View, Text, Button, Image, StatusBar, Dimensions,
  TextInput, Animated,
  TouchableOpacity, TouchableWithoutFeedback
} from 'react-native';
import Modal from 'react-native-modal';
import Spinner from 'react-native-loading-spinner-overlay';

import Routes from './../config/Routes';
import PushNotification from 'react-native-push-notification';
import Images from './../assets/Images';

import Networking from './../api/Networking';

import FlightData from './../data/flightData';

const { width, height } = Dimensions.get('window');
const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...FlightData,
      visible: false,
      isModalVisible: false,
      isDataFetched: false,

      suggestionMessageHeight: new Animated.Value(0),
      suggestionMessageOpacity: new Animated.Value(0),
      flightInfoOpacity: new Animated.Value(0)
    };
  }

  _showModal = () => this.setState({ isModalVisible: true })
  
  _hideModal = () => this.setState({ isModalVisible: false })

  _changeToDelay = () => {
    PushNotification.localNotificationSchedule({
      message: `Dear ${this.state.name}, your flight will be delayed 90 minutes. Estimated departure time is ${moment(this.state.scheduledDepartureTime).add(90, 'minutes').format('HH:mm')}`,
      date: new Date(Date.now())
    });
    this.setState({
      flightStatus: 'Delay',
      historyPoint: 312,
    });
  };

  _getData = () => {
    const PNRReq = {
      request: {
        pnr: "RVA7GY"
      },
      clientUUID: "AnyUniqueStringToIdentifyTheRequest"
    };

    this.setState({ visible: true });

    Networking.post('/pnr/get', {}, PNRReq)
    .then((response) => {
      const { flights, passengers } = response;
      const { firstName, lastName, seatDetails } = passengers[0];
      const { seatNumber } = seatDetails[0];
      const { origin, destination, flightNumber, flightSegment } = flights[0];
      const { marketingAirlineCode, scheduledDepartureTime, cabinClass } = flightSegment[0];

      this.setState({
        visible: false,
        isDataFetched: true,
        name: firstName + ' ' + lastName,
        originAirportCode: origin.airportCode,
        destAirportCode: destination.airportCode,
        //seat: seatNumber,
        flightDate: moment(scheduledDepartureTime).format('DD MMM'),
        flightTime: moment(scheduledDepartureTime).format('HH:mm'),
        scheduledDepartureTime: scheduledDepartureTime,
        flightClass: cabinClass,
        flightNumber: marketingAirlineCode + '-' + flightNumber
      });

      // store on global variable
      FlightData.name = firstName + ' ' + lastName;
      FlightData.originAirportCode = origin.airportCode;
      FlightData.destAirportCode = destination.airportCode;
      //FlightData.seat = seatNumber;
      FlightData.flightDate = moment(scheduledDepartureTime).format('DD MMM');
      FlightData.flightTime = moment(scheduledDepartureTime).format('HH:mm');
      FlightData.scheduledDepartureTime = scheduledDepartureTime;
      FlightData.flightClass = cabinClass;
      FlightData.flightNumber = marketingAirlineCode + '-' + flightNumber;

      this._showFlightInfo();

    }, function(error) {
      console.error("Failed!", error);
    });
  };

  _showFlightInfo = () => {
    this.state.suggestionMessageHeight.setValue(0);
    this.state.suggestionMessageOpacity.setValue(0);
    this.state.flightInfoOpacity.setValue(0);
    Animated.sequence([
      Animated.timing(
        this.state.suggestionMessageHeight,
        {
          toValue: 60,
          duration: 500
        }
      ),
      Animated.timing(
        this.state.suggestionMessageOpacity,
        {
          toValue: 1,
          duration: 500
        }
      ),
      Animated.timing(
        this.state.flightInfoOpacity,
        {
          toValue: 1,
          duration: 500
        }
      )
    ]).start();
  };

  componentDidMount() {
    // const req = {
    //   request: {
    //     pnr: "RVA7GY"
    //   },
    //   clientUUID: "AnyUniqueStringToIdentifyTheRequest"
    // };

    // Networking.post('/checkin/getpassenger', {}, req)
    // .then(function(response) {
    //   const { flights } = response;
    //   const { origin, destination, scheduledDepartureDateTime, operatingAirline: {
    //     airlineCode, flightNumber
    //   } } = flights[0];
    //   console.log("origin.airportCode: ", origin.airportCode);
    //   console.log("destination.airportCode: ", destination.airportCode);
    //   console.log("scheduledDepartureDateTime: ", scheduledDepartureDateTime);
    //   console.log("no: ", airlineCode+flightNumber);

    //   const { services } = response;
    //   const { seatSelected, cabinClass, dcsStatus } = services[0];
    //   console.log("seatSelected: ", seatSelected);
    //   console.log("cabinClass: ", cabinClass);
    //   console.log("dcsStatus: ", dcsStatus);
    // }, function(error) {
    //   console.error("Failed!", error);
    // });

    // const KFReq = {
    //   request: {
    //     krisflyerNumber: "8987011905"
    //   },
    //   clientUUID: "AnyUniqueStringToIdentifyTheRequest"
    // };


    // Networking.post('/krisflyer/getprofile', {}, KFReq)
    // .then(function(response) {
    //   const { accountSummary: {
    //     kfMiles
    //   }, loyaltyTierName } = response;

    //   console.log("response: ", response);
    //   console.log("kfMiles: ", kfMiles);
    //   console.log("loyaltyTierName: ", loyaltyTierName);
    // }, function(error) {
    //   console.error("Failed!", error);
    // });
  }

  _renderModal = () => {
    return (
      <Modal
        backdropColor={'black'}
        backdropOpacity={0.5}
        animationIn={'zoomInDown'}
        animationOut={'zoomOutUp'}
        animationInTiming={1000}
        animationOutTiming={1000}
        backdropTransitionInTiming={1000}
        backdropTransitionOutTiming={1000}
        isVisible={this.state.isModalVisible}
        onBackdropPress={() => this.setState({ visibleModal: null })}
      >
        <View style={{
          marginTop: 20,
          backgroundColor: 'white',
          height: 350,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 4,
          borderColor: 'rgba(0, 0, 0, 0.1)'
          }}
        >
          <Text
            style={{
              color: '#231f20',
              textAlign: 'center',
              fontSize: 25,
              fontWeight: '700'
            }}
          >
            Have a new flight?
          </Text>

          <View style={{
              marginTop: 0,
              margin: -20
            }}
          >
            <View style={{
                marginTop: 20,
                width: 250,
                height: 60,
                backgroundColor: '#fff',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
              }}
            >
              <Text
                style={{
                  color: '#231f20',
                  fontWeight: 'bold',
                  fontSize: 15
                }}
              >
                Last Name :
              </Text>
              <TextInput
                style={{
                  height: 35,
                  width: 150,
                  alignItems: 'flex-end',
                  justifyContent: 'flex-end',
                  borderColor: '#eaeaea',
                  borderWidth: 1,
                  borderRadius: 8,
                    fontSize: 13,
                    textAlign: 'right',
                    paddingRight: 10
                }}
                value="APPCHALLENGE"
                placeholder="APPCHALLENGE"
                onChangeText={(text) => this.setState({text})}
              />
            </View>

            <Text
              style={{
                color: '#231f20',
                  fontWeight: 'bold',
                fontSize: 15
              }}
            >
              Booking Ref :
            </Text>

            <TextInput
              style={{
                height: 80,
                marginTop: 10,
                borderColor: '#eaeaea',
                borderWidth: 1,
                borderRadius: 8,
                  fontSize: 13,
                  padding: 10,
              }}
              placeholder="Enter booking ref number"
              multiline = {true}
              numberOfLines = {3}
              editable = {true}
              maxLength = {40}
            />

            <TouchableOpacity
              onPress={() => {this._getData(); this._hideModal();}}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 16,
                borderRadius: 8,
                backgroundColor: '#689142',
                paddingHorizontal: 34,
                paddingVertical: 8
              }}
            >
              <Image source={Images.add} style={{width: 25, height: 25}} />
              <Text style={{ marginLeft: 20, color: '#fff', fontWeight: '600' }}>Add New Flight</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
  }

  _renderName = () => {
    return(
      <View>
        <Text
          style={{
            color: '#fff'
          }}
        >
          Welcome,
        </Text>
        <Text
          style={{
            color: '#fff',
            fontSize: 30,
            fontWeight: '700'
          }}
        >
          {this.state.name}
        </Text>
      </View>
    )
  };

  _renderStat = () => {
    return (
    <AnimatedTouchableOpacity
      style={{
        marginTop: 26,
        width: 350,
        height: 60,
        backgroundColor: '#fff',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.4,
        shadowRadius:1.5,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        opacity: this.state.flightInfoOpacity
      }}
      onPress={() => {
        this.props.navigation.navigate(Routes.FlightInfo, { state: this.state });
      }}
    >
      <Image
        source={Images.salogo}
        style={{
          width: 55 * 0.46875,
          height: 73 * 0.46875,
            marginLeft:20
        }}
      />
      <View
        style={{
          marginLeft: 15,
            width: 140
        }}
      >
        <Text
          style={{
            color: '#606060',
            fontSize: 13,
            fontWeight: '500'
          }}
        >
          {this.state.flightClass} CLASS
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600'
            }}
          >
            {this.state.originAirportCode}
          </Text>
          <Image
            source={Images.smallPlane}
            style={{
              width: 14,
              height: 14,
                marginLeft:5,
                marginRight:5
            }}
          />
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600'
            }}
          >
          {this.state.destAirportCode}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <Image
            source={Images.checked}
            style={{
              width: 12,
              height: 12
            }}
          />
          <Text
            style={{
              color: '#606060',
              fontSize: 13,
              fontWeight: '500',
              marginLeft: 4,
            }}
          >
              {this.state.flightNumber}
          </Text>
        </View>
      </View>
      <View
        style={{
          width: 1,
          height: 46,
          backgroundColor: '#e7e7e7',
          marginHorizontal: 10
        }}
      />
      <View
        style={{
          alignItems: 'center'
        }}
      >
        <Text
          style={{
            fontSize: 13,
            color: '#616161'
          }}
        >
          Seat
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '600'
          }}
        >
        {FlightData.seat}
        </Text>
        <Text
          style={{
            color: '#80ae54',
            fontSize: 10
          }}
        >
          Gate {FlightData.gate}
        </Text>
      </View>
      <View
        style={{
          width: 1,
          height: 46,
          backgroundColor: '#e7e7e7',
          marginHorizontal: 10
        }}
      />
      <View>
        <Text
          style={{
            fontSize: 13,
            color: '#616161'
          }}
        >
        {this.state.flightDate}
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '600'
          }}
        >
        {this.state.flightTime}
        </Text>
        <Text
          style={{
            color: this.state.flightStatus === 'Delay' ? 'red' : '#80ae54',
            fontSize: 10
          }}
        >
          {this.state.flightStatus}
        </Text>
      </View>
    </AnimatedTouchableOpacity>
    )
  };

  _renderSuggestionMessage = () => {
    return (
      <TouchableWithoutFeedback onPress={this._changeToDelay} >
        <Animated.View
          style={{
            marginTop: 10,
            backgroundColor: '#000',
            width,
            height: this.state.suggestionMessageHeight,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Animated.View
            style={{
              opacity: this.state.suggestionMessageOpacity
            }}
          >
            <Text
              style={{
                color: '#fff',
                textAlign: 'center',
                backgroundColor: 'transparent',
              }}
            >
              Don’t forget you will have flight{'\n'}
              tomorrow evening
            </Text>
          </Animated.View>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
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
        <Spinner visible={this.state.visible} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
        <StatusBar
          barStyle="light-content"
        />
        <View
          style={{
            flexDirection: 'row',
            marginTop: 40,
            justifyContent: 'space-between',
            width: width - 50
          }}
        >
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate(Routes.HistoryPoint, {
                historyPoint: this.state.historyPoint,
                flightStatus: this.state.flightStatus
              })
            }}
          >
            <Image
              source={Images.reward}
              style={{
                width: 42,
                height: 42
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate(Routes.NotificationPage, { flightStatus: this.state.flightStatus })
            }}
          >
            <Image
              source={Images.bell}
              style={{
                width: 42,
                height: 42
              }}
            />
          </TouchableOpacity>
        </View>
        <Image
          source={Images.logo}
          style={{
            marginTop: 20,
            width: 622 * 0.46875,
            height: 561 * 0.46875,
            resizeMode: 'contain'
          }}
        />

        {this._renderName()}

        <TouchableWithoutFeedback onPress={this._changeToDelay} >
          <View
            style={{
              marginTop: 10,
              backgroundColor: '#000',
              width,
              height: 60,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                color: '#fff',
                textAlign: 'center',
                backgroundColor: 'transparent',
                fontStyle: 'italic'
              }}
            >
              Don’t forget you will have flight{'\n'}
              tomorrow evening
            </Text>
          </View>
        </TouchableWithoutFeedback>

        <TouchableOpacity
          onPress={this._showModal}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 16,
            borderRadius: 8,
            backgroundColor: '#6d6353',
            paddingHorizontal: 34,
            paddingVertical: 12
          }}
        >
          <Image source={Images.add} style={{width: 25, height: 25}} />
          <Text style={{ marginLeft: 8, color: '#fff', fontWeight: '600' }}>Add New Flight</Text>
        </TouchableOpacity>

        {this._renderModal()}

        {this._renderStat()}
      </View>
    );
  }
}

