import React, { useState, useEffect } from "react";
import { Text, View, Image, StyleSheet, Button } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
const axios = require("axios");

const RoomScreen = ({ route, navigation }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = route.params;
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://express-airbnb-api.herokuapp.com/rooms/${id}`
      );
      setData(response.data);
      setLoading(true);
    };

    fetchData();
  }, []);
  console.log(route.params.id);
  return !loading ? (
    <Text>En cours de chargement</Text>
  ) : (
    <ScrollView>
      <Text>l'id : {JSON.stringify(id)}</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </ScrollView>
  );
};

export default RoomScreen;
