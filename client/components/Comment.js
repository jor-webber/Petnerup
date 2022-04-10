import React from 'react';
import {
	Text,
	SafeAreaView,
} from "react-native";

const Comment = ({userName}, {content}) => {
    return (
        <SafeAreaView>
            <Text>{userName}</Text>
            <Text>{content}</Text>
        </SafeAreaView>
    )
};

export default Comment;