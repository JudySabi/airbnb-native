import React, { useState, useEffect } from "react";
import MapView from "react-native-maps";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import * as Location from "expo-location";
const axios = require("axios");

const AroundMeScreen = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [coords, setCoords] = useState([]);

  useEffect(() => {
    // alias le fetchdata
    const askPermissionAndGetLocation = async () => {
      console.log("Permission");
      try {
        // Demande d'autorisation d'accès à la localisation de l'appareil
        const { status } = await Location.requestPermissionsAsync();
        console.log(status);

        if (status !== "granted") {
          console.log("Permission refusée");
          alert("vous n'avez pas permis la localisation");
        } else {
          console.log("Permission acceptée");
          // Obtenir les coordonnées GPS
          const location = await Location.getCurrentPositionAsync();
          //   console.log(location);

          const response = await axios.get(
            `https://express-airbnb-api.herokuapp.com/rooms/around?latitude=${latitude}&longitude=${longitude}`
          );
          setCoords(response.data);
          //   console.log(response.data);
          console.log(coords);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    askPermissionAndGetLocation();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Location</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 48.856614,
          longitude: 2.3522219,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
        showsUserLocation={true}
      >
        {/* {coords.map((item, index) => {
          return (
            <MapView.Marker
              coordinate={{
                latitude: item.latitude,
                longitude: item.longitude,
              }}
              key={index}
            />
          );
        })} */}
      </MapView>
    </View>
  );
};

export default AroundMeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
