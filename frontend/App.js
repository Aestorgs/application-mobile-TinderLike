import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Register } from "./src/pages/Register";
import { Login } from "./src/pages/Login";
import { Home } from "./src/pages/Home";
import MaterialIcons from "react-native-vector-icons/AntDesign";
import React from "react";
import { CurrentProfile } from "./src/pages/CurrentProfile";
import { User } from "./src/pages/User";
import { users } from "./AppContext";
import { Contact } from "./src/pages/Contact";

const Stack = createNativeStackNavigator();
export default function App() {
  const [me, setMe] = React.useState();
  return (
    <users.Provider value={{ me, setMe }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={({ navigation }) => ({
              headerRight: () => (
                <MaterialIcons
                  name="login"
                  size={30}
                  color={"555"}
                  onPress={() => navigation.navigate("Login", {})}
                />
              ),
              headerLeft: () => (
                <MaterialIcons
                  name="adduser"
                  size={30}
                  color={"555"}
                  onPress={() => navigation.navigate("Register", {})}
                />
              ),
            })}
          />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="CurrentProfile" component={CurrentProfile} />
          <Stack.Screen name="User" component={User} 
          options={({ navigation }) => ({
            headerRight: () => (
              <MaterialIcons
                name="login"
                size={30}
                color={"555"}
                onPress={() => navigation.navigate("Login", {})}
              />
            ),
            headerLeft: () => (
              <MaterialIcons
                name="staro"
                size={30}
                color={"555"}
                onPress={() => navigation.navigate("Contact", {})}
              />
            ),
          })} />
          <Stack.Screen name="Contact" component={Contact}  />
        </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </users.Provider>
  );
}


