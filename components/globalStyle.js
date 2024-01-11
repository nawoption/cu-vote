import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  bgImage: {
    width: '100%',
    height: 220,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  input: {
    borderBottomColor: '#fff',
    borderBottomWidth: 0.5,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#03A9F4',
    color: '#fff',
    fontSize: 18,
  },
  submitBtn: {
    width: '100%',
    height: 50,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#03A9F4',
    marginTop: 5,
  },
  closeBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#444',
    alignSelf: 'center',
    marginTop: 30,
  },
  imageCard: {
    width: 380,
    height: 250,
    marginBottom: 3,
    backgroundColor: '#ccc',
  },
  imageText: {
    fontSize: 16,
    alignSelf: 'center',
    color: '#fff',
    marginVertical: 8,
    fontWeight: 'bold',
  },
  imageContainer: {
    alignSelf: 'center',
    backgroundColor: '#03A9F4',
    marginVertical: 5,
    elevation: 5,
  },
  loadingCard: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
