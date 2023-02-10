import { StyleSheet, Text, View } from "react-native";
// affichage de l'accueil 
export const Home = () => {
  return (
    <View>
      <Text style={styles.title}>Welcome TinderLike</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    marginTop: 300,
    fontSize: 20,
    padding: 10,
    textAlign: "center",
  },
});
