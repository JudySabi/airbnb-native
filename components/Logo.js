import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { Image, StyleSheet } from "react-native";

const Logo = () => {
  return (
    <FontAwesome5 name="airbnb" size={40} color="tomato" style={styles.logo} />
  );
};

export default Logo;

const styles = StyleSheet.create({
  logo: {
    justifyContent: "center",
    alignItems: "center",
  },
});
