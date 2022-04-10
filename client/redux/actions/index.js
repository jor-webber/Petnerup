import { firestore } from '../../firebase/config';
import { doc, getDoc, getDocs, collection } from 'firebase/firestore';
import { auth } from '../../firebase/config';

export const fetchUser = () => {
  return (async (dispatch) => {
    const userCollection = doc(firestore, 'users', auth.currentUser.uid);
    const userDoc = await getDoc(userCollection);
    if(userDoc.exists()) {
      dispatch({
        type: 'FETCH_USER',
        currentUser: userDoc.data()
      });
    } else {
      console.log('User not found');
    }
  });
}

export const fetchAllUsers = () => {
  return (async (dispatch) => {
    const usersCollection = collection(firestore, 'users');
    const usersDocs = await getDocs(usersCollection);
    const users = usersDocs.docs.map((doc) => doc.data());
    dispatch({
      type: 'FETCH_ALL_USERS',
      allUsers: users
    });
  });
}

export const fetchAllPosts = () => {
  return (async (dispatch) => {
    const postsCollection = await getDocs(collection(firestore, 'posts'));
    const allPosts = [];
    console.log()
    postsCollection.docs.forEach((post) => {

      allPosts.push(post.data());
    });
    allPosts.reverse();
    dispatch({
      type: 'FETCH_POSTS',
      allPosts: allPosts
    });
  });
}

export const fetchCommunityPosts = () => {
  return (async (dispatch) => {
    const postsCollection = await getDocs(collection(firestore, 'posts'));
    const allPosts = [];
    console.log()
    postsCollection.docs.forEach((post) => {
      console.log(post.data());
      allPosts.push(post.data());
    });
    allPosts.reverse();
    dispatch({
      type: 'FETCH_POSTS',
      allPosts: allPosts
    });
  });
}
