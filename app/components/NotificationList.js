import React, { Component } from 'react';
import {
  View, Text, ListView, Image, StyleSheet
} from 'react-native';
import Routes from './../config/Routes';
import Images from '../assets/Images'


const NotificationItem = (props) => {
  const notification = props.item;


  return (
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
  )
}

const notificationData = [
  {
    title: 'Delay SIA from HCM to JKT',
    icon: Images.delay,
    description: 'SIA 298 Delay 30 mins VNA to JKT'
  },
  {
    title: '+5 Point SIA Happy birthday you',
    icon: Images.cake,
    description: 'Today is your birthday'
  },
  {
    title: '+10 Point from SIA Delay',
    icon: Images.coin,
    description: 'Sorry delaying ...'
  },
  {
    title: 'Spending on Sakura Changi',
    icon: Images.spending,
    description: 'Invoid number'
  }
];

const notificationDataWithDelay = [
  {
    title: '+100 Points Delay SIA from SIN to FCO',
    icon: Images.delay,
    description: 'SQ-366 Delay 90 mins SIN to FCO'
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
          renderRow={(rowData) => <NotificationItem item={rowData}/>}
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

