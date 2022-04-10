import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { useIsFocused } from '@react-navigation/native';
import SearchBar from '../components/SearchBar';
import { Ionicons } from '@expo/vector-icons';

const AddPostScreen = (props) => {
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  const isFocused = useIsFocused();

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
      if (Platform.OS !== 'web') {
        const galleryStatus =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (galleryStatus.status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        } else {
          setHasGalleryPermission(galleryStatus.status === 'granted');
        }
      }
    })();
  }, []);

  const takePicture = async () => {
    if (camera) {
      let photo = await camera.takePictureAsync(null);
      setImage(photo.uri);
      props.navigation.navigate('Save', { image: photo.uri });
    } else {
      console.log('camera not ready');
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      props.navigation.navigate('Save', { image: result.uri });
    }
  };

  if (hasCameraPermission === null || hasGalleryPermission === null) {
    return <View />;
  }
  if (hasCameraPermission === false || hasGalleryPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <SearchBar navigation={props.navigation} showSearchBar={false}/>
      <View style={{flex: .895, width: '100%' }}>
        {isFocused && (
          <View style={styles.cameraContainer}>
            <Camera
              style={styles.camera}
              type={type}
              ref={(ref) => setCamera(ref)}
            >
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    setType(
                      type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back
                    );
                  }}
                >
                <Ionicons name="camera-reverse-outline" size={50} color="white"/>
                </TouchableOpacity>
              </View>
            </Camera>
          </View>
        )}
        <View style={styles.pictureButtonContainer}>
          <TouchableOpacity
            onPress={() => takePicture()}
            style={styles.pictureButton}
          >
            <Text style={styles.buttonText}>Take Picture</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => pickImage()}
            style={styles.pictureButton}
          >
            <Text style={styles.buttonText}>Choose Picture</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: '100%',

  },
  cameraContainer: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 10,
  },
  camera: {
    flex: 1,
    aspectRatio: 0.5,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  
  },
  button: {
    flex: 1,
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
  pictureButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  
  },
  pictureButton: {
    alignSelf: 'center',
    height: 50,
    width: 150,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center',
  },
});

export default AddPostScreen;
