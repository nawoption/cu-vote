import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Image,
  TouchableHighlight,
  ToastAndroid,
  AppState
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getData} from '../components/api';
import {globalStyles} from '../components/globalStyle';
import Loading from '../components/Loading';

const Card = ({item, fetchSelection}) => {
  const sid = item.selectionId != '' ? item.selectionId : '❤️';
  const displayId = sid>10?sid-10:sid;
  return (
    <TouchableOpacity style={styles.card} onPress={() => fetchSelection(sid)}>
      <Text style={styles.title}>{item.title} selection No.</Text>
      <Text style={styles.id}>{displayId}</Text>
    </TouchableOpacity>
  );
};
export default function Voted() {
  const [voting, setVoting] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selection, setSelection] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getVotingid();
    const appStateChangeHandler = nextAppState => {
      if (nextAppState === 'active') {
        // App is coming to the foreground
        getVotingid();
      }
    };

    // Subscribe to app state changes
    AppState.addEventListener('change', appStateChangeHandler);

    return () => {
      AppState.removeEventListener('change', appStateChangeHandler);
    };
  }, []);

  const getVotingid = async () => {
    setLoading(true);
    const vid = await AsyncStorage.getItem('votingid');
    const resData = await getData(`/votingid/${vid}.json`);
    const votingArray = Object.entries(resData)
      .filter(([key, value]) => key !== 'votingid')
      .map(([key, value]) => ({title: key, selectionId: value}));

    setVoting(votingArray);
    setLoading(false);
  };
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  const fetchSelection = async sid => {
    if (sid == '❤️') {
      ToastAndroid.show('Please vote favourite', ToastAndroid.SHORT);
      return true;
    }
    const resData = await getData(
      `/students.json?orderBy="selectionid"&equalTo=${sid}`,
    );
    for (const key in resData) {
      setSelection(resData[key]);
      toggleModal();
    }
  };
  if (loading) return <Loading />;
  return (
    <View style={globalStyles.container}>
      <Modal
        onRequestClose={toggleModal}
        animationType={'slide'}
        transparent={true}
        visible={modalVisible}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <View
            style={{
              height: 400,
              justifyContent: 'center',
              backgroundColor: '#03A9F4',
            }}>
            <Text style={styles.selectionText}>Name : {selection.name}</Text>
            <Image
              source={{uri: selection.image}}
              style={styles.selectionImage}
            />
            <TouchableHighlight
              style={globalStyles.closeBtn}
              onPress={() => toggleModal()}>
              <Text style={{color: '#fff'}}>X</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
      <FlatList
        data={voting}
        renderItem={({item}) => (
          <Card item={item} fetchSelection={fetchSelection} />
        )}
        keyExtractor={(k, v) => v.toString()}
        numColumns={2}
        refreshing={loading}
        onRefresh={getVotingid}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  title: {fontSize: 16, color: '#000', marginTop: 20},
  card: {
    alignItems: 'center',
    margin: 10,
    backgroundColor: '#fff',
    width: '45%',
    height: 150,
    borderRadius: 8,
  },
  id: {
    fontSize: 30,
    color: '#03A9F4',
    fontWeight: 'bold',
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  selectionImage: {
    width: 350,
    height: 250,
    alignSelf: 'center',
    backgroundColor: '#ccc',
    borderRadius: 5,
  },
  selectionText: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 5,
    marginLeft: 25,
  },
});
