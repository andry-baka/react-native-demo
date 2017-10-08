import React, { Component } from 'react';
import {
  View, Text, Button, Dimensions, TouchableOpacity, Image, StyleSheet,
  NavigatorIOS,
  Linking,
} from 'react-native';
import Routes from './../config/Routes';
import Images from './../assets/Images';
import NotificationDetailComponent from '../components/NotificationDetail';
import QRCodeScanner from 'react-native-qrcode-scanner';



const { width, height } = Dimensions.get('window');

class QRcodeScannerPage extends Component {
  constructor(props) {
    super(props);
  }

  onSuccess(e) {
    this.props.navigation.navigate(Routes.HistoryPoint, { qrcode: e.data })
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
              Scan QR code
            </Text>
            <View
              style={{
                width: 20,
                height: 20
              }}
            />
          </View>
        </View>
        <QRCodeScanner 
            onRead = {this.onSuccess.bind(this)}
            bottomContent={
              <TouchableOpacity style={styles.buttonTouchable}>
                <View style={{borderRadius: 50, backgroundColor: '#000', padding: 20,
                shadowColor: '#000', shadowOffset: {width: 0, height: 1}, shadowOpacity: 0.4, shadowRadius:1.5,
                }}>
                  <Text style={styles.buttonText}>Pay</Text>
                </View>
              </TouchableOpacity>
            }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: '#fff'
  },
  buttonTouchable: {
    padding: 16,
  },
});


export default QRcodeScannerPage;

