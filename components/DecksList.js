import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, View } from 'react-native';
import styled from 'styled-components';
import { fetchDecks } from '../actions/decks'

const ListContainer = styled.FlatList`
  margin-top: 25;
`;

const DeckItemContainer = styled.TouchableOpacity`
  background-color: #fffeff;
  border-bottom-width: 1px;
  border-color: #ebe7eb;
  border-style: solid;
  flex-direction: row;
`;

const DeckLabel = styled.Text`
  flex: 1;
  font-size: 18;
  font-weight: 500;
  margin: 10px 0 10px 15px;
  padding: 5px;
`;

const DeckCards = styled.Text`
  color: #888;
  font-size: 18;
  margin: 10px 15px 10px 0;
  padding: 5px;
  text-align: right;
`;

class DecksList extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: (
        <Button title="Add" onPress={() => navigation.navigate('AddDeck')} />
      )
    }
  }

  componentDidMount() {
    this.props.dispatch(fetchDecks())
  }

  goToDeck(id) {
    const { navigation } = this.props;

    navigation.navigate('Deck', { id });
  }

  renderItem = ({ index, item }) => {
    return (
      <DeckItemContainer
        onPress={() => this.goToDeck(item.id)}
        style={{ borderTopWidth: index === 0 ? 1 : 0 }}
      >
        <DeckLabel>{item.title}</DeckLabel>
        <DeckCards>{item.cards.length}</DeckCards>
      </DeckItemContainer>
    )
  }

  render() {
    const { decks } = this.props;

    return (
      <View style={{ backgroundColor: '#f1eff2', flex: 1 }}>
        <ListContainer
          data={decks}
          keyExtractor={(deck) => deck.id}
          renderItem={this.renderItem}
          style={{ marginTop: 25 }}
        />
      </View>
    );
  }
}

function mapStateToProps({ decks }) {
  return {
    decks: Object.keys(decks).map((id) => ({
      id: id,
      ...decks[id],
    })),
  }
}

export default connect(mapStateToProps)(DecksList)
