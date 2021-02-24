import React, { useState, useEffect, Dimensions } from "react";
import { Text, View, Image, StyleSheet, Button } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
const axios = require("axios");

const RoomScreen = ({ route, navigation }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = route.params;
  // const window = Dimensions.get("window");
  // const screen = Dimensions.get("screen");
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
  // console.log(data.photos);
  return !loading ? (
    <Text>En cours de chargement</Text>
  ) : (
    <ScrollView>
      <ScrollView horizontal>
        <View style={{ flexDirection: "row" }}>
          {data.photos.map((elem) => {
            // console.log(elem.url);
            return (
              <Image
                key={elem.picture_id}
                source={{ uri: elem.url }}
                style={style.photos}
                resizeMode="cover"
              ></Image>
            );
          })}
        </View>
      </ScrollView>
      <Text style={style.price}>{data.price} €</Text>

      <View style={{ width: "95%" }}>
        <Text style={style.title}>{data.title}</Text>
      </View>
      {/* <Text>l'id : {JSON.stringify(id)}</Text> */}
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </ScrollView>
  );
};

export default RoomScreen;

const style = StyleSheet.create({
  photos: {
    height: 250,
    width: 400,
    // width: window,
    marginRight: 10,
  },
  price: {
    backgroundColor: "#2A2A2A",
    color: "white",
    width: "28%",
    fontSize: 21,
    // padding: 10,
    textAlign: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    position: "relative",
    bottom: 80,
  },
  title: {
    fontSize: 24,
  },
});
