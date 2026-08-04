import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface EmptyStateProps {
  icon?: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
}

export function EmptyState({
  icon = "search-outline",
  title,
  subtitle,
}: EmptyStateProps) {
  return (
    <View className="flex-1 items-center justify-center py-16 px-8">
      <View className="w-16 h-16 rounded-full bg-input items-center justify-center mb-5">
        <Ionicons name={icon} size={32} color="#3A3A3E" />
      </View>
      <Text className="text-text-primary text-base font-bold mb-2 text-center">
        {title}
      </Text>
      <Text className="text-text-muted text-[13px] text-center leading-5">
        {subtitle}
      </Text>
    </View>
  );
}
