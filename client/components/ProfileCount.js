import React from "react";
import {
	StyleSheet,
	View,
	Text,
} from "react-native";
import Colors from "../constants/colors";

const ProfileCount = (props) => {
	return (
		<View style={styles.main}>
			<Text style={styles.type}>{props.type}</Text>
			<Text style={styles.count}>{props.count}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
    main: {
        marginRight: 5,
		marginLeft: 5
    },
	type: {
		fontSize: 13,
        fontWeight: "bold",
        textAlign: "center",
	},
    count: {
        fontSize: 15,
        fontWeight: "bold",
        textAlign: "center",
        color: Colors.btnBackgroundColor,
    }
});

export default ProfileCount;
