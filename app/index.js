import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { View } from 'react-native';
import { createStore } from 'redux';

// screens
import Profile from './screens/Profile';
import Reward from './screens/Reward';
import FlightInfo from './screens/FlightInfo';
import FlightBooking from './screens/FlightBooking';
import HistoryPoint from './screens/HistoryPoint';
import NotificationPage from './screens/NotificationPage';
import Payment from './screens/Payment';

// components
import Notification from './components/Notification';

import PushNotificationUtils from './utils/PushNotificationUtils';
import reducers from './reducers';
import { StackNavigator } from 'react-navigation';
import Routes from './config/Routes';
const store = createStore(reducers);

const MainStackNavigator = StackNavigator({
  [Routes.Profile]: { screen: Profile },
  [Routes.NotificationPage]: {screen: NotificationPage},
  [Routes.HistoryPoint]: { screen: HistoryPoint },
  [Routes.Reward]: { screen: Reward },
  [Routes.FlightInfo]: { screen: FlightInfo },
  [Routes.FlightBooking]: { screen: FlightBooking },
  [Routes.Payment]: { screen: Payment }
}, {
  headerMode: 'none',
  cardStyle: { backgroundColor: 'white' },
  initialRouteName: Routes.Profile
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
