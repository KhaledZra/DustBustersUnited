import * as SplashScreen from "expo-splash-screen";
import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { Animated, Image, StyleSheet, View } from "react-native";

SplashScreen.preventAutoHideAsync().catch(() => {});

interface Props {
  children: ReactNode;
}

export function AnimatedAppLoader({ children }: Props) {
  const animation = useMemo(() => new Animated.Value(1), []);
  const [isAppReady, setAppReady] = useState(false);
  const [isSplashAnimationComplete, setAnimationComplete] = useState(false);
  const [isSplashReady, setSplashReady] = useState(false);
  const image = require("../images/splash.png");

  useEffect(() => {
    async function prepare() {
      setSplashReady(true);
    }

    prepare();
  }, []);

  useEffect(() => {
    if (isAppReady) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 2500,
        useNativeDriver: true,
      }).start(() => setAnimationComplete(true));
    }
  }, [isAppReady]);

  const onImageLoaded = useCallback(async () => {
    try {
      await SplashScreen.hideAsync();
      await Promise.all([]);
    } catch (e) {
    } finally {
      setAppReady(true);
    }
  }, []);

  return (
    <View style={{ flex: 1}}>
      
      {isAppReady && children}
      {!isSplashAnimationComplete && isSplashReady && (
        <Animated.View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: "#23293f",
              opacity: animation,
              alignItems:"center",
              justifyContent: "center"
            },
          ]}
        >
          <Image
            style={{
              width: "100%",
            }}
            source={image}
            onLoadEnd={onImageLoaded}
            fadeDuration={10}
          />
        </Animated.View>
      )}
    </View>
  );
}
