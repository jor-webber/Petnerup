import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  TextInput
} from 'react-native';
import Colors from "../constants/colors";
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import { auth } from '../firebase/config';
import { signOut } from 'firebase/auth';


const SearchBar = ({ navigation, showSearchBar, users }) => {
    const [userSearchQuery, setUserSearchQuery] = useState("");

    const [usersList, setUsersList] = useState(users);

    

    const [visible, setVisible] = useState(false);

    const hideMenu = () => setVisible(false);

    const showMenu = () => setVisible(true);

    const onSearch = (searchInput) => {
      // console.log(searchInput);
      const filteredList = users.filter(u => String(u.firstName).includes(searchInput) || String(u.lastName).includes(searchInput))
      setUsersList(filteredList)
      // console.log(filteredList)
      console.log(usersList)
    }

    const handleLogout = () => {
        signOut(auth).then(() => {
          navigation.replace("Login");
        })
        .catch((error) => {
          alert(error);
        });
    }

    return (
        <View style={styles.container}>
            <View style={styles.logo}>
                <Image source={require("../assets/logo.png")} style={styles.image} />
            </View>
            <View style={styles.textBoxContainer}>
              {showSearchBar && (
                <TextInput
                style={styles.textInput}
                placeholder="Search..."
                placeholderTextColor={Colors.placeholderColor}
                onChangeText={onSearch}
                onSubmitEditing={() => navigation.navigate("Search Results", { users: usersList })}
              />
              )}
            </View>
            <View style={styles.menu}>
                <Menu 
                    visible = {visible}
                    anchor = {
                        <TouchableOpacity onPress={showMenu}>
                            <Image source={require("../assets/hb.png")} style={styles.image} />
                        </TouchableOpacity>
                    }
                    onRequestClose = {hideMenu}
                >
                    <MenuItem onPress={() => navigation.navigate('Community')}>Community Page</MenuItem>
                    <MenuDivider />
                    <MenuItem onPress={() => navigation.navigate('Add Pet')}>Add Pet</MenuItem>
                    <MenuDivider />
                    <MenuItem onPress={handleLogout}>Log Out</MenuItem>
                </Menu>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: "1%",
        width: '100%',
        height: 60,
        borderStyle: 'solid',
        borderTopColor: 'black',
        borderBottomColor: 'black',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'white'
    },
    logo: {
        minWidth: 50,
        width: '20%',
        marginTop: 5,
        marginLeft: 0
    },
    menu: {
        minWidth: 50,
        width: '20%',
        marginTop: 3
    },
    image: {
      width: '100%',
      // Without height undefined it won't work
      height: 50,
      // figure out your image aspect ratio
      aspectRatio: 1,
      resizeMode: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      backgroundColor: 'white'

    },
    textInput: {
		height: 40,
		backgroundColor: Colors.inputBackgroundColor,
		borderColor: Colors.inputBackgroundColor,
		borderRadius: 20,
		textAlign: "center",
		width: "100%",
	},
    textBoxContainer: {
		margin: 4,
		width: "100%",
		alignContent: "center",
		alignItems: "center",
        width: '60%',
        marginTop: 10
	}
  });
  
  export default SearchBar;