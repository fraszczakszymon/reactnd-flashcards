import { generateUID } from '../utils/helpers';

export const ADD_DECK = 'decks/ADD_DECK';
export const REMOVE_DECK = 'decks/REMOVE_DECK';
export const FETCH_DECKS = 'decks/FETCH_DECKS';
export const RETRIEVE_DECKS = 'decks/RETRIEVE_DECKS';

export const ADD_CARD = 'decks/ADD_CARD';

export function addDeck(title) {
  return {
    type: ADD_DECK,
    id: generateUID(),
    title,
  }
}

export function removeDeck(id) {
  return {
    type: REMOVE_DECK,
    id,
  }
}

export function fetchDecks() {
  return {
    type: FETCH_DECKS,
  }
}

export function retrieveDecks(decks) {
  return {
    type: RETRIEVE_DECKS,
    decks,
  }
}

export function addCard(deckId, question, answer) {
  return {
    type: ADD_CARD,
    deckId,
    card: {
      question,
      answer,
    }
  }
}
