const BASE_URL = 'https://cu-vote-d3335-default-rtdb.firebaseio.com';
import database from '@react-native-firebase/database';

export const getData = async route => {
  const response = await fetch(BASE_URL + route);
  const resData = response.json();
  return resData;
};

export const updateData = async (route, data) => {
  await database()
    .ref(route)
    .update(data)
    .then(() => console.log('Data updated.'));
    return true;
};
