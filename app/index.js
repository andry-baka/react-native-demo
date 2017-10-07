import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Platform, View } from 'react-native';
import { createStore } from 'redux';

// screens
import Profile from './screens/Profile';
import Reward from './screens/Reward';
import FlightInfo from './screens/FlightInfo';
import FlightBooking from './screens/FlightBooking';
import HistoryPoint from './screens/HistoryPoint';
import NotificationPage from './screens/NotificationPage';

// components
import Notification from './components/Notification';

import PushNotificationUtils from './utils/PushNotificationUtils';
import reducers from './reducers';
import { StackNavigator } from 'react-navigation';
import Routes from './config/Routes';
const store = createStore(reducers);

const MainStackNavigator = StackNavigator({
  [Routes.NotificationPage]: {screen: NotificationPage},
  [Routes.HistoryPoint]: { screen: HistoryPoint },
  [Routes.Profile]: { screen: Profile },
  [Routes.Reward]: { screen: Reward },
  [Routes.FlightInfo]: { screen: FlightInfo },
  [Routes.FlightBooking]: { screen: FlightBooking }
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
  componentDidMount() {
    PushNotificationUtils.init(store);
  }

  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1,}}>
          <AppStackNavigator ref={navigator => this.navigator = navigator} />
          <Notification />
        </View>
      </Provider>
    );
  }
}

export default App;
