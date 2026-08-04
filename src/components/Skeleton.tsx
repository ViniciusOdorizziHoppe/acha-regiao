import { View, Animated } from "react-native";
import { useEffect, useRef } from "react";

export function SkeletonCard() {
  const shimmer = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmer, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(shimmer, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [shimmer]);

  const opacity = shimmer.interpolate({
    inputRange: [0, 1],
    outputRange: [0.25, 0.5],
  });

  return (
    <View className="bg-card rounded-card border border-border overflow-hidden flex-1">
      <Animated.View
        className="w-full aspect-[4/3] bg-input rounded-t-card"
        style={{ opacity }}
      />
      <View className="p-3 gap-2.5">
        <Animated.View className="h-4 bg-input rounded-md w-3/4" style={{ opacity }} />
        <Animated.View className="h-6 bg-input rounded-md w-1/2" style={{ opacity }} />
        <Animated.View className="h-3 bg-input rounded-md w-2/5" style={{ opacity }} />
      </View>
    </View>
  );
}
