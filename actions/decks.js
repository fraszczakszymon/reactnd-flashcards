export const ADD_DECK = 'decks/ADD_DECK';
export const REMOVE_DECK = 'decks/REMOVE_DECK';
export const RETRIEVE_DECKS = 'decks/RETRIEVE_DECKS';

export const ADD_CARD = 'decks/ADD_CARD';

export function addDeck(title) {
  return {
    type: ADD_DECK,
    id: 'todo',
    title,
  }
}

export function removeDeck(id) {
  return {
    type: REMOVE_DECK,
    id,
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
