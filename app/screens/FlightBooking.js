import React, { Component } from 'react';
import {
  View, Text, Button, TouchableOpacity, Image, Dimensions, ScrollView
} from 'react-native';
import Routes from './../config/Routes';
import Images from './../assets/Images';
const { width, height } = Dimensions.get('window');

import FlightData from './../data/flightData';
export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: false,
      showPopupFlightInfo: false,
    }
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
          Select Your Seat
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

  _renderLine = () => (
    <View
      style={{
        marginTop: 10,
        height: 1,
        backgroundColor: '#cccccc',
        marginHorizontal: 24
      }}
    />
  );

  _renderFlightInfoPopup = () => {
    if (!this.state.showPopupFlightInfo) return null;
    return (
      <View
        style={{
          marginTop: 30,
          width: width - 40,
          height: 520,
          backgroundColor: '#fff',
          borderRadius: 12,
          shadowColor: '#000', shadowOffset: {width: 0, height: 1}, shadowOpacity: 0.6, shadowRadius: 1.5,
        }}
      >
        <View
          style={{
            backgroundColor: '#000810',
            width: width - 40,
            height: 80,
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 24
          }}
        >
          <Image
            source={Images.salogo}
            style={{
              width: 55 * 0.7,
              height: 73 * 0.7
            }}
          />
          <View>
            <Text
              style={{
                color: '#fff',
                fontSize: 24,
                fontWeight: '600'
              }}
            >
              Singapore Airline
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center'
              }}
            >
              <Image
                source={Images.check}
                style={{
                  width: 65 * 0.22,
                  height: 54 * 0.22
                }}
              />
              <Text
                style={{
                  color: '#fff',
                  marginLeft: 4,
                }}
              >
                Your seat have been selected
              </Text>
            </View>
          </View>
          <View />
        </View>
        <View
          style={{
            paddingTop: 20,
            paddingHorizontal: 40,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <View>
            <Text
              style={{
                fontSize: 30,
                fontWeight: '600'
              }}
            >
              {FlightData.originAirportCode}
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: '#7e7e7e'
              }}
            >
              Singapore
            </Text>
          </View>
          <Image
            source={Images._smallPlane_}
            style={{
              tintColor: '#afb0c5',
              width: 113 * 0.8,
              height: 24 * 0.8
            }}
          />
          <View>
            <Text
              style={{
                fontSize: 30,
                fontWeight: '600'
              }}
            >
            {FlightData.destAirportCode}
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: '#7e7e7e'
              }}
            >
              Rome
            </Text>
          </View>
        </View>
        { this._renderLine() }
        { this._renderTime() }
        { this._renderPassengerAndSeatInfo() }
        { this._renderLine() }
        { this._renderLugageInfo() }
        { this._renderLine() }
        { this._renderAdditionalSeatPrice() }
        { this._renderProceedPaymentButton() }
      </View>
    );
  };

  _renderProceedPaymentButton = () => (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
      }}
    >
      <TouchableOpacity
        style={{
          backgroundColor: '#000810',
          width: 260,
          height: 40,
          borderRadius: 6,
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onPress={() => {
          this.props.navigation.navigate(Routes.Payment);
        }}
      >
        <Text style={{color: '#fff', fontSize: 15, fontWeight: '500'}}>PROCEED PAYMENT</Text>
      </TouchableOpacity>
    </View>
  );

  _renderAdditionalSeatPrice = () => (
    <View
      style={{
        marginTop: 14,
        paddingHorizontal: 36
      }}
    >
      <Text style={{fontSize: 16, color: '#7e7e7e'}}>
        Additional Seat Price ............... $50
      </Text>
      <Text style={{fontSize: 16, marginTop: 10,}}>
        Total Price ................................ $50
      </Text>
    </View>
  );

  _renderTime = () => (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 40,
          marginTop: 10,
        }}
      >
        <View>
          <Text
            style={{
              fontSize: 14,
              color: '#7e7e7e'
            }}
          >
            Departure
          </Text>
        </View>
        <View>
          <Text
            style={{
              fontSize: 14,
              color: '#7e7e7e'
            }}
          >
            Arrival
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 40,
          marginTop: 5,
        }}
      >
        <View>
          <Text
            style={{
              fontSize: 14
            }}
          >
            <Text style={{fontWeight: 'bold'}}>22:10</Text> 8 Oct
          </Text>
        </View>
        <View>
          <Text
            style={{
              fontSize: 14,
            }}
          >
            <Text style={{fontWeight: 'bold'}}>00:45</Text> 9 Oct
          </Text>
        </View>
      </View>
    </View>
  );

  _renderPassengerAndSeatInfo = () => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 40,
        marginTop: 30,
      }}
    >
      <View>
        <Text
          style={{
            fontSize: 14,
            color: '#7e7e7e'
          }}
        >
          Passenger Name
        </Text>
        <Text
          style={{
            fontSize: 18,
              marginTop: 5,
            fontWeight: '600'
          }}
        >
         {FlightData.name}
        </Text>
      </View>
      <View>
        <Text
          style={{
            fontSize: 14,
              marginTop: 5,
            color: '#7e7e7e'
          }}
        >
          Seat <Text style={{ fontSize: 34, fontWeight: '600', color: '#000' }}>4A</Text>
        </Text>
      </View>
    </View>
  );

  _renderLugageInfo = () => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 40,
        marginTop: 10,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-end'
        }}
      >
        <Image
         source={Images.luggage}
         style={{
           width: 36 * 0.7,
           height: 84 * 0.7
         }}
        />
        <View
          style={{
            marginLeft: 10
          }}
        >
          <Text
            style={{
              fontSize: 26,
              fontWeight: '600'
            }}
          >
            20Kg
          </Text>
          <Text
            style={{
              color: '#7e7e7e'
            }}
          >
            For Luggage
          </Text>
        </View>
      </View>
      <View
        style={{
          justifyContent: 'flex-end'
        }}
      >
        <Text
          style={{
            color: '#7e7e7e'
          }}
        >
          <Text style={{color: '#000', fontWeight: '600'}}>
            7Kg
          </Text> on Cabin
        </Text>
      </View>
    </View>
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
        <ScrollView
          style={{
            position: 'absolute', width, height
          }}
          horizontal={false}
          bounces={false}
        >
          <Image
            source={Images.planeSelectSeat}
            style={{
              width: 800 * 0.47,
              height: 2080 * 0.47,
            }}
          />
          <View
            style={{
              position: 'absolute',
              left: 70, top: 410,
            }}
          >
            <TouchableOpacity
              style={{
                width: 50, height: 50,
              }}
              onPress={() => {
                this.setState({
                  showPopup: true
                });
                FlightData.seat = '4A';
                FlightData.gate = '5';
              }}
            >
            </TouchableOpacity>
            {
              this.state.showPopup && (
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    top: -80,
                    left: -50,
                    width: 323,
                    height: 78,
                    backgroundColor: '#000810',
                    borderRadius: 8,
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                  }}
                  onPress={() => {
                    this.setState({
                      showPopupFlightInfo: true
                    });
                    FlightData.seat = '4A';
                    FlightData.gate = '5';
                  }}
                >
                  <Image
                    source={Images.salogo}
                    style={{
                      width: 55 * 0.7,
                      height: 73 * 0.7,
                    }}
                  />
                  <View
                    style={{
                      paddingHorizontal: 8
                    }}
                  >
                    <Text
                      style={{
                        color: '#fff'
                      }}
                    >
                      Economy Class
                    </Text>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 24,
                        fontWeight: '700'
                      }}
                    >
                      Seat {FlightData.seat}
                    </Text>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 10
                      }}
                    >
                      • {FlightData.flightNumber} • {'SIN-FCO (21.00 Local Time)'}
                    </Text>
                  </View>
                  <Image
                    source={Images.check}
                    style={{
                      width: 65 * 0.6,
                      height: 54 * 0.6
                    }}
                  />
                  <View
                    style={{
                      position: 'absolute',
                      top: 78,
                      left: 69
                    }}
                  >
                    <View
                      style={{
                        width: 0,
                        height: 0,
                        borderLeftWidth: 6,
                        borderRightWidth: 6,
                        borderTopWidth: 6,
                        borderTopColor: '#000810',
                        borderLeftColor: 'transparent',
                        borderRightColor: 'transparent',
                      }}
                    />
                  </View>
                </TouchableOpacity>
              )
            }
          </View>
        </ScrollView>
        { this._renderHeader() }
        { this._renderFlightInfoPopup() }
      </View>
    );
  }
}


