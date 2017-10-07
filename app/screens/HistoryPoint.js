import React, { Component, PureComponent } from 'react';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import {
  View, Text, Button, StyleSheet
} from 'react-native';

import Routes from './../config/Routes';
import HistoryPointListComponent from '../components/HistoryPointList'


const FirstRoute = () => (
  <View style={[ styles.container, { backgroundColor: '#fff' } ]}>
    <HistoryPointListComponent/>
  </View>
)
const SecondRoute = () => <View style={[ styles.container, { backgroundColor: '#673ab7' } ]} />;

class HistoryPoint extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    index: 0,
    routes: [
      { key: '1', title: 'Point History' },
      { key: '2', title: 'Partnerhip' },
    ],
  };

  _handleIndexChange = index => this.setState({ index });

  _renderHeader = props => <TabBar {...props} />;

  _renderScene = SceneMap({
    '1': FirstRoute,
    '2': SecondRoute,
  });

  render() {
    return (
      <TabViewAnimated
        style={styles.container}
        navigationState={this.state}
        renderScene={this._renderScene}
        renderHeader={this._renderHeader}
        onIndexChange={this._handleIndexChange}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBarStyle: {
    backgroundColor: '#000'
  }
});


export default HistoryPoint

