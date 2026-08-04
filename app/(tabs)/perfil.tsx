import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { EmptyState } from "../../src/components/EmptyState";

export default function PerfilScreen() {
  return (
    <SafeAreaView className="flex-1 bg-root" edges={["top"]}>
      <View className="px-4 pt-4">
        <Text className="text-text-primary text-h1 mb-1">Perfil</Text>
        <Text className="text-text-muted text-body">
          Seus anúncios e configurações
        </Text>
      </View>
      <EmptyState
        icon="person-outline"
        title="Faça login"
        subtitle="Entre para gerenciar seus anúncios e acompanhar suas vendas."
      />
    </SafeAreaView>
  );
}
