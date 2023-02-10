import { users } from "../../AppContext";
import { useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Card } from "react-native-paper";
import React from "react";
//affichage les contacts matchers 
export const Contact = () => {
  const { me } = React.useContext(users);
  const [home, setHome] = React.useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/users/contact/${me}`)
      .then((res) => res.json())
      .then((data) => setHome(data.home))
      .catch((err) => console.log(err));
  }, []);

  const profils = () => (
    <View>
      {home.map((p, i) => {
        if (p.like === null || p.like === undefined) {
          return;
        } else {
          return (
            <View key={i}>
              <Card.Cover style={styles.img} source={{ uri: p.like.photo }} />
              <Card.Content>
                <Text style={styles.Text} variant="bodyMedium">
                  Pseudo : {p.usersId.firstname} {p.usersId.lastname}
                </Text>
                <Text style={styles.Text} variant="bodyMedium">
                  Distance : {p.like.distance} km
                </Text>
                <Text style={styles.Text} variant="bodyMedium">
                  Age : {p.usersId.age} ans
                </Text>
                <Text style={styles.Text} variant="bodyMedium">
                  Ville : {p.usersId.city}
                </Text>
                <Text style={styles.Text} variant="bodyMedium">
                  Sexe : {p.usersId.sexe}
                </Text>
                <Text style={styles.Text} variant="bodyMedium">
                  {`Description : ` + p.like.description}
                </Text>
              </Card.Content>
            </View>
          );
        }
      })}
    </View>
  );

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
});
