import { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { SearchBar } from "../../src/components/SearchBar";
import { CategoryChip } from "../../src/components/CategoryChip";
import { ProductCard } from "../../src/components/ProductCard";
import { SkeletonCard } from "../../src/components/Skeleton";
import { EmptyState } from "../../src/components/EmptyState";
import { CATEGORIES, MOCK_PRODUCTS } from "../../src/data/mock";

export default function ProdutosScreen() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [refreshing, setRefreshing] = useState(false);
  const [loading] = useState(false);

  const filteredProducts =
    activeCategory === "Todos"
      ? MOCK_PRODUCTS
      : MOCK_PRODUCTS.filter((p) => p.category === activeCategory);

  const searchedProducts = search
    ? filteredProducts.filter(
        (p) =>
          p.title.toLowerCase().includes(search.toLowerCase()) ||
          p.city.toLowerCase().includes(search.toLowerCase())
      )
    : filteredProducts;

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1200);
  }, []);

  const renderHeader = () => (
    <View>
      {/* ═══ YELLOW BRAND HEADER ═══ */}
      <LinearGradient
        colors={["#F5C518", "#FFD42A", "#F5C518"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        className="px-4 pt-3 pb-6"
      >
        {/* Sun ray pattern dots */}
        <View className="absolute top-0 right-0 w-40 h-40 opacity-10">
          {Array.from({ length: 20 }).map((_, i) => (
            <View
              key={i}
              className="absolute rounded-full bg-black"
              style={{
                width: 4 + (i % 3) * 3,
                height: 4 + (i % 3) * 3,
                top: `${(i * 17) % 100}%`,
                right: `${(i * 23) % 80}%`,
                opacity: 0.3 + (i % 3) * 0.2,
              }}
            />
          ))}
        </View>

        {/* Logo + location */}
        <View className="flex-row justify-between items-center mb-4">
          <View>
            <Text className="text-text-on-yellow text-[26px] font-black tracking-tight">
              acha
            </Text>
            <Text className="text-text-on-yellow/70 text-[11px] font-semibold uppercase tracking-widest -mt-1">
              Região
            </Text>
          </View>
          <TouchableOpacity className="bg-black/10 rounded-full px-3 py-1.5 flex-row items-center gap-1">
            <Text className="text-text-on-yellow text-xs">📍</Text>
            <Text className="text-text-on-yellow text-xs font-semibold">
              Alto Vale
            </Text>
          </TouchableOpacity>
        </View>

        {/* Hero tagline */}
        <Text className="text-text-on-yellow/80 text-body font-medium mb-4">
          O marketplace da nossa região
        </Text>

        {/* Floating search with yellow glow */}
        <SearchBar value={search} onChangeText={setSearch} />
      </LinearGradient>

      {/* ═══ HERO BANNER ═══ */}
      <View className="mx-4 -mt-3 mb-1">
        <LinearGradient
          colors={["#222226", "#1A1A1E"]}
          className="rounded-card p-4 border border-brand/20"
          style={{
            shadowColor: "#F5C518",
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.15,
            shadowRadius: 24,
            elevation: 10,
          }}
        >
          <View className="flex-row justify-between items-center">
            <View className="flex-1">
              <View className="bg-brand/15 self-start px-2 py-0.5 rounded-badge mb-2">
                <Text className="text-brand text-[10px] font-extrabold uppercase tracking-wider">
                  Novo
                </Text>
              </View>
              <Text className="text-text-primary text-h2 mb-1">
                Anuncie grátis
              </Text>
              <Text className="text-text-muted text-[12px] leading-relaxed">
                Venda o que está parado em casa.{'\n'}
                Milhares de pessoas na região.
              </Text>
            </View>
            <View className="bg-brand rounded-full w-12 h-12 items-center justify-center ml-3"
              style={{
                shadowColor: "#F5C518",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.5,
                shadowRadius: 12,
                elevation: 8,
              }}
            >
              <Text className="text-text-on-yellow text-xl font-black">+</Text>
            </View>
          </View>
        </LinearGradient>
      </View>

      {/* ═══ CATEGORIES ═══ */}
      <View className="pt-3 pb-2">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerClassName="px-4 gap-2"
        >
          {CATEGORIES.map((cat) => (
            <CategoryChip
              key={cat}
              label={cat}
              active={activeCategory === cat}
              onPress={() => setActiveCategory(cat)}
            />
          ))}
        </ScrollView>
      </View>

      {/* ═══ SECTION TITLE ═══ */}
      <View className="px-4 pt-3 pb-3 flex-row justify-between items-center">
        <Text className="text-text-primary text-h2">
          {search
            ? `"${search}"`
            : activeCategory === "Todos"
            ? "Em destaque"
            : activeCategory}
        </Text>
        <Text className="text-brand text-[13px] font-bold">
          {searchedProducts.length} itens
        </Text>
      </View>
    </View>
  );

  const renderEmpty = () => (
    <EmptyState
      icon="search-outline"
      title={search ? "Nada encontrado" : "Nenhum anúncio"}
      subtitle={
        search
          ? `Ninguém anunciou "${search}" ainda. Tente outro termo.`
          : "Seja o primeiro a anunciar nesta categoria!"
      }
    />
  );

  return (
    <SafeAreaView className="flex-1 bg-root" edges={["top"]}>
      <FlatList
        data={searchedProducts}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item, index }) => (
          <View
            className={`flex-1 ${index % 2 === 0 ? "ml-4 mr-1.5" : "mr-4 ml-1.5"}`}
          >
            <ProductCard
              title={item.title}
              price={item.price}
              city={item.city}
              imageUrl={item.imageUrl}
              destaque={item.destaque}
              onPress={() => {}}
            />
          </View>
        )}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        contentContainerClassName="pb-24 gap-3"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#F5C518"
            colors={["#F5C518"]}
            progressBackgroundColor="#19191C"
          />
        }
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
