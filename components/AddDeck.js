import React, { Component } from 'react';
import { FlatList, TouchableOpacity, View, Text, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components';

const Input = styled.TextInput`
  border-color: #888;
  border-bottom-width: 1px;
  border-style: solid;
  padding: 10px;
  margin: 10px 20px;
`;

const Button = styled.TouchableOpacity`
  background: #007aff;
  border-radius: 4px;
  color: #fff;
  padding: 10px;
  text-align: center;
  width: 150px;
`;

class AddDeck extends Component {
  state = {
    question: '',
    answer: '',
  }

  render() {
    return (
      <View>
        <Input
          onChangeText={(text) => this.setState({question: text})}
          value={this.state.question}
          placeholder="Deck name"
        />
        <View>
          <Button>
            <Text style={{ color: '#fff', textAlign: 'center' }}>
              Add new deck
            </Text>
          </Button>
        </View>
      </View>
    );
  }
}

export default AddDeck
