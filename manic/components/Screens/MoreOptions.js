import {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { useAuthenticator} from '@aws-amplify/ui-react-native';

const placeholderImage = require('../../assets/images/userplaceholder.jpg');
const ImageViewer = ({placeholderImageSource}) => {
    return(
        <Image source={placeholderImageSource} style={styles.image}/>
    )
}


const ViewMoreOptions = () => {
    const {user} = useAuthenticator((context) => [context.user]);

    return(
        <View style={styles.containter}>
            <ImageViewer placeholderImageSource={placeholderImage}/>
            <Text>username: {user.username}</Text>
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
});

export default ViewMoreOptions