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
import styles from "./AppStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "react-native-reanimated";
import Animated, { FadeInUp } from "react-native-reanimated";

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

export default function App() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [moodHistory, setMoodHistory] = useState([]);
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customMoodText, setCustomMoodText] = useState("");
  const [username, setUsername] = useState(null);
  const [storedUsername, setStoredUsername] = useState(null);

  useEffect(() => {
    if (
      Platform.OS === "android" &&
      UIManager.setLayoutAnimationEnabledExperimental
    ) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  useEffect(() => {
    const loadUsername = async () => {
      const savedName = await AsyncStorage.getItem("username");
      if (savedName) {
        setStoredUsername(savedName);
      }
    };
    loadUsername();
  }, []);

  const handleSavedUsername = async () => {
    await AsyncStorage.setItem("username", username);
    setStoredUsername(username);
    setUsername("");
  };

  useEffect(() => {
    loadMoods();
  }, []);

  const loadMoods = async () => {
    try {
      const storedMoods = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedMoods !== null) {
        setMoodHistory(JSON.parse(storedMoods));
      }
    } catch (error) {
      console.log("Failed to load moods: ", error);
    }
  };

  const handleSaveMood = async () => {
    if (selectedMood) {
      const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
      const newMood = { date: today, mood: selectedMood };
      const updatedMoods = [newMood, ...moodHistory];
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setMoodHistory(updatedMoods);
      setSelectedMood(null); // reset selection
      setCustomMoodText("");

      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedMoods));
      } catch (error) {
        console.log("Failed to save mood: ", error);
      }
    }
  };

  const handleClearHistory = async () => {
    Alert.alert(
      "Clear Mood History",
      "Are you sure you want to delete all your moods?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes, Clear",
          onPress: async () => {
            try {
              LayoutAnimation.configureNext(
                LayoutAnimation.Presets.easeInEaseOut
              );
              await AsyncStorage.removeItem(STORAGE_KEY);
              setMoodHistory([]);
            } catch (error) {
              console.log("Failed to clear mood history: ", error);
            }
          },
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  return (
    // <View style={styles.container}>
    <LinearGradient colors={["#f5efeb", "#c8d9e6"]} style={styles.container}>
      {!storedUsername ? (
        <>
          <Text style={styles.title}>Welcome to Mood Tracker!</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name..."
            value={username}
            onChangeText={setUsername}
          />
          <TouchableOpacity
            style={styles.enterButton}
            onPress={handleSavedUsername}
          >
            <Text style={styles.enterButtonText}>Enter</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.subtitle}>How are you feeling today? 💬</Text>

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
                {/* Close Button */}
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setShowCustomInput(false)}
                >
                  <Text style={styles.closeButtonText}>❌</Text>
                </TouchableOpacity>

                {/* Input Field */}
                <TextInput
                  style={styles.input}
                  placeholder="Enter mood or emoji..."
                  value={customMoodText}
                  onChangeText={setCustomMoodText}
                />

                {/* Save Button */}
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

          <TouchableOpacity
            onPress={handleSaveMood}
            style={[
              styles.saveButton,
              { backgroundColor: selectedMood ? "#007aff" : "#ccc" },
            ]}
            disabled={!selectedMood}
          >
            <Text style={styles.saveButtonText}>Save Mood</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleClearHistory}
            style={styles.clearButton}
          >
            <Text style={styles.clearButtonText}>Clear Mood History</Text>
          </TouchableOpacity>

          <Text style={styles.historyTitle}>Mood History</Text>

          <ScrollView
            style={styles.moodHistoryContainer}
            contentContainerStyle={styles.moodHistoryContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {moodHistory.map((moodItem, index) => (
              <Animated.View
                key={index}
                style={styles.moodCard}
                entering={FadeInUp.duration(500)}
              >
                <Text style={styles.moodEmoji}>{moodItem.mood}</Text>
                <Text style={styles.moodDate}>{moodItem.date}</Text>
              </Animated.View>
            ))}
          </ScrollView>
        </>
      )}
    </LinearGradient>
  );
}
