import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  Linking,
  Animated,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {globalStyles} from '../components/globalStyle';
import {getData} from '../components/api';
import Loading from '../components/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MarqueeText from 'react-native-marquee';
import {StackActions} from '@react-navigation/native';
const data = [
  {id: '1', imageSource: require('../components/images/cu-mtla.jpg')},
  {id: '2', imageSource: require('../components/images/uni.jpg')},
  // Add more images as needed
];
export default function Login({navigation}) {
  const [id, setId] = useState(null);
  const [votingIds, setVotingIds] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    isAuth();
  }, []);
  const fetchVoting = async () => {
    try {
      setLoading(true);
      const resData = await getData('/votingid.json');
      const votingArray = [];
      for (const key in resData) {
        votingArray.push(resData[key]);
      }
      setVotingIds(votingArray);
    } catch (error) {
      console.error('Error fetching voting data:', error);
      // Handle error (e.g., show an error message)
    } finally {
      setLoading(false);
    }
  };
  const isAuth = async () => {
    const vid = await AsyncStorage.getItem('votingid');
    if (vid) navigateScreen();
    else fetchVoting();
  };
  const navigateScreen = () => {
    navigation.dispatch(StackActions.replace('MyTabs'));
  };
  const checkId = async () => {
    const foundVotingId = votingIds.find(item => item.votingid === id);
    if (foundVotingId) {
      await AsyncStorage.setItem('votingid', id);
      navigateScreen();
    } else {
      Alert.alert('Invalid Voting ID', 'The voting ID is not valid.');
    }
  };
  const handleLogin = () => {
    checkId();
  };
  if (loading) return <Loading />;
  return (
    <View style={globalStyles.container}>
      <View style={{paddingVertical: 5, marginTop: 5}}>
        <Image
          source={require('../components/images/uni.jpg')}
          style={styles.uniImage}
        />
        <MarqueeText
          style={{fontSize: 24, color: '#0288D1'}}
          speed={0.4}
          marqueeOnStart={true}
          loop={true}
          delay={1000}>
          {' '}
          ကွန်ပျူတာတက္ကသိုလ်မိတ္ထီလာ မောင်မယ်သစ်လွင်ကြိုဆိုပွဲ။
          မောင်မယ်သစ်လွင်များကို နွေးထွေးစွာ ကြိုဆိုပါ၏။ Fresher Welcome Online
          Voting System
        </MarqueeText>
      </View>
      <View style={{marginTop: 30, marginHorizontal: 20}}>
        <TextInput
          placeholder="Enter Voting ID"
          placeholderTextColor="#fff"
          value={id}
          onChangeText={inputid => setId(inputid)}
          style={globalStyles.input}
        />
        <TouchableOpacity
          onPress={() => handleLogin()}
          style={globalStyles.submitBtn}>
          <Text style={{color: '#fff', fontSize: 18}}>Submit</Text>
        </TouchableOpacity>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => navigation.navigate('Policy')}>
            <Text style={styles.policyText}>Online Voting Policy</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.policyText}>Join Telegram</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  policyText: {
    color: '#0288D1',
  },
  resultText: {
    alignSelf: 'center',
    marginTop: 33,
    color: '#0288D1',
    fontSize: 20,
  },
  uniImage: {
    width: '90%',
    height: 250,
    alignSelf: 'center',
    marginBottom: 5,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
});
