import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ScrollView,
  Modal,
  Image,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getData} from '../components/api';
import {globalStyles} from '../components/globalStyle';
import Loading from '../components/Loading';
const Card = ({item, fetchSelection}) => {
  const displayId = item.selection > 10 ? item.selection - 10 : item.selection;
  return (
    <View style={styles.row}>
      <TouchableOpacity onPress={() => fetchSelection(item.selection)}>
        <Text style={styles.title}>Selection: {displayId}</Text>
        <Text style={styles.title}>Points: {item.count}</Text>
      </TouchableOpacity>
    </View>
  );
};
export default function Result() {
  const [posts, setPosts] = useState({});
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selection, setSelection] = useState({});

  useEffect(() => {
    fetchPosts();
  }, []);
  const fetchPosts = async () => {
    setLoading(true);
    const votingData = await getData('/votingid.json');
    const result = {};
    // Iterate through votingData
    for (const votingId in votingData) {
      const roles = votingData[votingId];

      for (const role in roles) {
        if (role !== 'votingid' && roles[role] !== '') {
          if (!result[role]) {
            result[role] = [];
          }

          const existingSelection = result[role].find(
            item => item.selection === roles[role],
          );

          if (existingSelection) {
            existingSelection.count++;
          } else {
            result[role].push({selection: roles[role], count: 1});
          }
        }
      }
    }
    for (const role in result) {
      result[role].sort((a, b) => b.count - a.count);
    }
    setPosts(result);
    setLoading(false);
  };
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  const fetchSelection = async sid => {
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
    <ScrollView style={globalStyles.container}>
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
      <TouchableOpacity onPress={fetchPosts} style={styles.refreshBtn}>
        <Text style={styles.refreshText}>Refresh</Text>
      </TouchableOpacity>
      <View style={styles.titleResultBg}>
        <Text style={styles.titleResult}>King</Text>
      </View>
      <FlatList
        data={posts.king}
        renderItem={({item}) => (
          <Card item={item} fetchSelection={fetchSelection} />
        )}
        keyExtractor={(k, v) => v.toString()}
        horizontal={true}
      />
      <View style={styles.titleResultBg}>
        <Text style={styles.titleResult}>Queen </Text>
      </View>
      <FlatList
        data={posts.queen}
        renderItem={({item}) => (
          <Card item={item} fetchSelection={fetchSelection} />
        )}
        keyExtractor={(k, v) => v.toString()}
        horizontal={true}
      />
      <View style={styles.titleResultBg}>
        <Text style={styles.titleResult}> Mister</Text>
      </View>
      <FlatList
        data={posts.mister}
        renderItem={({item}) => (
          <Card item={item} fetchSelection={fetchSelection} />
        )}
        keyExtractor={(k, v) => v.toString()}
        horizontal={true}
      />
      <View style={styles.titleResultBg}>
        <Text style={styles.titleResult}>Miss</Text>
      </View>
      <FlatList
        data={posts.miss}
        renderItem={({item}) => (
          <Card item={item} fetchSelection={fetchSelection} />
        )}
        keyExtractor={(k, v) => v.toString()}
        horizontal={true}
      />
      <View style={styles.titleResultBg}>
        <Text style={styles.titleResult}>Prince </Text>
      </View>
      <FlatList
        data={posts.prince}
        renderItem={({item}) => (
          <Card item={item} fetchSelection={fetchSelection} />
        )}
        keyExtractor={(k, v) => v.toString()}
        horizontal={true}
      />
      <View style={styles.titleResultBg}>
        <Text style={styles.titleResult}>Princess </Text>
      </View>
      <FlatList
        data={posts.princess}
        renderItem={({item}) => (
          <Card item={item} fetchSelection={fetchSelection} />
        )}
        keyExtractor={(k, v) => v.toString()}
        horizontal={true}
      />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  title: {fontSize: 16, color: '#000', marginBottom: 10},
  row: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    backgroundColor: '#fff',
    width: 170,
    height: 100,
    borderRadius: 5,
  },
  titleResult: {
    fontSize: 22,
    color: '#0288D1',
    marginLeft: 10,
  },
  titleResultBg: {},
  selectionImage: {
    width: 350,
    height: 270,
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
  refreshBtn: {
    width: 100,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#03A9F4',
    margin: 15,
    borderRadius: 5,
  },
  refreshText: {
    color: '#fff',
    fontSize: 16,
  },
});
