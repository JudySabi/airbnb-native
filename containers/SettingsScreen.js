import React from "react";
import Logo from "../components/Logo";
import { useNavigation } from "@react-navigation/core";

import { Button, Text, View } from "react-native";

export default function SettingsScreen({ setToken }) {
  const navigation = useNavigation();

  return (
    <View>
      <Logo />
      <Text>Hello Settings</Text>
      <Button
        title="Go to Profile"
        onPress={() => {
          navigation.navigate("Profile", { userId: 123 });
        }}
      />

      <Button
        title="Log Out"
        onPress={() => {
          setToken(null);
        }}
      />
    </View>
  );
}
