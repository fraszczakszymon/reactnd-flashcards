import React, { Component } from 'react';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { createAppContainer, createStackNavigator , createBottomTabNavigator } from 'react-navigation'
import AddCard from './components/AddCard';
import AddDeck from './components/AddDeck';
import Deck from './components/Deck';
import DecksList from './components/DecksList';
import Quiz from './components/Quiz';
import middleware from './middleware';
import { setLocalNotification } from './utils/helpers';

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
  Quiz: {
    screen: Quiz,
    navigationOptions: () => ({
      title: 'Quiz',
    }),
  },
});

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  componentDidMount() {
    setLocalNotification();
  }

  render() {
    return (
      <Provider store={createStore(reducer, middleware)}>
        <AppContainer />
      </Provider>
    );
  }
}
