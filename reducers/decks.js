import { ADD_DECK, REMOVE_DECK, ADD_CARD } from '../actions/decks';

export default function decks(state = {}, action) {
  switch (action.type) {
    case ADD_DECK:
      return {
        ...state,
        [action.id]: {
          title: action.title,
          cards: [],
        },
      };
    case REMOVE_DECK:
      return state;
    case ADD_CARD:
      return {
        ...state,
        [action.deckId]: {
          ...state[action.deckId],
          cards: [
            ...state[action.deckId].cards,
            action.card,
          ],
        },
      };
    default:
      return state;
  }
}
