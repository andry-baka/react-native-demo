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
            textAlign: 'right'}}>7 Oct 2017</Text>
        </View>
      </View>
    </View>
  )
}

class NotificationList extends Component {
  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([
        {
          title: 'Delay SIA from HCM to JKT',
          icon: Images.delay,
          icon2x: Images.delay2x,
          description: 'SIA 298 Deplay 30 mins VNA to JKT'
        },
        {
          title: '+5 Point SIA Happy birthday you',
          icon: Images.cake,
          icon2x: Images.cake2x,
          description: 'Today is your birthday'
        },
        {
          title: '+10 Point from SIA Delaying',
          icon: Images.coin,
          icon2x: Images.coin2x,
          description: 'Sorry delaying ...'
        },
        {
          title: 'Spending on Sakura Changi',
          icon: Images.spending,
          icon2x: Images.spending2x,
          description: 'Invoid number'
        }
      ]),
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

