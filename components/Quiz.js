import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import styled from 'styled-components';
import { clearLocalNotification, setLocalNotification } from '../utils/helpers';

const Status = styled.Text`
  font-size: 16;
  margin: 20px;
`;

const Card = styled.View`
  align-items: center;
  border-radius: 4px;
  background: #fff;
  flex: 1;
  justify-content: center;
  padding: 20px;
  margin: 0 20px 20px 20px;
`;

const CardText = styled.Text`
  font-size: 20;
  margin: 20px;
  text-align: center;
`;

const CardToggle = styled.TouchableOpacity`
  margin-bottom: 80px;
  text-align: center;
`;

const ToggleText = styled.Text`
  color: #0077f8;
  font-size: 18;
  text-align: center;
`;

const GreenButton = styled.TouchableOpacity`
  background: #44db5e;
  border-radius: 4px;
  margin: 10px 20px;
  padding: 15px;
`;

const GreenButtonText = styled.Text`
  color: #065b14;
  text-align: center;
  font-size: 18;
`;

const RedButton = styled.TouchableOpacity`
  background: #ff3824;
  border-radius: 4px;
  margin: 10px 20px;
  padding: 15px;
`;

const RedButtonText = styled.Text`
  color: #fff;
  text-align: center;
  font-size: 18;
`;

const BlueButton = styled.TouchableOpacity`
  background: #0077f8;
  border-radius: 4px;
  margin: 80px 20px 0 20px;
  padding: 15px;
`;

const BlueButtonText = styled.Text`
  color: #fff;
  text-align: center;
  font-size: 18;
`;

const Score = styled.Text`
  font-size: 80;
  font-weight: 700;
  margin: 80px 20px 0 20px;
  text-align: center;
`;

const ScoreDescription = styled.Text`
  color: #888;
  font-size: 16;
  text-align: center;
`;

class Quiz extends Component {
  state = {
    correct: 0,
    showAnswer: false,
    question: 1,
  }

  onAnswer(score) {
    this.setState(() => ({
      correct: this.state.correct + score,
      showAnswer: false,
      question: this.state.question + 1,
    }));
  }

  onRestart() {
    this.setState(() => ({
      correct: 0,
      showAnswer: false,
      question: 1,
    }));
  }

  onToggleAnswer() {
    this.setState(() => ({
      showAnswer: !this.state.showAnswer,
    }));
  }

  render() {
    const { deck } = this.props;
    const { correct, showAnswer, question } = this.state;
    const numberOfCards = deck.cards.length;

    if (!deck) {
      return (
        <View style={{ backgroundColor: '#f1eff2', flex: 1 }}></View>
      )
    }

    if (question > numberOfCards) {
      clearLocalNotification().then(setLocalNotification)

      return (
        <View style={{ backgroundColor: '#f1eff2', flex: 1 }}>
          <Score>{Math.round(100 * correct / numberOfCards)}%</Score>
          <ScoreDescription>Your score</ScoreDescription>
          <BlueButton onPress={() => this.onRestart()}>
            <BlueButtonText>Restart a quiz</BlueButtonText>
          </BlueButton>
        </View>
      );
    }

    return (
      <View style={{ backgroundColor: '#f1eff2', flex: 1 }}>
        <Status>Question {question}/{numberOfCards}</Status>
        <Card>
          <CardText>{showAnswer ? deck.cards[question - 1].answer : deck.cards[question - 1].question}</CardText>
        </Card>
        <CardToggle onPress={() => this.onToggleAnswer()}>
          <ToggleText>
            {showAnswer ? 'Show question' : 'Show answer'}
          </ToggleText>
        </CardToggle>
        <GreenButton onPress={() => this.onAnswer(1)}>
          <GreenButtonText>Correct</GreenButtonText>
        </GreenButton>
        <RedButton onPress={() => this.onAnswer(0)} style={{ marginBottom: 40 }}>
          <RedButtonText>Incorrect</RedButtonText>
        </RedButton>
      </View>
    );
  }
}

function mapStateToProps({ decks }, { navigation }) {
  const id = navigation.getParam('id');
console.log(id);
  return {
    deck: decks[id],
    id,
  }
}

export default connect(mapStateToProps)(Quiz)
