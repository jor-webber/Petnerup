import React from 'react';
import {
	Text,
	TextInput,
	TouchableOpacity,
	SafeAreaView,
} from "react-native";
import Comments from './Comments';

const CommentBox = () => {
    
    return (
        <SafeAreaView>
            <SafeAreaView>
                <Comments />
            </SafeAreaView>
            <SafeAreaView>
                <TextInput type="text" placeholder="Add a comment..." />
                <TouchableOpacity>    
                    <Text>Post</Text>
                </TouchableOpacity> 
            </SafeAreaView>
        </SafeAreaView>
    )
}

export default CommentBox;