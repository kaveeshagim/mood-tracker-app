import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Alert,
  LayoutAnimation,
  Platform,
  UIManager,
  ScrollView,
  Button,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import styles from "../AppStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import theme from "../theme";
import { MoodContext } from "../context/MoodContext";
import { useContext } from "react";

const STORAGE_KEY = "@mood_history";
const emojiOptions = [
  "😊",
  "😢",
  "😡",
  "😱",
  "😍",
  "😴",
  "🤔",
  "🤩",
  "😭",
  "😎",
];

export default function HomeScreen({ navigation }) {
  const [selectedMood, setSelectedMood] = useState(null);
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customMoodText, setCustomMoodText] = useState("");
  const { saveMood } = useContext(MoodContext);

  useEffect(() => {
    if (
      Platform.OS === "android" &&
      UIManager.setLayoutAnimationEnabledExperimental
    ) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  const handleSaveMood = async () => {
    if (selectedMood) {
      await saveMood(selectedMood);
      setSelectedMood(null); // reset selection
      setCustomMoodText("");
    }
  };

  const handleClearMood = async () => {
    Alert.alert(
      "Clear Mood",
      "Are you sure you want to delete this mood?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes, Delete",
          onPress: async () => {
            // LayoutAnimation.configureNext(
            //   LayoutAnimation.Presets.easeInEaseOut
            // );
            setSelectedMood(null); // reset selection
            setCustomMoodText("");
          },
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>How are you feeling today?</Text>

      <View style={styles.emojiContainer}>
        {emojiOptions.map((emoji, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setSelectedMood(emoji)}
            style={[
              styles.emojiButton,
              selectedMood === emoji && styles.selectedEmojiButton,
            ]}
          >
            <Text style={styles.moodText}>{emoji}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={[
            styles.emojiButton,
            selectedMood === customMoodText && styles.selectedEmojiButton,
          ]}
          onPress={() => setShowCustomInput(true)}
        >
          <Text style={styles.moodText}>
            {customMoodText ? customMoodText : "➕"}
          </Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={showCustomInput}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowCustomInput(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowCustomInput(false)}
            >
              <Text style={styles.closeButtonText}>❌</Text>
            </TouchableOpacity>

            <TextInput
              style={styles.input}
              placeholder="Enter mood or emoji..."
              value={customMoodText}
              onChangeText={setCustomMoodText}
            />

            <TouchableOpacity
              style={styles.saveCustomMoodButton}
              onPress={() => {
                setSelectedMood(customMoodText);
                setShowCustomInput(false);
                setCustomMoodText(customMoodText);
              }}
            >
              <Text style={styles.saveCustomMoodButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          onPress={handleSaveMood}
          style={[
            styles.saveButton,
            { backgroundColor: selectedMood ? theme.navy : theme.disabled },
          ]}
          disabled={!selectedMood}
        >
          <Text style={styles.saveButtonText}>Save Mood</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleClearMood}
          style={[
            styles.clearButton,
            {
              backgroundColor: selectedMood ? theme.danger : theme.disabled,
            },
          ]}
          disabled={!selectedMood}
        >
          <Text style={styles.clearButtonText}>Clear Mood</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
