import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { EmptyState } from "../../src/components/EmptyState";

export default function AlugueisScreen() {
  return (
    <SafeAreaView className="flex-1 bg-root" edges={["top"]}>
      <View className="px-4 pt-4">
        <Text className="text-text-primary text-h1 mb-1">Aluguéis</Text>
        <Text className="text-text-muted text-body">
          Casas, apartamentos e kitnets
        </Text>
      </View>
      <EmptyState
        icon="home-outline"
        title="Em breve"
        subtitle="Aluguéis de imobiliárias da região estarão disponíveis aqui."
      />
    </SafeAreaView>
  );
}
