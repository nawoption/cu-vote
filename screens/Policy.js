import {StyleSheet, Text, View, ImageBackground, Image} from 'react-native';
import React from 'react';
import {globalStyles} from '../components/globalStyle';

export default function Policy() {
  return (
    <View style={globalStyles.container}>
      <View
        style={{
          paddingHorizontal: 15,
          marginTop: 50,
        }}>
        <Text style={styles.text}># Online voting will be closed at 4:00 PM(10-1-1024)</Text>
        <Text style={styles.text}>
          {
            '# You can vote a \n* King & Queen \n* Mister & Miss \n* Prince & Princess'
          }
        </Text>
        <Text style={styles.text}>
          # After voted , un-vote is not supported
        </Text>
        <Text style={styles.text}>#Please use VPN for google servies</Text>

        <Text style={styles.dev}>{'Developed By \n\n\t\t\t5CS-19'}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bgImage: {width: '100%', height: '100%'},
  text: {color: '#000', fontSize: 16, lineHeight: 50},
  dev: {color: '#000', fontWeight: 'bold', fontSize: 16, alignSelf: 'flex-end'},
});
