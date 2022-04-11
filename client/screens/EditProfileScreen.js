import React, { useState } from "react";
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	SafeAreaView,
	TextInput,
} from "react-native";
import Colors from "../constants/colors";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUser, fetchAllPosts } from "../redux/actions/index";
import { auth, firestore } from "../firebase/config";
import { doc, updateDoc, getDocs, collection } from "firebase/firestore";
import colors from "../constants/colors";
const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({ fetchUser, fetchAllPosts }, dispatch);
};

const mapStateToProps = (state) => {
	return {
		currentUser: state.users.currentUser,
		posts: state.posts.allPosts.filter(
			(post) => post.userId === auth.currentUser.uid
		),
	};
};

const EditProfileScreen = (props) => {
	const userFirstName = props.currentUser?.firstName;
	const userLastName = props.currentUser?.lastName;
	// update the state with the new value
	const [firstName, setFirstName] = useState(userFirstName);
	const [lastName, setLastName] = useState(userLastName);

	const onSubmit = async () => {
		const docRef = doc(firestore, "users", auth.currentUser.uid);
		await updateDoc(docRef, { firstName: firstName, lastName: lastName });
    const postDocs = await getDocs(collection(firestore, 'posts'));
    postDocs.docs.forEach((document) => {
      if (document.data().userId === auth.currentUser.uid) {
        let docuRef = doc(firestore, 'posts', document.id);
        updateDoc(docuRef, { firstName: firstName, lastName: lastName });
      }
    });
		props.fetchUser();
    props.fetchAllPosts();
    props.navigation.navigate('Profile');
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.headerText}>Edit Profile</Text>
			</View>
			<View style={styles.body}>
				<SafeAreaView style={styles.textBoxContainer}>
					<Text style={styles.textInputDescription}>First Name</Text>
					<TextInput
						style={styles.textInput}
						placeholder={props.currentUser?.firstName}
						placeholderTextColor={Colors.placeholderColor}
						onChangeText={(name) => setFirstName(name)}
					/>
				</SafeAreaView>
				<SafeAreaView style={styles.textBoxContainer}>
					<Text style={styles.textInputDescription}>Last Name</Text>
					<TextInput
						style={styles.textInput}
						placeholder={props.currentUser?.lastName}
						placeholderTextColor={Colors.placeholderColor}
						onChangeText={(name) => setLastName(name)}
					/>
				</SafeAreaView>
			</View>
			<View style={styles.submitContainer}>
				<TouchableOpacity
					onPress={onSubmit}
					style={styles.submitButton}
				>
					<Text style={styles.submitButtonText}>Submit</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
	},
	header: {
		width: "100%",
		height: "10%",
		backgroundColor: Colors.primary,
		alignItems: "center",
		justifyContent: "center",
	},
	headerText: {
		color: "black",
		fontSize: 20,
	},
	body: {
		width: "70%",
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	textBoxContainer: {
		margin: 10,
		width: "100%",
		alignContent: "center",
		alignItems: "center",
		minHeight: 50,
	},
	textInput: {
		height: 40,
		backgroundColor: Colors.inputBackgroundColor,
		borderColor: Colors.inputBackgroundColor,
		borderRadius: 20,
		width: "100%",
		paddingLeft: 10,
	},
	textInputDescription: {
		alignSelf: "flex-start",
		fontSize: 16,
		marginLeft: 10,
	},
	submitContainer: {
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
		margin: 20,
	},
	submitButton: {},
	submitButtonText: {
		fontSize: 20,
		color: colors.btnBackgroundColor,
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileScreen);
