{/* This file contains data necessary for managing the friends  */}

import {StyleSheet, View, Text, Button, FlatList} from 'react-native';
import {addFriendButton, removeFriendButton} from './components/Buttons';
import React, {useState, useRef, useEffect} from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

class Friend {
    constructor(id, name, email, isFriend) {
        this.id = id;
        this.name = name;
        this.email = email;
    }
}



export default function Friends() {
    const [user, setUser] = useState(null);



    //Fetches the list 
    const getList = () => {
        {/* access the database list of friends for a user. The user will be specified
        and using that, their friends list will be fetched.
        Function will be called from getFriendsList*/}
    }

    //Add a new friend to the user's list 
    const addFriend = () => {
        {/*add frind to user's friend list.
        function will be called from addFriendButton*/}
    }

    //Remove a friend from the user's list 
    const removeFriend = () => {
        {/*remove friend from user's friend list 
        functi onwill be called from removeFriendButton */}
    }


}