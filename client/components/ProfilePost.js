import React from 'react';
import {
  View,
  Image
} from 'react-native';

const ProfilePost = ( props ) => {
  return (
    <View>
        <Image source={{uri: props.image}} style={styles.image} key={props.index}/>
    </View>
  );
};

export default ProfilePost;
