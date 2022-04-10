import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Colors from '../constants/colors';
import { bindActionCreators } from 'redux';
import { fetchUser, fetchAllPosts, fetchAllUsers } from '../redux/actions/index';
import Post from '../components/Post';
import { connect } from 'react-redux';
import SearchBar from '../components/SearchBar';

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchUser, fetchAllPosts, fetchAllUsers }, dispatch);
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.users.currentUser,
    allUsers: state.users.allUsers,
    posts: state.posts.allPosts,
  };
};

const CommunityScreen = (props) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(async () => {
    props.fetchUser();
    props.fetchAllPosts();
    props.fetchAllUsers();
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>No posts yet!</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <SearchBar navigation={props.navigation} showSearchBar={true} users={props.allUsers}/>
        <ScrollView style={styles.scrollView}>
          <View>
            {props.posts &&
              props.posts.map((post) =><Post post={post} key={post.id} navigation={props.navigation} route={props.route} /> )}
          </View>
        </ScrollView>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,

    borderBottomWidth:1,
    borderBottomColor:"black"  
  },
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: '100%',
    marginTop: 30,
  },
  navBar: {
    overflow: 'hidden',
    width: '100%',
  },
  scrollView: {
    width: '100%',
  },
  menuImage: {
    width: 50,
    height: 50,
  },
  postBoxContainer: {
    margin: 10,
    width: '100%',
    alignContent: 'center',
    alignItems: 'center',
    minHeight: 50,
  },
  menuBtn: {
    width: '60%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.btnBackgroundColor,
    color: 'white',
  },
  logo: {
    width: 50,
    height: 50,
  },
  menu: {
    width: 50,
    height: 50,
  },
  search: {
    width: 100,
    height: 50,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CommunityScreen);
