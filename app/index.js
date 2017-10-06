import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Platform, View } from 'react-native';
import { createStore } from 'redux';

import Profile from './screens/Profile';
import Reward from './screens/Reward';
import FlightInfo from './screens/FlightInfo';
import FlightBooking from './screens/FlightBooking';

import reducers from './reducers';
import { StackNavigator } from 'react-navigation';
import Routes from './config/Routes';
const store = createStore(reducers);

const MainStackNavigator = StackNavigator({
  [Routes.Profile]: { screen: Profile },
  [Routes.Reward]: { screen: Reward },
  [Routes.FlightInfo]: { screen: FlightInfo },
  [Routes.FlightBooking]: { screen: FlightBooking },
}, {
  headerMode: 'none',
  cardStyle: { backgroundColor: 'white' },
});

export const AppStackNavigator = StackNavigator({
  [Routes.Main]: { screen: MainStackNavigator },
}, {
  initialRouteName: Routes.Main,
  headerMode: 'none',
  mode: 'modal',
});

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1,}}>
          <AppStackNavigator ref={navigator => this.navigator = navigator} />
        </View>
      </Provider>
    );
  }
}

export default App;
