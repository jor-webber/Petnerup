import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
  query,
  collection,
  where,
  getDocs,
  deleteDoc,
  doc,
  serverTimestamp,
  setDoc,
  onSnapshot,
} from 'firebase/firestore';
import uuid from 'react-uuid';
import { firestore, auth } from '../firebase/config';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchAllPosts } from '../redux/actions/index';

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchAllPosts }, dispatch);
};

const SinglePostScreen = ({ navigation, route, fetchAllPosts }) => {
  const { post } = route.params;
  const [comments, setComments] = useState([]);
  const [liked, setLiked] = useState(false);

  const getComments = async () => {
    const q = query(
      collection(firestore, 'comments'),
      where('postId', '==', post.id)
    );
    const commentDocs = await getDocs(q);
    const comments = commentDocs.docs.map((doc) => doc.data());
    comments.sort((a, b) => a.createdAt.seconds - b.createdAt.seconds);
    setComments(comments);
  };

  const renderLikeIcon = () => {
    if (liked) {
      return (
        <TouchableOpacity onPress={async () => await unlikePost()}>
          <Ionicons name='heart' size={40} color='red' />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity onPress={async () => await likePost()}>
          <Ionicons name='heart-outline' size={40} color='red' />
        </TouchableOpacity>
      );
    }
  };

  const deletePost = async () => {
    await deleteDoc(doc(firestore, 'posts', post.id));
    fetchAllPosts();
    navigation.goBack();
  };

  const likePost = async () => {
    const like = {
      id: uuid(),
      userId: auth.currentUser.uid,
      postId: post.id,
      createdAt: serverTimestamp(),
    };
    await setDoc(doc(firestore, 'likes', like.id), like);
    setLiked(true);
  };

  const unlikePost = async () => {
    const likes = await getDocs(collection(firestore, 'likes'));
    likes.forEach(async (like) => {
      console.log(like.data());
      if (
        like.data().userId === auth.currentUser.uid &&
        like.data().postId === post.id
      ) {
        await deleteDoc(doc(firestore, 'likes', like.id));
        setLiked(false);
      }
    });
  };

  useEffect(async () => {
    await getComments();
    const likes = await getDocs(collection(firestore, 'likes'));
    likes.forEach((like) => {
      if (
        like.data().userId === auth.currentUser.uid &&
        like.data().postId === post.id
      ) {
        setLiked(true);
      }
    });
  }, [liked]);

  return (
    <View style={{ flex: 1 }}>
      <Image source={{ uri: post?.image }} style={styles.image} />
      <Text style={styles.username}>
        {post?.firstName} {post?.lastName}
      </Text>
      <Text style={styles.createdTime}>
        {new Date(post.createdAt.seconds * 1000).toDateString()}
      </Text>
      <Text style={styles.content}>{post?.caption}</Text>
      <View>
        <View style={styles.likeAndComment}>
          {renderLikeIcon()}
          <TouchableOpacity
            onPress={() => navigation.navigate('Add Comment', { post })}
          >
            <Ionicons name='ios-chatbubbles' size={40} color='green' />
          </TouchableOpacity>

          {post.userId === auth.currentUser.uid ? (
            <TouchableOpacity onPress={async () => await deletePost()}>
              <Ionicons name='ios-trash' size={40} color='red' />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <ScrollView
          ontentInsetAdjustmentBehavior='automatic'
          scrollEnabled={true}
          style={{ flex: 1 }}
        >
          {comments.map((comment) => (
            <TouchableOpacity  key={comment.id} onPress={() => navigation.navigate('Other Profile', { userId: comment.userId, firstName: comment.firstName, lastName: comment.lastName})}>
              <View style={styles.commentContainer}>
                <Text style={styles.commentUsername}>
                  {comment.firstName} {comment.lastName}
                </Text>
                <Text style={styles.commentCreatedTime}>
                  {new Date(comment.createdAt.seconds * 1000).toDateString()}{' '}
                  {new Date(
                    comment.createdAt.seconds * 1000
                  ).toLocaleTimeString()}
                </Text>
                <Text style={styles.commentContent}>{comment.content}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    // Without height undefined it won't work
    height: 300,
    // figure out your image aspect ratio
    aspectRatio: 1,
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: 'black',
    marginBottom: 10,
    borderWidth: 2.5,
    borderColor: 'green',
  },
  username: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  content: {
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  createdTime: {
    fontSize: 12,
    textAlign: 'center',
    color: '#ccc',
  },
  likeAndComment: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  commentContainer: {
    marginVertical: 10,
    marginHorizontal: 15,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 15,
    backgroundColor: 'green',
    width: '90%',
    borderRadius: 10,
    height: 100,
  },
  commentUsername: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#ccc',
  },
  commentContent: {
    fontSize: 20,
    color: '#ccc',
    fontWeight: 'bold',
  },
  commentCreatedTime: {
    fontSize: 12,
    color: '#ccc',
  },
});

export default connect(null, mapDispatchToProps)(SinglePostScreen);
