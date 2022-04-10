import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
	collection,
	doc,
	getDocs,
	setDoc,
	deleteDoc,
	serverTimestamp,
} from "firebase/firestore";
import { auth, firestore } from "../firebase/config";
import uuid from "react-uuid";

const PostInfo = (props) => {
	const [liked, setLiked] = useState(false);
	// const {userId} = props.route.params;
	const renderLikeIcon = () => {
		if (liked) {
			return (
				<TouchableOpacity onPress={async () => await unlikePost()}>
					<Ionicons name="heart" size={24} color="red" />
				</TouchableOpacity>
			);
		} else {
			return (
				<TouchableOpacity onPress={async () => await likePost()}>
					<Ionicons name="heart-outline" size={24} color="red" />
				</TouchableOpacity>
			);
		}
	};

	const likePost = async () => {
		const like = {
			id: uuid(),
			userId: auth.currentUser.uid,
			postId: props.postId,
			createdAt: serverTimestamp(),
		};
		await setDoc(doc(firestore, "likes", like.id), like);
		setLiked(true);
	};

	const unlikePost = async () => {
		const likes = await getDocs(collection(firestore, "likes"));
		likes.forEach(async (like) => {
			// console.log(like.data());
			if (
				like.data().userId === auth.currentUser.uid &&
				like.data().postId === props.postId
			) {
				await deleteDoc(doc(firestore, "likes", like.id));
				setLiked(false);
			}
		});
	};

	useEffect(async () => {
		const likes = await getDocs(collection(firestore, "likes"));
		likes.forEach((like) => {
			if (
				like.data().userId === auth.currentUser.uid &&
				like.data().postId === props.postId
			) {
				setLiked(true);
			}
		});
	}, [liked]);

	return (
		<View style={styles.detailContainer}>
			<View>
				<TouchableOpacity onPress={() => props.navigation.navigate('Other Profile', { userId: props.userId, firstName: props.firstName, lastName: props.lastName })}>
					<Text style={styles.username}>
						{props.firstName} {props.lastName}
					</Text>
				</TouchableOpacity>
				<Text style={styles.date}>
					{new Date(props.postedTime.seconds * 1000).toDateString()}
				</Text>
				<Text style={styles.description}>{props.caption}</Text>
			</View>
			<View>{renderLikeIcon()}</View>
		</View>
	);
};

const styles = StyleSheet.create({
	detailContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 10,
		marginHorizontal: 5,
	},
	username: {
		fontWeight: "bold",
		fontSize: 16,
	},
	date: {
		fontSize: 12,
		color: "#ccc",
	},
	likes: {
		fontSize: 12,
		color: "#ccc",
	},
	description: {
		fontSize: 14,
		marginTop: 5,
	},
});

export default PostInfo;
