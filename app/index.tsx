import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Index() {
  const [name, setName] = useState("");
  const router = useRouter();

  return (
    <View style={styles.container}>
          <Image
              source={require("../assets/images/note.png")} 
              style={styles.noteImg}
            />
      <Text style={styles.title}>MANAGE YOUR TASK</Text>

      {}
      <View style={styles.inputContainer}>
        <MaterialIcons name="email" size={24} color="#9b59b6" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push({ pathname: "/home", params: { user: name } })}
      >
        <Text style={styles.buttonText}>GET STARTED →</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  title: { fontSize: 24, color: "#9b59b6", marginBottom: 30 },

 
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    width: "80%",
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    padding: 10,
  },
  button: {
    backgroundColor: "#00bcd4",
    padding: 15,
    borderRadius: 10,
  },
  buttonText: { color: "white", fontWeight: "bold" },
    noteImg: { width: 150, height: 150, marginTop: 50 },
});
