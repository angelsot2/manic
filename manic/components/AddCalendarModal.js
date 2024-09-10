import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { TextInput, Button, Switch } from 'react-native-paper';


const AddCalendarModal = ({ visible, onClose, onSave }) => {
  const [calendarTitle, setCalendarTitle] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);

  const resetForm = () => {
    setCalendarTitle('');
    setIsPrivate(false);
  };


  const handleSave = () => {
    const calendarData = {
      title: calendarTitle,
      visibility: isPrivate,
    };
    onSave(calendarData);
    resetForm();
    onClose(); // Close the modal after saving
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback onPress={() => { /* Prevent closing when tapping inside modal */ }}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Add New Calendar</Text>
              <TextInput
                label="Calendar Title"
                value={calendarTitle}
                onChangeText={setCalendarTitle}
                style={styles.input}
              />
              <View style={styles.switchContainer}>
                <Text>Private Calendar</Text>
                <Switch value={isPrivate} onValueChange={setIsPrivate} />
              </View>
              <Button mode="contained" onPress={handleSave} style={styles.saveButton}>
                Save
              </Button>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    height: '45%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    marginBottom: 15,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: 'purple',
  },
  closeButton: {
    marginTop: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'purple',
    fontSize: 16,
  },
});

export default AddCalendarModal;