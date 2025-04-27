// ProfileScreen.js
import React, { useState, useEffect } from "react";
import { View, Text, Image, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../AppStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";

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

  return (
    <LinearGradient
      colors={["#f5efeb", "#c8d9e6"]}
      style={styles.profileContainer}
    >
      <Image
        source={{ uri: user.profilePicture }}
        style={styles.profileImage}
      />
      <Text style={styles.name}>{user.name}</Text>

      <Button
        title="Edit Profile"
        onPress={() => navigation.navigate("EditProfile")} // Optional: Navigate to an edit profile screen
      />
    </LinearGradient>
  );
}
