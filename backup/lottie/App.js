import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  Animated,
  Button,
} from "react-native";
import LottieView from "lottie-react-native";

const Header = () => {
  return (
    <View style={[{ backgroundColor: "green", width: "100%" }]}>
      <Text
        style={[
          {
            color: "#fff",
            textAlign: "center",
            fontWeight: "bold",
          },
        ]}
      >
        Header
      </Text>
    </View>
  );
};

const DATA = [...Array.from({ length: 30 }).keys()];

export default function App() {
  const scrollY = new Animated.Value(0);
  const ref = React.useRef(null);
  const diffClamp = Animated.diffClamp(scrollY, 0, 45);
  const translateY = diffClamp.interpolate({
    inputRange: [0, 45],
    outputRange: [0, -45],
    extrapolate: "clamp",
  });

  const renderItem = (item, index) => {
    return (
      <View
        style={[
          {
            padding: 20,
            marginTop: 10,
            backgroundColor: "red",
            width: "100%",
          },
        ]}
      >
        <Text
          style={[
            { flex: 1, textAlign: "center", color: "#fff", fontSize: 20 },
          ]}
        >
          {item}
        </Text>
      </View>
    );
  };

  const resetAnimation = () => {
    ref?.current?.reset();
    ref?.current?.play();
  };

  React.useEffect(() => {
    ref?.current?.play();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <Animated.View
        style={[
          {
            transform: [{ translateY: translateY }],
          },
        ]}
      >
        <Header />
      </Animated.View>

      {/* <FlatList
        // bounces={false}
        showsVerticalScrollIndicator={false}
        data={DATA}
        style={[
          {
            flex: 1,
            width: "100%",
            marginTop: 20,
            borderTopWidth: 1,
            borderColor: "gray",
          },
        ]}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => renderItem(item, index)}
        onScroll={(e) => {
          if (e.nativeEvent.contentOffset.y > 0) {
            scrollY.setValue(e.nativeEvent.contentOffset.y);
          }
        }}
      /> */}
      <LottieView
        ref={ref}
        style={{
          width: 400,
          height: 400,
          backgroundColor: "#eee",
        }}
        source={require("./gradientBall.json")}
        // OR find more Lottie files @ https://lottiefiles.com/featured
        // Just click the one you like, place that file in the 'assets' folder to the left, and replace the above 'require' statement
      />
      <View style={styles.buttonContainer}>
        <Button title="Restart Animation" onPress={resetAnimation} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
