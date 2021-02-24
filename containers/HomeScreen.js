import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import { Button, Text, View, FlatList } from "react-native";
import CardRoom from "../components/CardRoom";
const axios = require("axios");

export default function HomeScreen() {
  const navigation = useNavigation();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://express-airbnb-api.herokuapp.com/rooms"
        );
        setData(res.data);
        setLoading(true);
        console.log(res.data[0]);
      } catch (error) {
        alert(error.response.data.error);
      }
    };
    fetchData();
  }, []);

  return !loading ? (
    <Text>En cours de chargement</Text>
  ) : (
    <FlatList
      data={data}
      // renderItem={(obj) => {
      //   console.log(obj.item.title);
      // }}

      // renderItem avec destructuring :
      renderItem={({ item }) => {
        console.log(item.title);
        return <CardRoom item={item} />;
      }}
      keyExtractor={(item) => item.id}
    />
  );
}
