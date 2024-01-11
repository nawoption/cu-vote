import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {globalStyles} from './globalStyle';

export default function SelectionCard({item, navigation,type}) {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Detail', {post: item, type: type})}
      style={globalStyles.imageContainer}>
      <Text style={globalStyles.imageText}>{item.name}</Text>
      <Image source={{uri: item.image}} style={globalStyles.imageCard} />
    </TouchableOpacity>
  );
}
