import { Text, View, TouchableOpacity, Image, StyleSheet } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/core";
import { AntDesign } from "@expo/vector-icons";

const CardRoom = ({ item }) => {
  const navigation = useNavigation();
  //   console.log(item);
  return (
    <TouchableOpacity
      style={style.CardRoom}
      //   key={item._id}
      onPress={() => {
        navigation.navigate("RoomScreen", { id: item._id });
      }}
    >
      <View>
        <Image source={{ uri: item.photos[0].url }} style={style.img}></Image>
        <Text>{item.price} €</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text>{item.title}</Text>
        <AntDesign name="star" size={24} color="black" />
        <AntDesign name="staro" size={24} color="black" />
        <Text>{item.ratingValue}</Text>
        <Image
          source={{ uri: item.user.account.photo.url }}
          resizeMode="contain"
          style={style.avatar}
        ></Image>
      </View>
    </TouchableOpacity>
  );
};
export default CardRoom;

const style = StyleSheet.create({
  CardRoom: {
    height: 300,
    width: "95%",
    marginTop: 20,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
    alignSelf: "center",
  },
  img: {
    height: 200,
    width: "100%",
    alignSelf: "center",
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
});
