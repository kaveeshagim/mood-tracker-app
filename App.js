import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import { MoodProvider } from "./context/MoodContext";
import CustomSplashScreen from "./screens/SplashScreen";
import HomeScreen from "./screens/HomeScreen";
import MoodHistoryScreen from "./screens/MoodHistoryScreen";
import WelcomeScreen from "./screens/WelcomeScreen";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "home-outline";
          } else if (route.name === "MoodHistory") {
            iconName = "time-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#4F8EF7",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="MoodHistory" component={MoodHistoryScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  useEffect(() => {
    const clearStorage = async () => {
      await AsyncStorage.removeItem("username"); // 👈 removes only the username key
      console.log("Storage cleared!");
    };
    clearStorage();
  }, []);
  return (
    <MoodProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{
            headerShown: false, // optional: hides the header bar
          }}
        >
          <Stack.Screen name="Splash" component={CustomSplashScreen} />
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen
            name="Main"
            component={MainTabs}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </MoodProvider>
  );
}
