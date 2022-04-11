import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { storage, firestore, auth } from '../firebase/config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import uuid from 'react-uuid';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchAllPosts } from '../redux/actions/index';


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchAllPosts }, dispatch);
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.users.currentUser,
  };
};

const Save = (props) => {
  const [caption, setCaption] = useState('');

  const uploadImage = async () => {
    const uri = props.route.params.image;
    const childPath = `posts/${auth.currentUser.uid}/${uuid()}`;
    const response = await fetch(uri);
    const blob = await response.blob();
    const refe = ref(storage, childPath);
    const uploadTask = await uploadBytes(refe, blob);
    const downloadUrl = await getDownloadURL(refe);
    const post = {
      id: uuid(),
      image: downloadUrl,
      caption: caption,
      userId: auth.currentUser.uid,
      firstName: props.currentUser.firstName,
      lastName: props.currentUser.lastName,
      createdAt: serverTimestamp(),
    };
    await setDoc(doc(firestore, 'posts', post.id), post);
    props.fetchAllPosts();
    props.navigation.navigate('Home');
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: props.route.params.image }}
          style={{ flex: 1, height: 300, width: 300 }}
        />
      </View>
      <View style={styles.captionContainer}>

      <TextInput
        placeholder='Write a caption...'
        onChangeText={(caption) => setCaption(caption)}
        style={styles.captionInput}
        textAlignVertical='top'
        textBreakStrategy='simple'
        multiline={true}
      />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => uploadImage()}>
          <Text style={styles.buttonText}>Save Post</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
  },
  captionContainer: {
  },
  captionInput: {
    width: '95%',
    height: 150,
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 5,
    padding: 5,
    margin: 10,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 150,
    backgroundColor: 'green',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Save);
