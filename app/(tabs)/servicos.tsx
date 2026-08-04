import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { EmptyState } from "../../src/components/EmptyState";

export default function ServicosScreen() {
  return (
    <SafeAreaView className="flex-1 bg-root" edges={["top"]}>
      <View className="px-4 pt-4">
        <Text className="text-text-primary text-h1 mb-1">Serviços</Text>
        <Text className="text-text-muted text-body">
          Encontre profissionais da região
        </Text>
      </View>
      <EmptyState
        icon="person-circle-outline"
        title="Em breve"
        subtitle="Perfis de profissionais com portfólio e avaliações estarão disponíveis aqui."
      />
    </SafeAreaView>
  );
}
