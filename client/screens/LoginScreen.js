import React, { useState } from "react";
import {
	StyleSheet,
	View,
	Text,
	TextInput,
	Image,
	TouchableOpacity,
	SafeAreaView,
} from "react-native";
import Colors from "../constants/colors";
import { auth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginScreen = ({ navigation }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

  const SignInUser = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigation.replace("Home");
      })
      .catch((error) => {
        alert(error);
      });
  }

	return (
		<View style={styles.container}>
			<SafeAreaView style={styles.inputView}>
				<SafeAreaView style={styles.textBoxContainer}>
					<Image
						style={styles.image}
						source={require("../assets/logo.png")}
					/>
				</SafeAreaView>

				<SafeAreaView style={styles.textBoxContainer}>
					<TextInput
						style={styles.textInput}
						placeholder="Enter your Email"
						placeholderTextColor={Colors.placeholderColor}
						onChangeText={(email) => setEmail(email)}
					/>
				</SafeAreaView>

				<SafeAreaView style={styles.textBoxContainer}>
					<TextInput
						style={styles.textInput}
						placeholder="Password"
						placeholderTextColor={Colors.placeholderColor}
						secureTextEntry={true}
						onChangeText={(password) => setPassword(password)}
					/>
				</SafeAreaView>

				<SafeAreaView style={styles.textBoxContainer}>
					<TouchableOpacity>
						<Text style={styles.forgot_button}>
							Forgot Password?
						</Text>
					</TouchableOpacity>
				</SafeAreaView>

				<SafeAreaView style={styles.textBoxContainer}>
					<TouchableOpacity 
            style={styles.loginBtn}
            onPress={SignInUser}>
						<Text style={styles.loginText}>LOGIN</Text>
					</TouchableOpacity>
				</SafeAreaView>

				<SafeAreaView style={styles.textBoxContainer}>
					<TouchableOpacity
						style={styles.loginBtn}
						onPress={() => navigation.navigate("Register")}
					>
						<Text style={styles.loginText}>REGISTER</Text>
					</TouchableOpacity>
				</SafeAreaView>
			</SafeAreaView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "white",
		alignItems: "center",
		justifyContent: "center",
		flex: 1,
	},
	textBoxContainer: {
		margin: 10,
		width: "100%",
		alignContent: "center",
		alignItems: "center",
	},

	image: {
		margin: 20,
	},

	inputView: {
		width: "70%",
		alignItems: "center",
	},

	textInput: {
		height: 40,
		backgroundColor: Colors.inputBackgroundColor,
		borderColor: Colors.inputBackgroundColor,
		borderRadius: 20,
		textAlign: "center",
		width: "100%",
	},
  
	loginBtn: {
		width: "60%",
		borderRadius: 25,
		height: 50,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: Colors.btnBackgroundColor,
		color: "white",
	},
});

export default LoginScreen;
