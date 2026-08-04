import "../global.css";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { View, Text } from "react-native";

export default function RootLayout() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setTimeout(() => setReady(true), 600);
  }, []);

  if (!ready) {
    return (
      <View className="flex-1 bg-root items-center justify-center">
        <Text className="text-accent text-2xl font-black mb-2">Acha Região</Text>
        <Text className="text-text-muted text-sm">O marketplace do Alto Vale</Text>
      </View>
    );
  }

  return (
    <>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
    </>
  );
}
