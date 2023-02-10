import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { Picker } from "@react-native-picker/picker";
// enregistrer un utilisateur 
export const Register = ({ navigation }) => {
  const [firstname, setFirstname] = React.useState("");
  const [lastname, setLastname] = React.useState("");
  const [city, setCity] = React.useState("");
  const [age, setAge] = React.useState("");
  const [sexe, setSexe] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [firstLogs, setFirstLogs] = React.useState(true);
  const [message, setMessage] = React.useState("");

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://localhost:3000/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname: firstname,
          lastname: lastname,
          city: city,
          age: Number(age),
          sexe: sexe,
          email: email,
          password: password,
          firstLogs: firstLogs,
        }),
      });

      if (res.status === 201) {
        navigation.navigate("Login");
      } else {
        res.status === 400 && setMessage("Some error occured");
      }
    } catch (err) {
      console.log("ERREUR", err);
    }
  };

  return (
    <View>
      <Picker
        selectedValue={sexe}
        onValueChange={(itemValue, itemIndex) => setSexe(itemValue)}
      >
        <Picker.Item label="Men" value="Men" />
        <Picker.Item label="Women" value="Women" />
        <Picker.Item label="Transgender" value="transgender" />
      </Picker>

      <View>
        <TextInput
          style={styles.input}
          placeholder="Firstname"
          keyboardType="text"
          onChangeText={(text) => setFirstname(text)}
          value={firstname}
        />
      </View>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Lastname"
          KeyboardType="text"
          onChangeText={(text) => setLastname(text)}
          value={lastname}
        />
      </View>

      <View>
        <TextInput
          style={styles.input}
          placeholder="City"
          keyboardType="text"
          onChangeText={(text) => setCity(text)}
          value={city}
        />
      </View>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
      </View>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Age"
          onChangeText={(text) => setAge(text)}
          value={age}
          keyboardType="numeric"
        />
      </View>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
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
});
