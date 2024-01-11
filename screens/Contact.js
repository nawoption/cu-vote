import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
  Alert,
  Modal,
  TouchableHighlight,
  TextInput,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import {globalStyles} from '../components/globalStyle';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackActions} from '@react-navigation/native';

export default function Contact({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState('');

  const confirmLogout = () => {
    Alert.alert('UCSMTLA Online Voting', 'Do you want to logout?', [
      {
        text: 'Cancel',
        onPress: () => {
          console.log('User canceled');
        },
      },
      {
        text: 'OK',
        onPress: () => {
          logout();
        },
      },
    ]);
  };
  const logout = async () => {
    await AsyncStorage.removeItem('votingid');
    navigation.dispatch(StackActions.replace('Login'));
  };
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  const handleLogin = () => {
    if (id == 'acac@2024' || id == 'teacher@hppm') {
      navigation.navigate('Result');
    } else {
      ToastAndroid.show('Access Dennied', ToastAndroid.SHORT);
    }
    toggleModal();
  };
  return (
    <View style={globalStyles.container}>
      <Modal
        animationType={'slide'}
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <View
            style={{
              height: 400,
              justifyContent: 'center',
              backgroundColor: '#fff',
              paddingHorizontal: 20,
            }}>
            <Text style={styles.adminText}>Admin Dashboard</Text>
            <TextInput
              placeholder="Enter Admin ID"
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
            <TouchableHighlight
              style={globalStyles.closeBtn}
              onPress={() => toggleModal()}>
              <Text style={{color: '#fff'}}>X</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
      <View style={{marginTop: 20}}>
        <TouchableOpacity onPress={toggleModal} style={styles.row}>
          <FontAwesome name="dashboard" color="#03A9F4" size={30} />
          <Text style={styles.title}>Admin Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}} style={styles.row}>
          <FontAwesome name="telegram" color="#03A9F4" size={30} />
          <Text style={styles.title}>Telegram</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL('https://kyaw-thet-khaing.vercel.app/')
          }
          style={styles.row}>
          <FontAwesome name="user" color="#03A9F4" size={30} />
          <Text style={styles.title}>Contact Developer</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Policy');
          }}
          style={styles.row}>
          <FontAwesome name="expeditedssl" color="#03A9F4" size={22} />
          <Text style={styles.title}>Policy</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => confirmLogout()} style={styles.row}>
          <MaterialIcons name="logout" color="#03A9F4" size={30} />
          <Text style={styles.title}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  row: {
    width: '90%',
    height: 70,
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 5,
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: '#444',
  },
  title: {
    marginLeft: 20,
    fontSize: 20,
    color: '#222',
  },
  loginBtn: {
    justifyContent: 'center',
    height: 50,
    width: 130,
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: '#2196F3',
    alignSelf: 'center',
    marginTop: 10,
  },

  loginText: {
    fontSize: 20,
    marginBottom: 10,
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  adminText: {
    fontSize: 20,
    alignSelf: 'center',
    color: '#000',
  },
});
