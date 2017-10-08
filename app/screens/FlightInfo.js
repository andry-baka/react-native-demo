import React, { Component } from 'react';
import {
  View, Text, Button, TouchableOpacity, Image, Dimensions
} from 'react-native';
import Routes from './../config/Routes';
import Images from './../assets/Images';
const { width, height } = Dimensions.get('window');

import FlightData from './../data/flightData';

export default class Profile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      flightClass,
      name,
      originAirportCode,
      destAirportCode,
      flightNumber,
      flightTime
    } = this.props.navigation.state.params.state;
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          backgroundColor: '#8e816c'
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            marginTop: 40,
            justifyContent: 'space-between',
            width: width - 50,
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
              fontWeight: '700'
            }}
          >
            Flight Details
          </Text>
          <View
            style={{
              width: 20,
              height: 20
            }}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 24
          }}
        >
          <View
            style={{
              alignItems: 'center'
            }}
          >
            <Text
              style={{
                fontSize: 30,
                color: '#fff',
                fontWeight: '700'
              }}
            >
             {originAirportCode}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: '#fff',
                fontWeight: '600'
              }}
            >
             Singapore
            </Text>
          </View>
          <Image
            source={Images._smallPlane_}
            style={{
              width: 113,
              height: 24,

            }}
          />
          <View
            style={{
              alignItems: 'center'
            }}
          >
            <Text
              style={{
                fontSize: 30,
                color: '#fff',
                fontWeight: '700'
              }}
            >
             {destAirportCode}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: '#fff',
                fontWeight: '600'
              }}
            >
              Rome
            </Text>
          </View>
        </View>

        <View
          style={{
            marginTop: 20,
            width: width - 60,
            height: 460,
            borderRadius: 16,
            backgroundColor: '#fff',
            shadowColor: '#000', shadowOffset: {width: 0, height: 1}, shadowOpacity: 0.4, shadowRadius:1.5,
          }}
        >
          <View
            style={{
              borderTopRightRadius: 16,
              borderTopLeftRadius: 16,
              backgroundColor: '#000810',
              height: 80,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 12,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center'
              }}
            >
              <Image
                source={Images.planeUp}
                style={{
                  width: 21,
                  height: 15,
                  marginHorizontal: 16
                }}
              />
              <View>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 18,
                    fontWeight: '600'
                  }}
                >
                  21:45
                </Text>
                <Text
                  style={{
                    color: '#cccccc',
                    fontWeight: '500'
                  }}
                >
                  8 Oct
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center'
              }}
            >
              <View
                style={{
                  alignItems: 'flex-end'
                }}
              >
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 18,
                    fontWeight: '600'
                  }}
                >
                  00:15
                </Text>
                <Text
                  style={{
                    color: '#cccccc',
                    fontWeight: '500'
                  }}
                >
                  9 Oct
                </Text>
              </View>
              <Image
                source={Images.planeDown}
                style={{
                  width: 21,
                  height: 15,
                  marginHorizontal: 16
                }}
              />
            </View>
          </View>
          <Image
            source={Images.ticketBG}
            style={{
              width: width - 60,
              height: 115,
              paddingHorizontal: 30,
              paddingVertical: 15,
              flexDirection: 'row'
            }}
          >
            <Image
              source={Images.salogo}
            />
            <View
              style={{
                justifyContent: 'center',
                marginLeft: 15
              }}
            >
              <Text
                style={{
                  fontWeight: '600'
                }}
              >
                We are seeing you still not do {'\n'}
                check-in right now?
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: '#fea000',
                  flexDirection: 'row',
                  width: 160,
                  paddingVertical: 6,
                  borderRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 12
                }}
                onPress={() => {
                  this.props.navigation.navigate(Routes.FlightBooking);
                }}
              >
                <Image
                  source={Images.goIn}
                  style={{
                    width: 13.5,
                    height: 14.5
                  }}
                />
                <Text
                  style={{
                    marginLeft: 10,
                    color: '#fff',
                    fontWeight: '700'
                  }}
                >
                  Check-In Now
                </Text>
              </TouchableOpacity>
            </View>
          </Image>
          <View
            style={{
              backgroundColor: '#000810',
              height: 70,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 12,
              paddingHorizontal: 18,
              flexDirection: 'row'
            }}
          >
            <View>
              <Text
                style={{
                  color: '#a2a4a5',
                  fontSize: 13
                }}
              >
                Flight
              </Text>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 22,
                  fontWeight: '600'
                }}
              >
                {flightNumber}
              </Text>
            </View>
            <View>
              <Text
                style={{
                  color: '#a2a4a5',
                  fontSize: 13
                }}
              >
                Boarding Time
              </Text>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 22,
                  fontWeight: '600'
                }}
              >
                21:15
              </Text>
            </View>
            <View>
              <Text
                style={{
                  color: '#a2a4a5',
                  fontSize: 13
                }}
              >
                Gate
              </Text>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 22,
                  fontWeight: '600'
                }}
              >
                5
              </Text>
            </View>
            <View>
              <Text
                style={{
                  color: '#a2a4a5',
                  fontSize: 13
                }}
              >
                Seat
              </Text>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 22,
                  fontWeight: '600'
                }}
              >
               {FlightData.seat}
              </Text>
            </View>
          </View>
          <Text
            style={{
              marginLeft: 40,
              marginTop: 20,
              fontSize: 16,
                fontWeight: 'bold'
            }}
          >
            Boarding Pass
          </Text>
          <View
            style={{
              marginTop: 8,
              marginLeft: 20,
              width: width - 110,
              height: 0.8,
              backgroundColor: '#cccccc'
            }}
          />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 35,
              paddingVertical: 20
            }}
          >
            <View>
              <Text
                style={{
                  color: '#a2a4a5',
                    fontSize: 13
                }}
              >
                Passenger
              </Text>
              <Text
                style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    marginTop: 5
                }}
              >
                APPCHALLENGE
              </Text>
              <Text
                style={{
                  color: '#a2a4a5',
                  marginTop: 13
                }}
              >
                Seat Class
              </Text>
              <Text
                style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    marginTop: 5
                }}
              >
                {flightClass}
              </Text>
            </View>
            <Image
              source={Images.qrCode}
              style={{
                width: 98,
                height: 98
              }}
            />
          </View>
        </View>

      </View>
    );
  }
}


