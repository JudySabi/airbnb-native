import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Ionicons,
  AntDesign,
  FontAwesome,
  FontAwesome5,
} from "@expo/vector-icons";
import HomeScreen from "./containers/HomeScreen";
import ProfileScreen from "./containers/ProfileScreen";
import SignInScreen from "./containers/SignInScreen";
import SignUpScreen from "./containers/SignUpScreen";
import SettingsScreen from "./containers/SettingsScreen";
import RoomById from "./containers/RoomScreen";
import Logo from "./components/Logo";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const setToken = async (token) => {
    if (token) {
      // On l'enregistre dans l'asyncstorage (équivalent au cookie)
      AsyncStorage.setItem("userToken", token);
    } else {
      // on supprive le token de la mémoire de l'appareil
      AsyncStorage.removeItem("userToken");
    }

    setUserToken(token);
  };

  // des qu'on lance l'application, on regarde si un token est enregistré ou pas dans la mémoire de l'appareil
  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      // We should also handle error for production apps
      const userToken = await AsyncStorage.getItem("userToken");

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      setIsLoading(false);
      setUserToken(userToken);
    };

    bootstrapAsync();
  }, []);

  // console.log(userToken); // je récupère bien mon secret-token
  return (
    <NavigationContainer>
      {isLoading ? null : userToken === null ? ( // We haven't finished checking for the token yet
        // Si le token n'est pas là alors il affiche que ces deux écrans :
        <Stack.Navigator>
          <Stack.Screen name="SignIn" options={{ animationEnabled: false }}>
            {() => (
              <SignInScreen
                token={userToken}
                setToken={setToken}
                setName={setName}
                name={name}
                setPassword={setPassword}
                password={password}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="SignUp">
            {() => <SignUpScreen setToken={setToken} />}
          </Stack.Screen>
        </Stack.Navigator>
      ) : (
        // Si le token est présent alors les autres écrans nous sont proposé (home etc)

        <Stack.Navigator
          screenOptions={{
            title: <Logo />,
            headerStyle: {
              backgroundColor: "white",
              height: 110,
            },
            headerTitleStyle: {
              color: "white",
              alignSelf: "center",
            },
          }}
        >
          <Stack.Screen name="Tab" options={{ animationEnabled: false }}>
            {() => (
              <Tab.Navigator
                tabBarOptions={{
                  activeTintColor: "tomato",
                  inactiveTintColor: "gray",
                }}
                screenOptions={({ route, navigation }) => {
                  // console.log(route.name);
                  // console.log(navigation);
                  return { header: () => null };
                }}
              >
                {/* *********** ONGLETS *********** */}
                {/* ---------- HOME ---------- */}
                <Tab.Screen
                  name="Home"
                  options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color, size }) => {
                      return (
                        <Ionicons name={"ios-home"} size={size} color={color} />
                      );
                    },
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Home"
                        options={{
                          header: () => {
                            null;
                          },
                        }}
                      >
                        {() => <HomeScreen />}
                      </Stack.Screen>
                      <Stack.Screen
                        name="RoomScreen"
                        options={{
                          header: () => {
                            null;
                          },
                        }}
                      >
                        {(props) => <RoomById {...props} />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
                {/* ---------- AROUND ME ---------- */}
                <Tab.Screen
                  name="AroundMe"
                  options={{
                    tabBarLabel: "Around Me",
                    tabBarIcon: ({ color, size }) => (
                      <FontAwesome
                        name={"map-marker"}
                        size={size}
                        color={color}
                      />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="AroundMe"
                        options={{
                          header: () => {
                            null;
                          },
                        }}
                      >
                        {() => <SettingsScreen setToken={setToken} />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
                {/* ---------- My Profile ------------ */}
                <Tab.Screen
                  name="Setting"
                  options={{
                    tabBarLabel: "My Profil",
                    tabBarIcon: ({ color, size }) => (
                      <AntDesign name={"user"} size={size} color={color} />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Settings"
                        options={{
                          header: () => {
                            null;
                          },
                        }}
                      >
                        {() => <SettingsScreen setToken={setToken} />}
                      </Stack.Screen>
                      <Stack.Screen
                        name="Profile"
                        options={{
                          title: "User Profile",
                        }}
                      >
                        {() => <ProfileScreen />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
              </Tab.Navigator>
            )}
          </Stack.Screen>
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
