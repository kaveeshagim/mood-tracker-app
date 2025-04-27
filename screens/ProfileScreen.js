import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../AppStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import theme from "../theme";

export default function ProfileScreen() {
  const navigation = useNavigation();

  const [user, setUser] = useState({
    name: "",
    profilePicture:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRT7JtwKxW6J6J9qNI0ZgruqgBdz-KbicoGAQ&s",
  });

  useEffect(() => {
    const loadUserData = async () => {
      // Fetch user data from AsyncStorage or API
      const storedUser = await AsyncStorage.getItem("username");
      if (storedUser) {
        setUser((prev) => ({
          ...prev,
          name: storedUser,
        }));
      }
    };

    loadUserData();
  }, []);

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        onPress: async () => {
          await AsyncStorage.removeItem("username");
          navigation.navigate("Welcome");
        },
      },
    ]);
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            // Add logic to delete the account from your backend (if applicable)
            await AsyncStorage.removeItem("username");
            navigation.navigate("Welcome");
          },
        },
      ]
    );
  };

  return (
    <LinearGradient
      colors={[theme.beige, theme.skyblue]}
      style={styles.profileContainer}
    >
      <Image
        source={{ uri: user.profilePicture }}
        style={styles.profileImage}
      />
      <Text style={styles.name}>{user.name || "Loading..."}</Text>

      <TouchableOpacity
        style={styles.profileButton}
        onPress={() => navigation.navigate("EditProfile")} // Navigate to EditProfile screen
      >
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.profileButton}
        onPress={() => navigation.navigate("Settings")} // Navigate to Settings screen
      >
        <Text style={styles.buttonText}>Settings</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.profileButton}
        onPress={() => navigation.navigate("TermsAndConditions")} // Navigate to Terms and Conditions screen
      >
        <Text style={styles.buttonText}>Terms and Conditions</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.profileButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.profileButton}
        onPress={handleDeleteAccount}
      >
        <Text style={styles.buttonText}>Delete Account</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}
