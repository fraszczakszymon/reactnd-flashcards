import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, View } from 'react-native';
import styled from 'styled-components';
import { addCard } from '../actions/decks';

const InputContainer = styled.View`
  background-color: #fffeff;
  border-color: #ebe7eb;
  border-bottom-width: 1px;
  border-style: solid;
  border-top-width: 1px;
  flex-direction: row;
  margin-top: 25px;
`;

const Label = styled.Text`
  font-size: 18;
  font-weight: 500;
  margin: 10px 25px 10px 15px;
  min-width: 90px;
  padding: 5px;
`;

const Input = styled.TextInput`
  font-size: 18;
  flex: 1;
  margin: 10px 15px;
  padding: 5px;
`;

class AddCard extends Component {
  static navigationOptions = ({ navigation }) => {
    const {params = {}} = navigation.state;

    return {
      headerLeft: (
        <Button title="Cancel" onPress={() => navigation.goBack()} />
      ),
      headerRight: (
        <Button title="Save" onPress={() => params.handleAdd()} />
      ),
    }
  }

  state = {
    answer: '',
    question: '',
  }

  componentDidMount() {
    this.props.navigation.setParams({
      handleAdd: () => this.handleAdd()
    });
  }

  handleAdd() {
    const { add, navigation } = this.props;
    const { answer, question } = this.state;
    const id = navigation.getParam('id');

    if (!question) {
      alert('Card question is required.');
    } else if (!answer) {
      alert('Card answer is required.');
    } else {
      add(id, question, answer);
      navigation.goBack();
    }
  }

  render() {
    return (
      <View style={{ backgroundColor: '#f1eff2', flex: 1 }}>
        <InputContainer>
          <Label>Question</Label>
          <Input
            onChangeText={(question) => this.setState({question})}
            value={this.state.question}
            placeholder="Required"
          />
        </InputContainer>
        <InputContainer style={{ borderTopWidth: 0, marginTop: 0 }}>
          <Label>Answer</Label>
          <Input
            onChangeText={(answer) => this.setState({answer})}
            value={this.state.answer}
            placeholder="Required"
          />
        </InputContainer>
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    add: (id, question, answer) => dispatch(addCard(id, question, answer)),
  }
}

export default connect(null, mapDispatchToProps)(AddCard);
