import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert, LayoutAnimation } from "react-native";

export const MoodContext = createContext();

const STORAGE_KEY = "@mood_history";

export const MoodProvider = ({ children }) => {
  const [moodHistory, setMoodHistory] = useState({});

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

  const saveMood = async (mood) => {
    const today = new Date();
    const date = today.toISOString().split("T")[0]; // YYYY-MM-DD format
    const time = today.toISOString().split("T")[1].split(".")[0]; // HH:MM:SS format

    // Create a new mood object with date, mood, and time
    const newMood = { mood, time };

    const updatedMoods = { ...moodHistory };
    if (updatedMoods[date]) {
      updatedMoods[date].push(newMood);
    } else {
      updatedMoods[date] = [newMood];
    }

    setMoodHistory(updatedMoods);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedMoods));
    } catch (error) {
      console.log("Failed to save mood: ", error);
    }
  };

  const clearMoodHistory = async () => {
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
              await AsyncStorage.removeItem(STORAGE_KEY);
              setMoodHistory({});
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
    <MoodContext.Provider value={{ moodHistory, saveMood, clearMoodHistory }}>
      {children}
    </MoodContext.Provider>
  );
};
