import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  Animated,
} from "react-native";

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

      <FlatList
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
      />
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
