import React, { useState } from "react";
import Logo from "../components/Logo";
import { Button, Text, TextInput, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";

export default function SignUpScreen({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");

  const handleSignUp = async () => {
    if (email && password && description && username) {
      if (password === confirmPassword) {
        try {
          const res = await axios.post(
            "https://express-airbnb-api.herokuapp.com/user/sign_up",
            {
              email: email,
              password: password,
              username: username,
              description: description,
            }
          );

          if (res.status === 200) {
            setToken(res.data.token);
            alert(`Welcome ${res.data.username} !`);
          }
        } catch (error) {
          alert(error.response.data.error);
        }
      } else {
        alert("Passwords arn't similar... Try again !");
      }
    } else {
      alert("Hey ! U need to fill all inputs !");
    }
  };

  return (
    <KeyboardAwareScrollView>
      <View>
        <Logo />
      </View>
      <View>
        <Text>Email: </Text>
        <TextInput
          placeholder="Email"
          onChangeText={(text) => {
            setEmail(text);
          }}
          value={email}
        />
        {/* <Text>{email}</Text> */}
        <Text>Username: </Text>
        <TextInput
          placeholder="Username"
          onChangeText={(text) => {
            setUsername(text);
          }}
          value={username}
        />
        {/* <Text>{username}</Text> */}
        <Text>Description: </Text>
        <TextInput
          placeholder="Description"
          onChangeText={(text) => {
            setDescription(text);
          }}
          value={description}
          multiline={true}
          style={{ height: 100 }}
        />
        {/* <Text>{description}</Text> */}
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
        <Text>Confirm Password: </Text>
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(text) => {
            setConfirmPassword(text);
          }}
          value={confirmPassword}
        />
        <Text>{confirmPassword}</Text>
        <Button
          title="Sign up"
          onPress={async () => {
            handleSignUp();
          }}
        />
      </View>
    </KeyboardAwareScrollView>
  );
}
