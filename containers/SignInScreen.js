import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { Button, Text, TextInput, View, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";

export default function SignInScreen({ setToken }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    const userToken = "secret-token";
    if (!email || !password) {
      alert("Hey ! U need to fill all inputs !");
    } else {
      try {
        const res = await axios.post(
          "https://express-airbnb-api.herokuapp.com/user/log_in",
          { email: email, password: password },
          {
            headers: {
              "content-type": "application/json",
            },
          }
        );
        if (res.status === 200) {
          setToken(userToken);
          alert(`Bienvenue ${res.data.email}`);
        }
      } catch (error) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <KeyboardAwareScrollView>
      <View>
        <Text>Name: </Text>
        <TextInput
          placeholder="Username"
          onChangeText={(text) => {
            setEmail(text);
          }}
          value={email}
        />
        <Text>{email}</Text>
        <Text>Password: </Text>
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(text) => {
            setPassword(text);
          }}
          value={password}
        />
        <Text>{password}</Text>
        <Button
          title="Sign in"
          onPress={async () => {
            handleSignIn();
          }}
        />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        >
          <Text>Create an account</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
}
