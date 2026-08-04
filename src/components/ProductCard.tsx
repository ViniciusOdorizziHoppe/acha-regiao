import { View, Text, Image, TouchableOpacity } from "react-native";

interface ProductCardProps {
  title: string;
  price: number;
  city: string;
  imageUrl: string;
  destaque?: boolean;
  onPress: () => void;
}

export function ProductCard({
  title,
  price,
  city,
  imageUrl,
  destaque = false,
  onPress,
}: ProductCardProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-card rounded-card border border-border overflow-hidden flex-1"
      style={{
        shadowColor: "#F5C518",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 16,
        elevation: 6,
      }}
      activeOpacity={0.92}
    >
      <View className="relative">
        <Image
          source={{ uri: imageUrl }}
          className="w-full aspect-[4/3] rounded-t-card"
          resizeMode="cover"
        />
        {destaque && (
          <View className="absolute top-3 left-3 bg-brand px-2.5 py-1 rounded-badge">
            <Text className="text-text-on-yellow text-[10px] font-extrabold uppercase tracking-wider">
              Destaque
            </Text>
          </View>
        )}
        <View className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-card/90 to-transparent" />
      </View>
      <View className="p-3 gap-2">
        <Text
          className="text-text-primary text-[13px] font-semibold leading-tight"
          numberOfLines={2}
        >
          {title}
        </Text>
        <Text className="text-brand text-price">
          R$ {price.toLocaleString("pt-BR")}
        </Text>
        <View className="flex-row items-center gap-1">
          <View className="w-1.5 h-1.5 rounded-full bg-brand/60" />
          <Text className="text-text-muted text-[11px]">{city}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
