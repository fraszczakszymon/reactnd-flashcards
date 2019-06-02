import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, View } from 'react-native';
import styled from 'styled-components';
import { removeDeck } from '../actions/decks'

const Title = styled.Text`
  font-size: 20;
  font-weight: 600;
  margin: 60px 20px 0 20px;
  text-align: center;
`;

const Description = styled.Text`
  font-size: 16;
  margin: 10px 0 60px 0;
  text-align: center;
`;

const BlueButton = styled.TouchableOpacity`
  background: #0077f8;
  border-radius: 4px;
  margin: 0 20px;
  padding: 15px;
`;

const BlueButtonText = styled.Text`
  color: #fff;
  text-align: center;
  font-size: 18;
`;

const RedButton = styled.TouchableOpacity`
  border-color: #f8272e;
  border-radius: 4px;
  border-width: 1px;
  margin: 0 20px;
  padding: 15px;
`;

const RedButtonText = styled.Text`
  color: #f8272e;
  text-align: center;
  font-size: 18;
`;

class DecksList extends Component {
  static navigationOptions = ({ navigation }) => {
    const {params = {}} = navigation.state;

    return {
      headerRight: (
        <Button title="Add card" onPress={() => params.navigateToAddCard()} />
      )
    }
  }

  componentDidMount() {
    const { id, navigation } = this.props;

    navigation.setParams({
      navigateToAddCard: () => navigation.navigate('AddCard', { id }),
    });
  }

  removeDeck() {
    const { id, dispatch, navigation } = this.props;

    dispatch(removeDeck(id));
    navigation.goBack();
  }

  startQuiz = () => {
    const { deck, navigation } = this.props;

    navigation.navigate('Quiz', {
      id: deck.id,
    });
  }

  render() {
    const { deck } = this.props;

    if (!deck) {
      return (
        <View style={{ backgroundColor: '#f1eff2', flex: 1 }}></View>
      )
    }

    return (
      <View style={{ backgroundColor: '#f1eff2', flex: 1 }}>
        <Title>{deck.title}</Title>
        <Description>{deck.cards.length} {deck.cards.length === 1 ? 'card' : 'cards'}</Description>
        <BlueButton
          onPress={this.startQuiz}
          disabled={!deck.cards.length}
          style={{ opacity: deck.cards.length ? 1 : 0.5 }}
        >
          <BlueButtonText>Start a quiz</BlueButtonText>
        </BlueButton>
        <RedButton onPress={() => this.removeDeck()} style={{ marginTop: 10 }}>
          <RedButtonText>Remove deck</RedButtonText>
        </RedButton>
      </View>
    );
  }
}

function mapStateToProps({ decks }, { navigation }) {
  const id = navigation.getParam('id');

  return {
    deck: decks[id],
    id,
  }

}

export default connect(mapStateToProps)(DecksList)
