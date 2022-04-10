import React from "react";
import {
	StyleSheet,
	View,
	TouchableOpacity,
	Text,
	FlatList,
} from "react-native";


const SearchResultsScreen = ({ navigation, route }) => {
	const { users } = route.params;

	const _renderItem = ({ item, index }) => {
		return (
			<TouchableOpacity onPress={()=> navigation.navigate("Other Profile",{userId: item.id, firstName:item.firstName, lastName:item.lastName})}>
				<View style={styles.container}>
					<Text>
						{item?.firstName} {item?.lastName}{" "}
					</Text>
				</View>
			</TouchableOpacity>
		);
	};

	return (
		<View>
			<FlatList data={users} renderItem={_renderItem} />
		</View>
	);
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "black",
    }
})

export default SearchResultsScreen;

