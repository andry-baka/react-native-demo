import React, { Component } from 'react';
import {
  View, Text, Button, Image, StatusBar, Dimensions,
  TouchableOpacity
} from 'react-native';
import Routes from './../config/Routes';
import PushNotification from 'react-native-push-notification';
import Images from './../assets/Images';
const { width, height } = Dimensions.get('window');

export default class Profile extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    PushNotification.localNotificationSchedule({
      message: "My Notification Message",
      date: new Date(Date.now() + (3 * 1000)) // in 60 secs
    });
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
            Andry Baka
          </Text>
        </View>
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
          onPress={() => {
          }}
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
              Business Class GA-01
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
                CGK
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
                SIN
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
              4A
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
              8 Oct
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600'
              }}
            >
              21:30
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
      </View>
    );
  }
}

