import React, { Component } from 'react';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { createAppContainer, createStackNavigator , createBottomTabNavigator } from 'react-navigation'
import AddCard from './components/AddCard';
import AddDeck from './components/AddDeck';
import Deck from './components/Deck';
import DecksList from './components/DecksList';
import middleware from './middleware';

const AppNavigator = createStackNavigator({
  Decks: {
    screen: DecksList,
    navigationOptions: () => ({
      title: 'Decks',
    }),
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: () => ({
      title: 'Add new card',
    }),
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: () => ({
      title: 'Add new deck',
    }),
  },
  Deck: {
    screen: Deck,
  },
});

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  compons

  render() {
    return (
      <Provider store={createStore(reducer, middleware)}>
        <AppContainer />
      </Provider>
    );
  }
}
