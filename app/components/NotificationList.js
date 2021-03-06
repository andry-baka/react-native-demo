import React, { Component } from 'react';
import {
  View, Text, ListView, Image, StyleSheet, TouchableOpacity
} from 'react-native';
import Routes from './../config/Routes';
import Images from '../assets/Images'


const NotificationItem = (props) => {
  const notification = props.item;
  const { navigate } = props.navigation;

  return (
    <TouchableOpacity onPress={() => {
      navigate(Routes.NotificationDetailPage, { notificationItem: notification})
    }} >
      <View style={{flexDirection: 'row', borderBottomColor: '#eaeaea', borderBottomWidth: 1, padding: 15 , flex: 1}}>
        <View>
          <Image 
            source={notification.icon}
            style= {{
              width: 61 * 0.8,
              height: 61 * 0.8,
              resizeMode: 'contain'
            }}
          />
        </View>
        <View style={{paddingLeft: 10, flex: 1}}>
          <Text style={{fontWeight: 'bold', color: '#231f20', fontStyle: 'italic'}}>{notification.title}</Text>
          <View style={{flexDirection: 'row', flex: 1, paddingTop: 5}}>
            <Text style={{fontSize: 13, flex: 1, color: '#878787', fontWeight: 'bold'}}>{notification.description}</Text>
            <Text style={{
              fontSize: 12,
              minWidth: 60,
              color: '#878787',
              fontWeight: 'bold',
              textAlign: 'right'}}>8 Oct 2017</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const notificationData = [
  {
    title: '+50 Point SIA Happy birthday you',
    icon: Images.cake,
    icon2x: Images.cake2x,
    description: 'Today is your birthday',
    point: 50,
    type: 'coin',
    birthday: true,
    date: '08 Oct 2017'
  },
  {
    title: '+10 Point from SIA Delay',
    icon: Images.coin,
    icon2x: Images.coin2x,
    description: 'Sorry delaying ...',
    point: 10,
    type: 'coin',
    date: '03 July 2017'
  },
  {
    title: 'Spending on Sakura Changi',
    icon: Images.spending,
    icon2x: Images.spending2x,
    description: 'Invoice number',
    point: 30,
    type: 'spend',
    date: '14 Feb 2017'
  }
];

const notificationDataWithDelay = [
  {
    title: '+100 Points Delay SIA from SIN to FCO',
    icon: Images.delay,
    icon2x: Images.delay2x,
    description: 'SQ-366 Delay 90 mins SIN to FCO',
    type: 'coin',
    point: 100,
    date: '08 Oct 2017'
  },
  ...notificationData
];

class NotificationList extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const data = this.props.type === 'Delay' ? notificationDataWithDelay : notificationData;
    this.state = {
      dataSource: ds.cloneWithRows(data),
    };
  }

  render() {
    return (
      <View style={{marginVertical: 25, flex: 1}}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <NotificationItem item={rowData} navigation={this.props.navigation}/>}
          style={{
            backgroundColor: '#fff',
            borderRadius: 10,
            minWidth: 350,
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
});


export default NotificationList

