import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import styles from "../AppStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import theme from "../theme";
import { useNavigation } from "@react-navigation/native";

export default function WelcomeScreen() {
  const navigation = useNavigation();
  const [username, setUsername] = useState(null);
  const [storedUsername, setStoredUsername] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUsername = async () => {
      const savedName = await AsyncStorage.getItem("username");
      if (savedName) {
        setStoredUsername(savedName);
        navigation.replace("Home");
      } else {
        setIsLoading(false);
      }
    };
    loadUsername();
  }, []);

  const handleSavedUsername = async () => {
    await AsyncStorage.setItem("username", username);
    setStoredUsername(username);
    setUsername("");
    navigation.replace("Home");
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={{ marginTop: 10 }}>Loading...</Text>
      </View>
    );
  }

  return (
    <LinearGradient
      colors={[theme.beige, theme.skyblue]}
      style={styles.container}
    >
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
        </>
      )}
    </LinearGradient>
  );
}
