import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CustomSplashScreen from "./screens/SplashScreen";
import HomeScreen from "./screens/HomeScreen";
import MoodHistoryScreen from "./screens/MoodHistoryScreen";
import WelcomeScreen from "./screens/WelcomeScreen";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    const clearStorage = async () => {
      await AsyncStorage.removeItem("username"); // 👈 removes only the username key
      console.log("Storage cleared!");
    };
    clearStorage();
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false, // optional: hides the header bar
        }}
      >
        <Stack.Screen name="Splash" component={CustomSplashScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="MoodHistory" component={MoodHistoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
