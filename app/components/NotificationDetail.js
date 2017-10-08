import React, { Component } from 'react';
import {
  View, Text, ListView, Image, StyleSheet
} from 'react-native';
import Routes from './../config/Routes';
import Images from '../assets/Images'
import FlightData from './../data/flightData';

class NotificationList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const notificationItem = this.props.notificationItem || {
      title: 'Delay SIA from HCM to JKT',
      icon: Images.delay,
      icon2x: Images.delay2x,
      description: 'SIA 298 Deplay 30 mins VNA to JKT'
    };
    return (
      <View style={{margin: 25, flex: 1, backgroundColor: '#fff', borderRadius: 10, padding: 20}}>
        <View style={{alignItems: 'center'}}>
          <Image 
              source={notificationItem.icon2x}
              style= {{
                width: 100 * 2,
                height: 100 * 2
              }}
          />
        </View>
        <View>
          <View style={{
            borderBottomColor: '#eaeaea',
            borderBottomWidth: 2,
            paddingTop: 20,
            paddingBottom: 20
          }}>
            <Text style={{color: '#878787', fontWeight: '600', textAlign: 'center',}}>Hi {FlightData.name}, This is notification for you !</Text>
          </View>
          <View style={{
            borderBottomColor: '#eaeaea',
            borderBottomWidth: 2,
            paddingTop: 20,
            paddingBottom: 20
          }}>
            <Text style={{color: '#231f20', fontWeight: 'bold', textAlign: 'center', fontStyle: 'italic', fontSize: 17, marginBottom: 5}}>{notificationItem.description}</Text>
            <Text style={{color: '#878787', fontWeight: '400', textAlign: 'center'}}>{notificationItem.date}</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 30}}>
              {notificationItem.type === 'coin' && <Text style={{color: '#231f20', fontWeight: 'bold', fontSize: 17, marginTop: -10}}>Point added: </Text>}
              {notificationItem.type === 'spend' && <Text style={{color: '#231f20', fontWeight: 'bold', fontSize: 17, marginTop: -10}}>Point deducted: </Text>}
              <Text style={{color: '#000', fontWeight: 'bold', fontSize: 20}}>{notificationItem.point}</Text>
          </View>
          <Text style={{color: '#878787', fontStyle: 'italic', marginBottom: 10}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
});


export default NotificationList

