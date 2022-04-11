import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Colors from '../constants/colors';
import ProfileCount from '../components/ProfileCount';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Post from '../components/Post';
import { fetchUser, fetchAllPosts } from '../redux/actions/index';
import SearchBar from '../components/SearchBar';
import { Ionicons } from '@expo/vector-icons';
import { collection, setDoc, getDocs, doc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { auth, firestore } from '../firebase/config';
import uuid from 'react-uuid';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchUser, fetchAllPosts }, dispatch);
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.users.currentUser,
    posts: state.posts.allPosts,
  };
};

const OtherProfileScreen = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { firstName, lastName, userId } = props.route.params;
  const [userPosts, setUserPosts] = useState([]);
  const [following, setFollowing] = useState(false);
  const [followers, setFollowers] = useState(false);
  const [followingCount, setFollowingCount] = useState(0);
  const [followersCount, setFollowersCount] = useState(0);

  const segmentClicked = (index) => {
    setActiveIndex(index);
    console.log(index);
  };

  const onFollowButtonPress = async () => {
    if (following) {
      const followingCollection = collection(firestore, 'following');
      const followingDocs = await getDocs(followingCollection);
      const followingDoc = followingDocs.docs.find((doc) => doc.data().userId === auth.currentUser.uid && doc.data().followingId === userId);
      await deleteDoc(doc(followingCollection, followingDoc.id));
      setFollowing(false);
      setFollowersCount(followersCount - 1);
    } else {
      const following = {
        id: uuid(),
        userId: props.currentUser.id,
        followingId: userId,
        createdAt: serverTimestamp(),
      };
      await setDoc(doc(firestore, 'following', following.id), following);
      setFollowing(true);
      setFollowersCount(followersCount + 1);
    }
  }

  const renderSection = () => {
    if (activeIndex === 0) {
      return (
        <View style={styles.smallPosts}>
          <View style={styles.posts}>
            <FlatList
              data={userPosts}
              numColumns={3}
              horizontal={false}
              keyExtractor={(item, index) => {
                return item.id;
              }}
              style={styles.imageFlatList}
              renderItem={({ item }) => {
                return (
                  <View style={styles.imageFlatListView}>
                    <TouchableOpacity
                      onPress={() =>
                        props.navigation.navigate('Single Post', { post: item })
                      }
                    >
                      <Image
                        source={{ uri: item.image }}
                        style={styles.imageFlatListImage}
                      />
                    </TouchableOpacity>
                  </View>
                );
              }}
            ></FlatList>
          </View>
        </View>
      );
    }
    if (activeIndex === 1) {
      return (
        <FlatList
          data={userPosts}
          numColumns={1}
          horizontal={false}
          keyExtractor={(item, index) => {
            return item.id;
          }}
          style={styles.imageFlatList}
          renderItem={({ item }) => {
            return (
              <Post post={item} id={item.id} navigation={props.navigation} />
            );
          }}
        ></FlatList>
      );
    }
  };

  useEffect((async () => {
    const posts = props.posts.filter((post) => post.userId === userId);
    const followersDocs = await getDocs(collection(firestore, 'following'));
    console.log(followersDocs);
    let followersCount = 0;
    let followingCount = 0;
    followersDocs.docs.forEach((doc) => {
      console.log(doc.data());
      if (doc.data().followingId === userId) {
        followersCount++;
      }
      if(doc.data().userId === auth.currentUser.uid && doc.data().followingId === userId) {
        setFollowing(true);
      }
      if(doc.data().userId === userId) {
        followingCount++;
      }
    });
    console.log(followersCount);
    setFollowersCount(followersCount);
    setFollowingCount(followingCount);
    setUserPosts(posts);
  }), []);
  return (
    <View style={styles.container}>
      <SearchBar navigation={props.navigation} showSearchBar={false} />
      <View style={styles.scroll}>
        <View style={styles.mainDiv}>
          <Text style={styles.name}>
            {firstName} {lastName}
          </Text>
          <View style={styles.profileBox}>
            {/* Profile Picture will go in this image box*/}
            <Image
              style={styles.profilePic}
              source={require('../assets/favicon.png')}
            />
            <View>
              <View style={styles.informationSection}>
                <ProfileCount type='Following' count={followingCount} />
                <ProfileCount type='Followers' count={followersCount} />
                <ProfileCount type='Family' count={0} />
                <ProfileCount type='Pets' count={0} />
              </View>
            </View>
          </View>
          <View>
            {following ? (
              <TouchableOpacity style={styles.followButton} onPress={onFollowButtonPress}>
                <Text style={styles.followButtonText}>Following</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.followButton} onPress={onFollowButtonPress}>
                <Text style={styles.followButtonText}>Follow</Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.posts}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                borderTopWidth: 1,
                borderTopColor: '#eae5e5',
                borderBottomWidth: 1,
                borderBottomColor: '#eae5e5',
                marginTop: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => segmentClicked(0)}
                // active={() => setActiveIndex((activeIndex = 0))}
                style={{
                  ...styles.button,
                  ...{
                    color: activeIndex == 0 ? '' : 'grey',
                  },
                }}
              >
                <Ionicons name='grid-outline' size={24} color='black' />
              </TouchableOpacity>

              <TouchableOpacity
                title='Full Post View'
                onPress={() => segmentClicked(1)}
                // active={() => setActiveIndex((activeIndex = 0))}
                style={{
                  ...styles.button,
                  ...{
                    color: activeIndex == 1 ? '' : 'grey',
                  },
                }}
              >
                <Ionicons name='list' size={28} color='black' />
              </TouchableOpacity>
            </View>
          </View>
          {renderSection()}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  editProfileButton: {
    borderRadius: 10,
    marginTop: 5,
    marginLeft: 15,
  },
  editProfileText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#6D6A75',
  },
  button: {
    padding: 10,
  },
  container: {
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: '100%',
    marginTop: 30,
  },
  mainDiv: {
    backgroundColor: 'white',
    flex: 1,
    padding: 10,
  },
  profilePic: {
    height: 80,
    width: 80,
    backgroundColor: Colors.inputBackgroundColor,
    borderRadius: 50,
  },
  informationSection: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  profileBox: {
    flexDirection: 'row',
    // alignItems: "flex-start",
    justifyContent: 'space-around',
  },
  name: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  scroll: {
    flex: 1,
    backgroundColor: 'white',
    width: '100%',
  },
  imageFlatListView: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  imageFlatListImage: {
    width: 115,
    height: 115,
    marginBottom: 2,
    alignSelf: 'flex-start',
  },
  posts: {
    marginLeft: 10,
    marginRight: 10,
  },
  followButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  followButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(OtherProfileScreen);
