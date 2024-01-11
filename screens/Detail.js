import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ToastAndroid,
  Alert,
  ImageBackground,
  Modal,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getData, updateData} from '../components/api';
import Loading from '../components/Loading';
import ImageViewer from 'react-native-image-zoom-viewer';
import * as Animatable from 'react-native-animatable';
import {globalStyles} from '../components/globalStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Detail(props) {
  const post = props.route.params.post;
  const type = props.route.params.type;
  const [images, setImages] = useState([]);
  const [urlImages, setUrlImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [vid, setVid] = useState(null);

  useEffect(() => {
    fetchImages();
    getVotingid();
  }, []);
  const getVotingid = async () => {
    const vid = await AsyncStorage.getItem('votingid');
    setVid(vid);
    checkVoted(`/votingid/${vid}.json`);
  };
  const fetchImages = async () => {
    setLoading(true);
    const selectionId = post.selectionid;
    const route = `/selection.json?orderBy="selectionid"&equalTo="${selectionId}"`;
    const resData = await getData(route);
    for (const key in resData) {
      const imageList = resData[key].images;
      setImages(imageList);
      setLoading(false);
    }
  };

  const checkVoted = async (route, position) => {
    const resData = await getData(route);
    if (resData[position] === '') {
      return false;
    } else {
      return true;
    }
  };
  const handleVote = async position => {
    var data = {};
    const voted = await checkVoted(`/votingid/${vid}.json`, position);
    if (voted) {
      ToastAndroid.show(`Already Voted ${position}`, ToastAndroid.SHORT);
    } else {
      Alert.alert('UCSMTLA Online Voting', 'Do you want to vote?', [
        {
          text: 'Cancel',
          onPress: () => {
            console.log('User canceled');
          },
        },
        {
          text: 'OK',
          onPress: async () => {
            setLoading(true);
            data[position] = post.selectionid;
            const resData = await updateData(`/votingid/${vid}`, data);
            ToastAndroid.show(
              `Voted ${position} to ${post.name}`,
              ToastAndroid.SHORT,
            );
            setLoading(false);
            console.log(resData);
          },
        },
      ]);
    }
  };
  const Card = ({item, index}) => {
    var duration = 1000 * index;
    return (
      <Animatable.View
        animation="zoomIn"
        duration={duration}
        style={styles.imageContainer}>
        <TouchableHighlight
          onPress={() => {
            toggleModal();
            setUrlImages([{url: item}]);
          }}>
          <Image source={{uri: item}} style={styles.imageCard} />
        </TouchableHighlight>
      </Animatable.View>
    );
  };
  const VoteButtton = ({title, name}) => {
    return (
      <TouchableOpacity
        onPress={() => handleVote(name)}
        style={styles.submitBtn}>
        <Text style={styles.voteText}>{title}</Text>
      </TouchableOpacity>
    );
  };
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  if (loading) return <Loading />;
  return (
    <View style={globalStyles.container}>
      <ScrollView>
        <Modal
          onRequestClose={toggleModal}
          animationType={'slide'}
          transparent={false}
          visible={modalVisible}>
          <View style={{flex: 1}}>
            <ImageViewer imageUrls={urlImages} style={styles.imageViewer} />
            <TouchableHighlight
              style={globalStyles.closeBtn}
              onPress={() => toggleModal()}>
              <Text style={styles.text}>X</Text>
            </TouchableHighlight>
          </View>
        </Modal>
        <ImageBackground
          style={styles.bgImage}
          source={require('../components/images/uni.jpg')}>
          <TouchableOpacity
            style={{
              width: 300,
              height: 150,
              marginTop: 100,
              marginLeft: 15,
            }}
            onPress={() => {
              toggleModal();
              setUrlImages([{url: post.image}]);
            }}>
            <Animatable.View animation="slideInDown" duration={2000}>
              <Image source={{uri: post.image}} style={styles.slideDownImage} />
              <Text style={styles.name}>{post.name}</Text>
            </Animatable.View>
          </TouchableOpacity>
        </ImageBackground>

        <FlatList
          data={images}
          renderItem={({item, index}) => <Card item={item} index={index} />}
          keyExtractor={(i, k) => k.toString()}
          horizontal={true}
        />
        {type == 'male' ? (
          <View>
            <VoteButtton title="Vote King" name="king" />
            <VoteButtton title="Vote Mister" name="mister" />
            <VoteButtton title="Vote Prince" name="prince" />
          </View>
        ) : (
          <View>
            <VoteButtton title="Vote Queen" name="queen" />
            <VoteButtton title="Vote Miss" name="miss" />
            <VoteButtton title="Vote Princess" name="princess" />
          </View>
        )}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  imageCard: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  imageContainer: {
    marginHorizontal: 6,
    borderRadius: 4,
    width: 200,
    height: 300,
    marginTop: 70,
    paddingHorizontal: 5,
    backgroundColor: '#fff',
  },
  submitBtn: {
    width: '90%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#03A9F4',
    marginVertical: 5,
    borderRadius: 5,
    alignSelf: 'center',
  },
  voteText: {color: '#fff', fontSize: 18, width: '100%', textAlign: 'center'},
  slideDownImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#222',
    borderColor: '#03A9F4',
    borderWidth: 3,
  },
  name: {
    color: '#0288D1',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 5,
  },
  text: {
    color: '#fff',
    fontSize: 18,
  },
  bgImage: {
    width: '100%',
    height: 220,
    alignSelf: 'center',
  },
  imageViewer: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    backgroundColor: '#bbb',
  },
});
