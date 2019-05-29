import React, { Component } from 'react';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { StatusBar, View } from 'react-native'
import { createAppContainer, createStackNavigator , createBottomTabNavigator } from 'react-navigation'
import { Constants } from 'expo';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import DecksList from './components/DecksList';
import AddDeck from './components/AddDeck';

function AppStatusBar({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const DasbhboardTabsNavigator = createBottomTabNavigator({
  DecksList: {
    screen: DecksList,
    navigationOptions: {
      tabBarLabel: 'Decks list',
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='cards-outline' size={30} color={tintColor} />,
    },
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add new deck',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-add' size={30} color={tintColor} />,
    },
  },
});

const AppNavigator = createStackNavigator({
  Decks: {
    screen: DasbhboardTabsNavigator,
    navigationOptions: () => ({
      title: 'Decks',
    }),
  },
});

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <AppContainer />
      </Provider>
    );
  }
}
