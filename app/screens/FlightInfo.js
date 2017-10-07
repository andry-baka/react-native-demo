import React, { Component } from 'react';
import {
  View, Text, Button, TouchableOpacity, Image, Dimensions
} from 'react-native';
import Routes from './../config/Routes';
import Images from './../assets/Images';
const { width, height } = Dimensions.get('window');

export default class Profile extends Component {
  constructor(props) {
    super(props);
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
              CGK
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: '#fff',
                fontWeight: '600'
              }}
            >
              Jakarta
            </Text>
          </View>
          <Image
            source={Images._smallPlane_}
            style={{
              width: 113,
              height: 24
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
              SIN
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
              paddingVertical: 15
            }}
          >
            <Image
              source={Images.salogo}
              style={{
              }}
            />
            <View>
              <Text>
                We are seeing you still not do {'\n'}
                check-in right now?
              </Text>
                <TouchableOpacity>
                </TouchableOpacity>
            </View>
          </Image>
        </View>

      </View>
    );
  }
}


