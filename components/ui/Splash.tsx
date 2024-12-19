import React, { useEffect } from "react";
import LottieView from "lottie-react-native";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";

import { View, StyleSheet } from "react-native";
import { colors } from "@/constants";

interface Props {
    onDone: () => void;
}

const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

const Splash: React.FC<Props> = ({ onDone }) => {
  const width = useSharedValue(0);

  const config = {
    duration: 500,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  };

  const style = useAnimatedStyle(() => {
    return {
        width: withSpring(width.value),
        height: 150
    }
  });

  useEffect(() => {
    width.value = withSpring(200, config); 
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => onDone(), 3000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.overlay}>
      <AnimatedLottieView
        autoPlay
        style={[styles.lottie, style]}
        onAnimationFinish={onDone}
        source={require("@/assets/animations/done.json")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.light.background,
    height: "100%",
    opacity: 1,
    width: "100%",
    zIndex: 1,
  },
  lottie: {
    width: 50,
    height: 50,
  }
});

export default Splash;
