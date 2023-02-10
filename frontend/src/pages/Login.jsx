import React from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import { users } from "../../AppContext";
// connecter un utilisateur 
export const Login = ({ navigation }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [message, setMessage] = React.useState("");
  const { setMe } = React.useContext(users);

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const data = await res.json();
      console.log(data);
      await fetch(`http://localhost:3000/users/${data.users}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstLogs: false,
        }),
      });
      if (res.status === 200 && data.firstLogs === true) {
        navigation.navigate("CurrentProfile");
        setMe(data.users);
      } else if (res.status === 200 && data.firstLogs === false) {
        navigation.navigate("User");
      } else {
        res.status === 400 && setMessage("Some error occured");
      }
    } catch (err) {
      console.log("ERREUR", err);
    }
  };

  return (
    <View style={styles.top}>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="text"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
      </View>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
          value={password}
        />
      </View>
      <Button onPress={handleSubmit} title="Submit"></Button>
      <View>{message ? <Text>{message}</Text> : null}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    margin: 10,
    fontSize: 20,
    padding: 10,
    backgroundColor: "white",
  },
  top: {
    marginTop: 200,
  },
});
