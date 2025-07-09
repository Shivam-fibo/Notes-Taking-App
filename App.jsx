import { SafeAreaView, ScrollView, StatusBar, StyleSheet, View, Text, Button, TextInput, Modal } from 'react-native'
import React, { useCallback, useState } from 'react'

const App = () => {
  const [notes, setNotes] = useState([])
  const [text, setText] = useState("")
  const [listView, setListView] = useState(false);
  const [isNoteModelOpen, setNoteModelOpen] = useState(false)
  const [selecteIndex, setSelectedIndex] = useState(null)
  const backgroundStyle = {
    backgroundColor: "#fff",
    flex: 1
  }

  const onSaveNote = useCallback(() => {
    if (!text) return;
    const copyNotes = [...notes]
    if (selecteIndex !== null) {
      copyNotes[selecteIndex] = text
    }
    else {
      copyNotes = copyNotes.concat(text)
    }
    setNotes(copyNotes)
    setNoteModelOpen(false)
    setSelectedIndex(null)
  }, [text, notes, setNotes]);

  const onNotePress = (index) => {
    setSelectedIndex(index)

  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar />
      <ScrollView
        contentInsetAdjustmentBehavior='automatic'
        contentContainerStyle={styles.scrollViewContent}
        style={backgroundStyle}>
        <View style={styles.notesContainer}>
          <View style={styles.view}>
            <Button title={listView ? 'Full View' : "List View"} onPress={() => setListView(!listView)} />
          </View>
          {notes.map((note, index) => (
            <View key={index} style={listView ? styles.noteListView : styles.note}>
              <Text numberOfLines={listView ? 2 : undefined} style={styles.noteText}
                onPress={() => onNotePress()}
              >{note}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.addNoteContainer}>
        <Button title='Add Note' onPress={() => setNoteModelOpen(true)} />
      </View>

      <Modal visible={isNoteModelOpen}>
        <View style={styles.modalContainer}>
          <Text style={styles.modelHeading}>Add a note</Text>
          <TextInput
            style={styles.TextInput}
            onChangeText={setText}
            value={text}
            multiline
            placeholder="Enter your note here"
          />
          <View style={styles.actionButtonContainer}>
            <Button title='Save' onPress={onSaveNote} />
            <Button title='Close' onPress={() => setNoteModelOpen(false)} />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff"
  },
  scrollViewContent: {
    flexGrow: 1
  },
  notesContainer: {
    flex: 1,
    backgroundColor: "#ffff",
    padding: 16,
  },
  note: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: "red",
    marginBottom: 10
  },
  noteText: {
    fontSize: 16
  },
  noteListView: {
    height: 80,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: "red",
    marginBottom: 10
  },
  view: {
    marginTop: 35,
    alignItems: "flex-end"
  },
  addNoteContainer: {
    bottom: 20,
    right: 20,
    position: "absolute"
  },
  modalContainer: {
    flex: 1,
    padding: 20
  },
  modelHeading: {
    fontSize: 30,
    marginBottom: 20
  },
  TextInput: {
    borderWidth: 1,
    padding: 10,
    margin: 10,
    minHeight: 100,
    borderRadius: 5,
    borderColor: '#ccc'
  },
  actionButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20
  }
});

export default App