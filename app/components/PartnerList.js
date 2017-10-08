import React, { Component } from 'react';
import {
  View, Text, ListView, Image, StyleSheet, Dimensions
} from 'react-native';
import Routes from './../config/Routes';

import ImageStatic from '../assets/Images.js';

const { width, height } = Dimensions.get('window');

const PartnerItem = (props) => {
  const partner = props.item;
  return (
    <View style={{width: width/2}}>
      <Image 
        source={partner.partnerPhoto}
        style= {{
          width: width/2,
          height: width/2,
          resizeMode: 'cover'
        }}
      />
      <View 
        style={{
          paddingLeft: 5,
          position: 'absolute',
          backgroundColor: 'rgba(51, 51, 51, 0.6)',
          width: width/2,
          height: 40,
          top: width/2 - 40,
          justifyContent: 'center'
        }}>
        <Text style={{fontSize: 14, fontWeight: 'bold', color: '#fff', paddingHorizontal: 10, fontStyle: 'italic'}}>{partner.name}</Text>
      </View>
    </View>
  )
}

class PartnerList extends Component {
  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([
        {
          name: 'Sushi Hiro',
          partnerPhoto: ImageStatic.partner[1].img
        },
        {
          name: 'King Mango Thai',
          partnerPhoto: ImageStatic.partner[2].img
        },
        {
          name: 'Eatlah',
          partnerPhoto: ImageStatic.partner[3].img
        },
        {
          name: 'Sushi Tea',
          partnerPhoto: ImageStatic.partner[4].img
        },
        {
          name: 'Kintan Buffet',
          partnerPhoto: ImageStatic.partner[0].img
        },
          {
              name: 'Sushi Hiro',
              partnerPhoto: ImageStatic.partner[1].img
          }
      ]),
    };
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData) => <PartnerItem item={rowData}/>}
        contentContainerStyle={{
          flexDirection: 'row',
          flexWrap: 'wrap'
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


export default PartnerList

