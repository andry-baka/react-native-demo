import React, { Component } from 'react';
import {
  View, Text, ListView, Image, StyleSheet
} from 'react-native';
import Routes from './../config/Routes';


const HistoryItem = (props) => {
  const icon  = props.item.status === 'done' ? require(`../assets/icons/coin-icon.png`) : require(`../assets/icons/spend-icon.png`)
  return (
    <View style={{flexDirection: 'row', borderBottomColor: '#878787', borderBottomWidth: 1, padding: 20, justifyContent: 'space-between'}}>
      <Image 
        source={icon}
        style= {{
          width: 61 * 0.6,
          height: 61 * 0.6,
          resizeMode: 'contain'
        }}
      />
      <View style={{paddingLeft: 10}}>
        <Text style={{fontWeight: 'bold', color: '#231f20', fontStyle: 'italic'}}>Spending on Sakuara Restaurent</Text>
        <Text style={{fontSize: 12}}>07 Oct . Invoice number 09283</Text>
      </View>
      <Text style={ props.item.status === 'done' ? styles.pointStatusDone : styles.pointStatus}>
        {props.item.status !== 'done' ? props.item.point : `+ ${props.item.point} `}
      </Text>
    </View>
  )
}

class HistoryList extends Component {
  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([
        {
          status: 'done',
          point: 10
        },
        {
          status: 'pending',
          point: 30
        },
        {
          status: 'pending',
          point: 10
        },
        {
          status: 'done',
          point: 50
        },
        {
          status: 'done',
          point: 10
        },
        {
          status: 'pending',
          point: 30
        },
        {
          status: 'pending',
          point: 10
        },
        {
          status: 'done',
          point: 50
        }
      ]),
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

