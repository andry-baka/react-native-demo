import React, { Component } from 'react';
import moment from 'moment';
import {
  View, Text, Button, Image, StatusBar, Dimensions,
  TouchableOpacity
} from 'react-native';
import Modal from 'react-native-modal';
import Spinner from 'react-native-loading-spinner-overlay';

import Routes from './../config/Routes';
import PushNotification from 'react-native-push-notification';
import Images from './../assets/Images';

import Networking from './../api/Networking';

const { width, height } = Dimensions.get('window');

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      originAirportCode: '',
      destAirportCode: '',
      seat: '',
      date: '',
      time: '',
      flightClass: '',
      flightNumber: '',

      visible: false,
      isModalVisible: false,
      isDataFetched: false
    };
  }

  _showModal = () => this.setState({ isModalVisible: true })
  
  _hideModal = () => this.setState({ isModalVisible: false })

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
        isDataFetched: true,
        name: firstName + ' ' + lastName,
        originAirportCode: origin.airportCode,
        destAirportCode: destination.airportCode,
        seat: seatNumber,
        date: moment(scheduledDepartureTime).format('DD MMM'),
        time: moment(scheduledDepartureTime).format('LT'),
        flightClass: cabinClass,
        flightNumber: marketingAirlineCode + '-' + flightNumber
      });

      this.setState({ visible: false });

    }, function(error) {
      console.error("Failed!", error);
    });
  }

  componentDidMount() {
    PushNotification.localNotificationSchedule({
      message: "My Notification Message",
      date: new Date(Date.now() + (3 * 1000)) // in 60 secs
    });

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




    const KFReq = {
      request: {
        krisflyerNumber: "8987011905"
      },
      clientUUID: "AnyUniqueStringToIdentifyTheRequest"
    };


    Networking.post('/krisflyer/getprofile', {}, KFReq)
    .then(function(response) {
      const { accountSummary: {
        kfMiles
      }, loyaltyTierName } = response;

      console.log("response: ", response);
      console.log("kfMiles: ", kfMiles);
      console.log("loyaltyTierName: ", loyaltyTierName);
    }, function(error) {
      console.error("Failed!", error);
    });
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
    <TouchableOpacity
      style={{
        marginTop: 26,
        width: 350,
        height: 60,
        backgroundColor: '#fff',
        borderRadius: 12,
        shadowColor: '#000', shadowOffset: {width: 0, height: 1}, shadowOpacity: 0.4, shadowRadius:1.5,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
      }}
      onPress={() => {
        this.props.navigation.navigate(Routes.FlightInfo);
      }}
    >
      <Image
        source={Images.salogo}
        style={{
          width: 55 * 0.46875,
          height: 73 * 0.46875,
        }}
      />
      <View
        style={{
          marginLeft: 15
        }}
      >
        <Text
          style={{
            color: '#606060',
            fontSize: 13,
            fontWeight: '500'
          }}
        >
          {this.state.flightClass} Class {this.state.flightNumber}
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
              height: 14
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
            Check-in
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
        {this.state.seat}
        </Text>
        <Text
          style={{
            color: '#80ae54',
            fontSize: 10
          }}
        >
          Gate 5
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
        {this.state.date}
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '600'
          }}
        >
        {this.state.time}
        </Text>
        <Text
          style={{
            color: '#80ae54',
            fontSize: 10
          }}
        >
          On Schedule
        </Text>
      </View>
    </TouchableOpacity>
    )
  }

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
              this.props.navigation.navigate(Routes.Reward)
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
              this.props.navigation.navigate(Routes.Notifications)
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

        {this.state.isDataFetched && this._renderName()}

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
              backgroundColor: 'transparent'
            }}
          >
            Don’t forget you will have flight{'\n'}
            tomorrow evening
          </Text>
        </View>

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
            backgroundColor: 'white',
            height: 150,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 4,
            borderColor: 'rgba(0, 0, 0, 0.1)'
            }}
          >
            <View style={{ flex: 1 }}>
              <TouchableOpacity onPress={() => {this._getData(); this._hideModal();}}>
                <Text>Get SIA Data!</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {this.state.isDataFetched && this._renderStat()}
      </View>
    );
  }
}

