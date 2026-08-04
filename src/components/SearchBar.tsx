import { View, Text, TextInput, TouchableOpacity } from "react-native";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export function SearchBar({
  value,
  onChangeText,
  placeholder = "O que você procura na região?",
}: SearchBarProps) {
  return (
    <View
      className="flex-row items-center bg-input border-2 border-brand/40 rounded-input h-[50px] px-4"
      style={{
        shadowColor: "#F5C518",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.25,
        shadowRadius: 12,
        elevation: 4,
      }}
    >
      <Text
        className="text-brand text-lg mr-2"
        style={{ fontWeight: "600" }}
      >
        🔍
      </Text>
      <TextInput
        className="flex-1 text-text-primary text-body"
        placeholder={placeholder}
        placeholderTextColor="#6E6E76"
        value={value}
        onChangeText={onChangeText}
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={() => onChangeText("")}>
          <Text className="text-text-muted text-base font-bold">✕</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
