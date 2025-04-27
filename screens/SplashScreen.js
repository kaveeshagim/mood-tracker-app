import React, { use, useEffect } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../AppStyles";
import * as SplashScreen from "expo-splash-screen";
import { LinearGradient } from "expo-linear-gradient";
import theme from "../theme";

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
      }, 2000);
    });
  }, []);

  return (
    <LinearGradient
      colors={[theme.beige, theme.skyblue]}
      style={styles.container}
    >
      <Animated.Text style={[styles.logo, { opacity }]}>
        🌟 Mood Tracker 🌟
      </Animated.Text>
    </LinearGradient>
  );
}
