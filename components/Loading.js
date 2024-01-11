import {View, Text, Image, ActivityIndicator} from 'react-native';
import React from 'react';
import {globalStyles} from './globalStyle';

export default function Loading() {
  return (
    <View style={globalStyles.loadingCard}>
      <ActivityIndicator size="large" color="#fff" style={{backgroundColor:'#03A9F4',padding:30,borderRadius:3}} />
    </View>
  );
}
