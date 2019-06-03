import { AsyncStorage } from 'react-native';
import { ADD_CARD, ADD_DECK, REMOVE_DECK, FETCH_DECKS, retrieveDecks } from '../actions/decks';

const STORAGE_KEY = '@FlashCards:decks';

const storege = (store) => (next) => (action) => {
  const result = next(action);
  const { decks } = store.getState();

  switch (action.type) {
    case ADD_CARD:
    case ADD_DECK:
    case REMOVE_DECK:
      return AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(decks))
        .then(() => result);
    case FETCH_DECKS:
      return AsyncStorage.getItem(STORAGE_KEY)
        .then((result) => JSON.parse(result))
        .then((decks) => store.dispatch(retrieveDecks(decks)));
    default:
      return result;
  }
}

export default storege;
