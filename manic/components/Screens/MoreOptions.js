import {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Touchable} from 'react-native';
import {Button} from 'react-native-paper';
import { useAuthenticator} from '@aws-amplify/ui-react-native';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const placeholderImage = require('../../assets/images/userplaceholder.jpg');
const ImageViewer = ({placeholderImageSource, selectedImage}) => {
    const imageSource = selectedImage ? {uri: selectedImage} : placeholderImageSource;
    return(
        <Image source={imageSource} style={styles.image}/>
    )
}


const ViewMoreOptions = () => {
    const {user} = useAuthenticator((context) => [context.user]);

    const [selectedImage, setSelectedImage] = useState(null);
    const pickImageAsync = async() => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
        });
        if(!result.canceled) {
            setSelectedImage(result.assets[0].uri);
        }else {
            alert('You did not select any image');
        }
    }


    return(
        <View style={styles.containter}>
            <ImageViewer 
                placeholderImageSource={placeholderImage}
                selectedImage={selectedImage}
            />
            <Text>username: {user.username}</Text>
            <TouchableOpacity
                style={styles.changePhoto}
                label="Choose a photo"
                onPress={pickImageAsync}
            >
                <Icon name="image" size={24} color="#fff"/>
            </TouchableOpacity> 
        </View>
    );
}


const styles = StyleSheet.create({
    containter: {
        flex: 1,
        justifyContent: 'top',
        top: 20,
        alignItems: 'center',
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 100,
    },
    changePhoto: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        backgroundColor: 'purple',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
      }
});

export default ViewMoreOptions