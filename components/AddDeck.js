import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, View } from 'react-native';
import styled from 'styled-components';
import { addDeck } from '../actions/decks';

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
  padding: 5px;
`;

const Input = styled.TextInput`
  font-size: 18;
  margin: 10px 15px;
  padding: 5px;
`;

class AddDeck extends Component {
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
    title: '',
  }

  componentDidMount() {
    this.props.navigation.setParams({
      handleAdd: () => this.handleAdd()
    });
  }

  handleAdd() {
    const { add, navigation } = this.props;
    const { title } = this.state;

    if (!title) {
      alert('Deck title is required.');
    } else {
      add(title)
        .then((action) => {
          navigation.goBack();
          navigation.navigate('Deck', { id: action.id });
        });
    }
  }

  render() {
    return (
      <View style={{ backgroundColor: '#f1eff2', flex: 1 }}>
        <InputContainer>
          <Label>Title</Label>
          <Input
            onChangeText={(text) => this.setState({title: text})}
            value={this.state.title}
            placeholder="Required"
          />
        </InputContainer>
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    add: (title) => dispatch(addDeck(title)),
  }
}

export default connect(null, mapDispatchToProps)(AddDeck);
