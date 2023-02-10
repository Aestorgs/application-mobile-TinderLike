import { Button, Image, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { users } from "../../AppContext";
import * as ImagePicker from "expo-image-picker";
import { upload_preset, cloud_name, tags } from "@env";
// enregistrer un profil
export const CurrentProfile = ({ navigation }) => {
  const [photo, setPhoto] = React.useState("");
  const [distance, setDistance] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [message, setMessage] = React.useState("");
  const { me } = React.useContext(users);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
      quality: 1,
    });

    if (result.canceled) {
      return;
    }

    const { uri, type, base64 } = result.assets[0];
    const form = new FormData();
    form.append("file", `data:image/png;base64,${base64}`);
    form.append("upload_preset", upload_preset);
    form.append("cloud_name", cloud_name);
    form.append("tags", tags);
    fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
      method: "POST",
      body: form,
    })
      .then((res) => res.json())
      .then((data) => {
        setPhoto(data);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch(`http://localhost:3000/profil`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          photo: photo.url,
          description: description,
          distance: distance,
          users: me,
        }),
      });

      if (res.status === 201 || res.body) {
        navigation.navigate("User");
      } else {
        res.status === 400 && setMessage("Some error occured");
      }
    } catch (err) {
      console.log("ERREUR", err);
    }
  };

  return (
    <View>
      <View>
        <View>
          <Button title="X"></Button>
          {photo && (
            <Image
              source={{ uri: photo.url }}
              style={{ width: 200, height: 200, marginLeft: 90 }}
            />
          )}
          <Button onPress={pickImage} title="uploaded"></Button>
        </View>
        <View>
          <TextInput
            style={styles.input}
            placeholder="Distance"
            keyboardType="numeric"
            value={distance}
            onChangeText={(text) => setDistance(text)}
          />
        </View>

        <View style={styles.textAreaContainer}>
          <TextInput
            keyboardType="text"
            style={styles.textArea}
            placeholder="Description"
            numberOfLines={120}
            multiline={true}
            onChangeText={(text) => setDescription(text)}
          />
        </View>

        <View>
          <Button onPress={handleSubmit} title="Submit"></Button>
          <View>{message ? <Text>{message}</Text> : null}</View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textAreaContainer: {
    margin: 10,
    backgroundColor: "white",
    padding: 5,
  },
  textArea: {
    fontSize: 20,
    height: 150,
    justifyContent: "flex-start",
  },
  input: {
    margin: 10,
    fontSize: 20,
    padding: 10,
    backgroundColor: "white",
  },
});
