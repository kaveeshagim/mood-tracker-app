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
  FlatList,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import styles from "../AppStyles";
import theme from "../theme";
import { MoodContext } from "../context/MoodContext";
import { useContext } from "react";
import { Calendar } from "react-native-calendars";

export default function MoodHistoryScreen() {
  const { moodHistory, clearMoodHistory } = useContext(MoodContext);
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleDateSelect = (day) => {
    setSelectedDate(day.dateString);
  };

  const renderMoodForDay = () => {
    if (!selectedDate || !moodHistory[selectedDate]) {
      return <Text>No moods recorded for this day.</Text>;
    }

    const moods = moodHistory[selectedDate];

    return (
      <FlatList
        data={moods}
        renderItem={({ item }) => (
          <View style={styles.moodItem}>
            <Text style={styles.moodTime}>{item.time}</Text>{" "}
            {/* Display mood time */}
            <Text style={styles.moodText}>{item.mood}</Text>{" "}
            {/* Display mood */}
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  };

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
        <Calendar
          markedDates={Object.keys(moodHistory).reduce((acc, date) => {
            acc[date] = { selected: true, marked: true, dotColor: "blue" }; // Mark days with moods
            return acc;
          }, {})}
          onDayPress={handleDateSelect}
          monthFormat={"yyyy MM"}
        />

        {selectedDate && (
          <View>
            <Text style={styles.selectedDate}>{selectedDate}</Text>
            {renderMoodForDay()}
          </View>
        )}
      </ScrollView>
    </LinearGradient>
  );
}
