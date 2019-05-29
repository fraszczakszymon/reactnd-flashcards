import React, { Component } from 'react';
import { FlatList, TouchableOpacity, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components';

class DecksList extends Component {
  render() {
    return (
      <View>
        <TouchableOpacity>
          <Text>
            Add new deck <Ionicons name='ios-bookmarks' size={30} />
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default DecksList
