import React, { Component } from 'react';
import {
  View, Text, ListView, Image, StyleSheet
} from 'react-native';
import Routes from './../config/Routes';


const HistoryItem = (props) => {
  let icon = '';
  if (props.item.type === 'coin') {
    icon = require(`../assets/icons/coin-icon.png`);
  } else if (props.item.type === 'spend') {
    icon = require(`../assets/icons/spend-icon.png`);
  } else if (props.item.type === 'delay') {
    icon = require(`../assets/icons/megaphone-icon.png`);
  };

  return (
    <View style={{flexDirection: 'row', borderBottomColor: '#eaeaea', borderBottomWidth: 1, padding: 20, justifyContent: 'space-between'}}>
      <Image 
        source={icon}
        style= {{
          width: 61 * 0.6,
          height: 61 * 0.6,
          resizeMode: 'contain'
        }}
      />
      <View style={{paddingLeft: 10}}>
        <Text style={{fontWeight: 'bold', color: '#231f20', fontStyle: 'italic'}}>{props.item.title}</Text>
        <Text style={{fontSize: 12}}>{props.item.description}</Text>
      </View>
      <Text style={ props.item.status === 'done' ? styles.pointStatusDone : styles.pointStatus}>
        {props.item.status !== 'done' ? props.item.point : `+ ${props.item.point} `}
      </Text>
    </View>
  )
}

const historyData = [
  {
    status: 'done',
    type: 'coin',
    point: 10,
    title: 'Flying with Singapore Airlines   ',
    description: '01 July: SQ-122 CGK to SIN'
  },
  {
    status: 'pending',
    type: 'spend',
    point: 30,
    title: 'Spending on Sakura Restaurant',
    description: '08 Oct: Invoice number 09283'
  },
  {
    status: 'pending',
    type: 'spend',
    point: 10,
    title: 'Spending on Sakura Restaurant',
    description: '08 Oct: Invoice number 09283'
  },
  {
    status: 'done',
    type: 'coin',
    point: 50,
    title: 'Flying with Singapore Airlines   ',
    description: '21 Jun: SQ-35 CGK to SIN'
  },
  {
    status: 'done',
    type: 'coin',
    point: 10,
    title: 'Flying with Singapore Airlines   ',
    description: '4 Mar: SQ-35 CGK to SF'
  },
  {
    status: 'pending',
    type: 'spend',
    point: 30,
    title: 'Spending on Sakura Restaurant',
    description: '08 Oct: Invoice number 09283'
  },
  {
    status: 'pending',
    type: 'spend',
    point: 10,
    title: 'Spending on Sakura Restaurant',
    description: '08 Oct: Invoice number 09283'
  },
  {
    status: 'done',
    type: 'coin',
    point: 50,
    title: 'Flying with Singapore Airlines   ',
    description: '3 Feb: SQ-544 SIN to CGK'
  }
];

const historyDataWithDelay = [
  {
    status: 'done',
    type: 'delay',
    point: 100,
    title: 'Delay SIA from SIN to FCO',
    description: '08 Oct: SQ-366 Delay 90 mins SIN to FCO'
  },
  ...historyData
];

class HistoryList extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    console.log('this.props: ', this.props);
    const data = this.props.type === 'Delay' ? historyDataWithDelay : historyData;
    this.state = {
      dataSource: ds.cloneWithRows(data),
    };
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData) => <HistoryItem item={rowData}/>}
        style={{
          marginBottom: 30
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  pointStatusDone: {
    paddingLeft: 10,
    fontSize: 17,
    fontWeight: 'bold',
    color: '#fea000',
    minWidth: 60,
    textAlign: 'right'
  },
  pointStatus: {
    paddingLeft: 10,
    fontSize: 17,
    fontWeight: 'bold',
    minWidth: 60,
    textAlign: 'right'
  },
});


export default HistoryList

