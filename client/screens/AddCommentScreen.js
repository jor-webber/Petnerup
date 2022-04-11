import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { auth, firestore } from '../firebase/config';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import uuid from 'react-uuid';
import { connect } from 'react-redux';
import { fetchUser, fetchAllPosts } from '../redux/actions/index';
import { bindActionCreators } from 'redux';


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ fetchUser, fetchAllPosts }, dispatch);
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.users.currentUser,
  };
};

const AddCommentScreen = (props) => {
  const [comment, setComment] = useState('');

  const handleCommentSubmit = () => {
    const { post } = props.route.params;
    if(comment.length <= 0) {
      alert('Please enter a comment');
      return;
    }
    const postComment = {
      id: uuid(),
      postId: post.id,
      content: comment,
      userId: auth.currentUser.uid,
      firstName: props.currentUser.firstName,
      lastName: props.currentUser.lastName,
      createdAt: serverTimestamp(),
    }
    setDoc(doc(firestore, 'comments', postComment.id), postComment);
    setComment('');
    props.navigation.navigate('Single Post', { post });
  }

  useEffect((async () => {
    await props.fetchUser(auth.currentUser.uid);
  }), [])

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Add Comment:</Text>
        <TextInput style={styles.textInput} onChangeText={(e) => setComment(e)}/>
        <TouchableOpacity style={styles.button} onPress={handleCommentSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'green'
  },
  textInput: {
    width: 300,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  button: {
    alignSelf: 'center',
    backgroundColor: 'green',
    padding: 10,
    marginTop: 10,
    width: 100,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    padding: 7,
    fontSize: 20,
    fontWeight: 'bold',
   
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AddCommentScreen);
