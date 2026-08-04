import { Tabs } from "expo-router";
import { View, Text } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#0F0F11",
          borderTopColor: "#F5C518",
          borderTopWidth: 2,
          height: 64,
          paddingBottom: 8,
          paddingTop: 6,
          shadowColor: "#F5C518",
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.1,
          shadowRadius: 16,
          elevation: 12,
        },
        tabBarActiveTintColor: "#F5C518",
        tabBarInactiveTintColor: "#6E6E76",
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "700",
          marginTop: 2,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Produtos",
          tabBarIcon: ({ focused }) => (
            <View className="items-center">
              <Text style={{ fontSize: 20 }}>{focused ? "🏷️" : "🏷️"}</Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="servicos"
        options={{
          title: "Serviços",
          tabBarIcon: ({ focused }) => (
            <View className="items-center">
              <Text style={{ fontSize: 20 }}>{focused ? "👤" : "👤"}</Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="alugueis"
        options={{
          title: "Aluguéis",
          tabBarIcon: ({ focused }) => (
            <View className="items-center">
              <Text style={{ fontSize: 20 }}>{focused ? "🏠" : "🏠"}</Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: "Perfil",
          tabBarIcon: ({ focused }) => (
            <View className="items-center">
              <Text style={{ fontSize: 20 }}>{focused ? "☰" : "☰"}</Text>
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
