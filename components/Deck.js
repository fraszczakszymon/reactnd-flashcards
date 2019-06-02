import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Text, View } from 'react-native';
import styled from 'styled-components';

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
  padding: 20px;
`;

const ButtonText = styled.Text`
  color: #fff;
  text-align: center;
  font-size: 18;
`;

class DecksList extends Component {
  static navigationOptions = ({ navigation }) => {
    const {params = {}} = navigation.state;

    return {
      headerRight: (
        <Button title="Add question" onPress={() => params.navigateToAddQuestion()} />
      )
    }
  }

  componentDidMount() {
    const { deck, navigation } = this.props;

    navigation.setParams({
      navigateToAddQuestion: () => navigation.navigate('AddQuestion', {
        id: deck.id,
      }),
    });
  }

  startQuiz = () => {
    const { deck, navigation } = this.props;

    navigation.navigate('Quiz', {
      id: deck.id,
    });
  }

  render() {
    const { deck } = this.props;

    return (
      <View style={{ backgroundColor: '#f1eff2', flex: 1 }}>
        <Title>{deck.title}</Title>
        <Description>{deck.cards.length} {deck.cards.length === 1 ? 'question' : 'questions'}</Description>
        <BlueButton onPress={this.startQuiz}>
          <ButtonText>Start a quiz</ButtonText>
        </BlueButton>
      </View>
    );
  }
}

function mapStateToProps({ decks }, { navigation }) {
  const id = navigation.getParam('id');

  return {
    deck: decks[id],
  }

}

export default connect(mapStateToProps)(DecksList)
