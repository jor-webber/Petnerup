import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';

const PostImage = (props) => {
  return (
    <>
      <Image source={{ uri: props.image }} style={styles.image} />
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    // Without height undefined it won't work
    height: 300,
    // figure out your image aspect ratio
    aspectRatio: 1,
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: 'green',
    marginBottom: 10,
    borderWidth: 2.5,
    borderColor:'green'

  }
});

export default PostImage;
