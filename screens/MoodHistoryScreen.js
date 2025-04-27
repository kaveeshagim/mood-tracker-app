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

export default function MoodHistoryScreen() {
  const { moodHistory, clearMoodHistory } = useContext(MoodContext);
  return (
    <LinearGradient
      colors={[theme.beige, theme.skyblue]}
      style={styles.container}
    >
      <Text style={styles.historyTitle}>Mood History</Text>
      <TouchableOpacity
        onPress={clearMoodHistory}
        style={styles.clearHistoryButton}
      >
        <Text style={styles.clearButtonText}>Clear Mood History</Text>
      </TouchableOpacity>
      <ScrollView
        style={styles.moodHistoryContainer}
        contentContainerStyle={styles.moodHistoryContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {moodHistory.map((moodItem, index) => (
          <View key={index} style={styles.moodCard}>
            <Text style={styles.moodEmoji}>{moodItem.mood}</Text>
            <Text style={styles.moodDate}>{moodItem.date}</Text>
          </View>
        ))}
      </ScrollView>
    </LinearGradient>
  );
}
