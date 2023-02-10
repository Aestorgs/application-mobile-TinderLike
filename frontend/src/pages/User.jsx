import React from "react";
import { users } from "../../AppContext";
import { useEffect } from "react";
import { View, Text, Button, ScrollView, StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import MaterialIcons from "react-native-vector-icons/AntDesign";
// affichage des profils et choisir un profil et l'ajouter dans contact 
export const User = () => {
  const { me } = React.useContext(users);
  const [profil, setProfil] = React.useState([]);
  const [message, setMessage] = React.useState("");

  const handleSubmitLike = async (p) => {
    try {
      const res = await fetch("http://localhost:3000/home", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          profil: p.users?.id,
          like: p.users?.id,
          usersId: p.users?.id,
          users: me,
        }),
      });

      if (res.status === 201) {
        setMessage({
          id: p.users.id,
          message: <Text style={styles.message}>You have Like</Text>,
        });
      } else {
        res.status === 400 && setMessage("Some error occured");
      }
    } catch (err) {
      console.log("ERREUR", err);
    }
  };

  const handleSubmitNoLike = async (p) => {
    try {
      const res = await fetch("http://localhost:3000/home", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          profil: p.users?.id,
          dislike: p.users?.id,
          usersId: p.users?.id,
          users: me,
        }),
      });

      if (res.status === 201) {
        setMessage({
          id: p.users.id,
          message: <Text style={styles.message}>You have No Like </Text>,
        });
      } else {
        res.status === 400 && setMessage("Some error occured");
      }
    } catch (err) {
      console.log("ERREUR", err);
    }
  };

  useEffect(() => {
    fetch(`http://localhost:3000/profil`)
      .then((res) => res.json())
      .then((data) => setProfil(data))
      .catch((err) => console.log(err));
  }, []);

  const profils = () =>
    profil.map((p, i) => {
      return (
        <View key={i}>
          <Card.Cover style={styles.img} source={{ uri: p.photo }} />
          <Card.Content>
            <Text style={styles.Text} variant="bodyMedium">
              Pseudo : {p.users.firstname} {p.users.lastname}
            </Text>
            <Text style={styles.Text} variant="bodyMedium">
              Distance : {p.distance} km
            </Text>
            <Text style={styles.Text} variant="bodyMedium">
              Age : {p.users.age} ans
            </Text>
            <Text style={styles.Text} variant="bodyMedium">
              Ville : {p.users.city}
            </Text>
            <Text style={styles.Text} variant="bodyMedium">
              Sexe : {p.users.sexe}
            </Text>
            <Text style={styles.Text} variant="bodyMedium">
              {`Description : ` + p.description}
            </Text>
          </Card.Content>
          <Card.Actions>
            <View>
              <MaterialIcons
                style={{ marginRight: 40 }}
                name="heart"
                size={30}
                color={"555"}
                onPress={() => handleSubmitLike(p)}
              >
                <Button title=""></Button>
              </MaterialIcons>
            </View>
            <View>
              <MaterialIcons
                style={{ marginRight: 100 }}
                name="hearto"
                size={30}
                color={"555"}
                onPress={() => handleSubmitNoLike(p)}
              >
                <Button title=""></Button>
              </MaterialIcons>
            </View>
          </Card.Actions>
          <View>
            <Text style={{ margin: 10 }}>
              {p.users.id === message.id && message.message}
            </Text>
          </View>
        </View>
      );
    });
  return <ScrollView>{profils()}</ScrollView>;
};

const styles = StyleSheet.create({
  img: {
    padding: 10,
    marginLeft: 20,
    resizeMode: "contain",
    width: 350,
    height: 350,
  },
  Text: {
    padding: 10,
    fontWeight: "bold",
    fontSize: 20,
  },
  message: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
});
