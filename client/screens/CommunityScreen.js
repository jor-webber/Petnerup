import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import Colors from "../constants/colors";
import { bindActionCreators } from "redux";
import { fetchUser, fetchCommunityPosts } from "../redux/actions/index";
import Post from "../components/Post";
import { connect } from "react-redux";
import SearchBar from '../components/SearchBar';

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({ fetchUser, fetchCommunityPosts }, dispatch);
};

const mapStateToProps = (state) => {
	return {
		currentUser: state.users.currentUser,
		communityPosts: state.posts.communityPosts,
	};
};

const HomeScreen = (props) => {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(async () => {
		props.fetchUser().then(() => setCurrentUser(props.currentUser));
		props.fetchCommunityPosts().then(() => setCommunityPosts(props.posts));
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
			<ScrollView>
				<View>
					<SearchBar />
					<Text style={styles.title}>
						Welcome {props.currentUser?.firstName}{" "}
						{props.currentUser?.lastName}
					</Text>
					{props.posts &&
						props.posts.map((post) => <Post post={post} />)}
				</View>
			</ScrollView>
		);
	}
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#eee",
		alignItems: "center",
		justifyContent: "center",
		flex: 1,
		width: "100%",
	},
	navBar: {
		overflow: "hidden",
		width: "100%",
	},
	menuImage: {
		width: 50,
		height: 50,
	},
	postBoxContainer: {
		margin: 10,
		width: "100%",
		alignContent: "center",
		alignItems: "center",
		minHeight: 50,
	},
	menuBtn: {
		width: "60%",
		borderRadius: 25,
		height: 50,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: Colors.btnBackgroundColor,
		color: "white",
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
