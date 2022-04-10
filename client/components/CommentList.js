import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

const CommentList = () => {
  return (
    <View style={{ flexDirection: 'row', marginLeft: 5}}>
      <TouchableOpacity>
        <Ionicons name="ios-chatbox-outline" size={25} color="green" marginLeft='35' />
      </TouchableOpacity>
      <Text>Comments</Text>
    </View>
  );
};

export default CommentList;
