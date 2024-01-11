import React, {useEffect, useState} from 'react';
import {View, FlatList} from 'react-native';
import {globalStyles} from '../components/globalStyle';
import {getData} from '../components/api';
import Loading from '../components/Loading';
import SelectionCard from '../components/SelectionCard';

export default function King({navigation}) {
  const [posts, setPosts] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const postArray = [];
    const resData = await getData(
      '/students.json?orderBy="type"&equalTo="male"',
    );
    for (const key in resData) {
      postArray.push(resData[key]);
    }
    setPosts(postArray);
    setLoading(false);
  };

  if (loading == true) {
    return <Loading />;
  }
  return (
    <View style={globalStyles.container}>
      <FlatList
        data={posts}
        renderItem={({item}) => (
          <SelectionCard item={item} navigation={navigation} type="male" />
        )}
        keyExtractor={(i, k) => k.toString()}
        refreshing={loading}
        onRefresh={() => fetchPosts()}
      />
    </View>
  );
}
