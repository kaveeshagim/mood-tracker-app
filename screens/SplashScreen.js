import React, { use, useEffect } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../AppStyles";
import * as SplashScreen from "expo-splash-screen";
import { LinearGradient } from "expo-linear-gradient";

SplashScreen.preventAutoHideAsync();

export default function CustomSplashScreen() {
  const navigation = useNavigation();
  const opacity = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(async () => {
        await SplashScreen.hideAsync();
        navigation.replace("Welcome");
      }, 1000);
    });
  }, []);

  return (
    <LinearGradient colors={["#f5efeb", "#c8d9e6"]} style={styles.container}>
      <Animated.Text style={[styles.logo, { opacity }]}>
        🌟 Mood Tracker 🌟
      </Animated.Text>
    </LinearGradient>
  );
}
