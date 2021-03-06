import React, { Component, PureComponent } from 'react';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import {
  View, Text, Button, StyleSheet, TouchableOpacity, Image, Dimensions
} from 'react-native';

import Images from './../assets/Images';
const { width, height } = Dimensions.get('window');

import Routes from './../config/Routes';
import HistoryPointListComponent from '../components/HistoryPointList';
import PartnerList from '../components/PartnerList';

const FirstRoute = (props) => (
  <View style={[ styles.container, { backgroundColor: '#fff' } ]}>
    <HistoryPointListComponent
      type={props.route.flightStatus}
      qrcode={props.route.qrcode}
    />
  </View>
);

const SecondRoute = () => (
  <View style={[ styles.container, { backgroundColor: '#fff' } ]}>
    <PartnerList/>
  </View>
)

class HistoryPoint extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    index: 0,
    routes: [
      { key: '1', title: 'History',
        flightStatus: this.props.navigation.state.params.flightStatus,
        qrcode: this.props.navigation.state.params.qrcode,
      },
      { key: '2', title: 'Merchant' },
    ],
  };

  _handleIndexChange = index => this.setState({ index });

  _renderHeader = (props) => (
    <TabBar 
      {...props}
      style={{backgroundColor:'#231f20'}}
    />
  )

  _renderScene = SceneMap({
    '1': FirstRoute,
    '2': SecondRoute,
  });

  _renderHeaderHistory = () => {
  return (
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
          source={Images.backBlack}
          style={{
            width: 20,
            height: 20
          }}
        />
      </TouchableOpacity>
      <Text
        style={{
          color: '#231f20',
          fontSize: 20,
          fontWeight: '700'
        }}
      >
        Your Points
      </Text>
      <TouchableOpacity
      onPress={() => {
        this.props.navigation.navigate(Routes.QRcodeScanner, { flightStatus: this.state.flightStatus })
      }}
      style={{
        marginTop: -10
      }}
      >
        <Image
          source={Images.qrCode}
          style={{
            width: 42,
            height: 42
          }}
        />
      </TouchableOpacity>
    </View>
    )
  } 

  render() {
    const { historyPoint , flightStatus, qrcode } = this.props.navigation.state.params;
    console.log('params: ',this.props.navigation.state.params);
    console.log('qrcode: ',qrcode);
    return (
      <View style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff'
      }}>
        {this._renderHeaderHistory()}
        <View style={{
          marginTop: 20,
          width: 150,
          borderRadius: 10,
          backgroundColor: '#fea000',
          padding: 8,
          marginBottom: 50,
          flexDirection: 'row',
          justifyContent: 'center'
        }}>
          <Text style={{
            color: '#fff',
            fontWeight: '900',
              fontSize: 16
            }}>{historyPoint}
          </Text>
          <Text style={{
            color: '#fff',
              fontSize: 16
            }}> Pts
          </Text>
        </View>

        <View style={{flexDirection: 'row', paddingBottom: 20, justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={Images.award}
            style={{
              width: 20,
              height: 20
            }}
          />
          <Text style={{
              color: '#fea000',
              fontWeight: 'bold',
              textAlign: 'center'}}> Equal to 21.1 SGD
          </Text>
        </View>
        <View style={styles.container}>
          <TabViewAnimated
            style={styles.container}
            navigationState={this.state}
            renderScene={this._renderScene}
            renderHeader={this._renderHeader}
            onIndexChange={this._handleIndexChange}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  tabBarStyle: {
    backgroundColor: '#000'
  }
});


export default HistoryPoint

