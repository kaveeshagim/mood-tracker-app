import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@mood_history";
const moods = ["😃", "😐", "😢", "😡"];

export default function App() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [moodHistory, setMoodHistory] = useState([]);

  useEffect(() => {
    if (
      Platform.OS === "android" &&
      UIManager.setLayoutAnimationEnabledExperimental
    ) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

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
    <View style={styles.container}>
      <Text style={styles.title}>How are you feeling today?</Text>

      <View style={styles.moodContainer}>
        {moods.map((mood, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setSelectedMood(mood)}
            style={[
              styles.moodButton,
              selectedMood === mood && styles.selectedMood,
            ]}
          >
            <Text style={styles.moodText}>{mood}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity onPress={handleSaveMood} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save Mood</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleClearHistory} style={styles.clearButton}>
        <Text style={styles.clearButtonText}>Clear Mood History</Text>
      </TouchableOpacity>

      <Text style={styles.historyTitle}>Mood History</Text>

      <FlatList
        data={moodHistory}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={styles.historyItem}>
            {item.date} - {item.mood}
          </Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: "#fefefe",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  moodContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  moodButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#eee",
  },
  selectedMood: {
    backgroundColor: "#cdeffd",
  },
  moodText: {
    fontSize: 32,
  },
  saveButton: {
    backgroundColor: "#007aff",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 30,
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
  },
  historyTitle: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
  },
  historyItem: {
    fontSize: 16,
    paddingVertical: 4,
  },
  clearButton: {
    backgroundColor: "#ff3b30",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 30,
  },
  clearButtonText: {
    color: "white",
    fontSize: 16,
  },
});
