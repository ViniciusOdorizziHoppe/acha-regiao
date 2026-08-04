import { TouchableOpacity, Text } from "react-native";

interface CategoryChipProps {
  label: string;
  active: boolean;
  onPress: () => void;
}

export function CategoryChip({ label, active, onPress }: CategoryChipProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`h-9 rounded-full px-4 justify-center items-center mr-2 ${
        active
          ? "bg-brand"
          : "bg-card border border-border"
      }`}
      style={
        active
          ? {
              shadowColor: "#F5C518",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.4,
              shadowRadius: 8,
              elevation: 4,
            }
          : undefined
      }
      activeOpacity={0.8}
    >
      <Text
        className={`text-[13px] font-bold ${
          active ? "text-text-on-yellow" : "text-text-secondary"
        }`}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
