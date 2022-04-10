import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Comment from './Comment';

const Comments = () => {
    return (
        <SafeAreaView>
            <Comment userName="Harman" content="This is a comment" />
            <Comment userName="Jordan" content="This is also a comment" />
        </SafeAreaView>
    )
};

export default Comments;