import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import PostInfo from "./PostInfo";
import PostImage from "./PostImage";
import CommentList from "./CommentList";

const Post = ({ post, navigation }) => {
	return (
		<View style={{ marginBottom: 20, backgroundColor: "white", marginTop: 10, borderBottomColor: "#6D6A75", borderBottomWidth: 0.5, paddingBottom: 10 }}>
			<View>
				<TouchableOpacity
					onPress={() => navigation.navigate("Single Post", { post })}
				>
					<PostImage image={post.image} />
				</TouchableOpacity>
				<PostInfo
					postId={post.id}
					caption={post.caption}
					firstName={post.firstName}
					lastName={post.lastName}
					postedTime={post.createdAt}
					userId={post.userId}
					navigation={navigation}
				/>
				<TouchableOpacity
					onPress={() => navigation.navigate("Single Post", { post })}
				>
					<CommentList />
				</TouchableOpacity>
			</View>
		</View>
	);
};



export default Post;
