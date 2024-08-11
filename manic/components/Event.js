import {View, StyleSheet, ScrollView, Pressable} from 'react-native';
class Event {
    constructor(id, title, type, startDate, duration, notes) {
        this.id = id;
        this.title = title;
        this.startDate = startDate;
        this.type = type;
        this.duration = duration;
        this.notes = notes;
    }
};


export function createEvent(title, type, startDate, duration, notes) {
    id = Math.random().toString();
    reformattedDate = startDate.toISOString().split('T')[0];
    if (duration == '') {
        duration = 0;
    };
    createdEvent = new Event (id, title, type, reformattedDate, duration, notes);
    console.log(createdEvent);
}

export function deleteEvent(eventId){
}

export function shareEvent(eventId){
}

export function editEvent(eventId, eventData) {
}



const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    input: {
        marginBottom: 16,
    },
    label: {
        marginTop: 16,
        marginBottom: 8,
        fontSize: 16,
    },
    radioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    buttonContainer:{
        width:320, 
        height: 68, 
        marginHorizontal:20, 
        alignItems:'center',
        justifyContent:'center',
        padding: 3,
    },
    button:{
        borderRadius: 10, 
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center', 
        flexDirection: 'row',
    },
    buttonLabel: {
        color: '#fff',
        fontSize: 16,
    },
});