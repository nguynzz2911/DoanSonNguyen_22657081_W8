import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Add() {
  const [job, setJob] = useState("");
  const router = useRouter();

const handleAdd = async () => {
  const newJob = { id: Date.now(), title: job };

  await fetch("https://jsonplaceholder.typicode.com/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newJob),
  });

  router.push({
    pathname: "/home",
    params: { newJob: JSON.stringify(newJob) },
  });
};


  return (
    <View style={styles.container}>

      <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
        <Image
          source={require("../assets/images/back.png")} 
          style={styles.backIcon}
        />
      </TouchableOpacity>


      <View style={styles.headerContainer}>
        <Image
          source={require("../assets/images/avatar.png")}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.header}>Hi Twinkle</Text>
          <Text style={styles.sub}>Have a great day ahead</Text>
        </View>
      </View>


      <Text style={styles.title}>ADD YOUR JOB</Text>

      <View style={styles.inputContainer}>
        <Image
          source={require("../assets/images/task.png")} 
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.input}
          placeholder="input your job"
          value={job}
          onChangeText={setJob}
        />
      </View>


      <TouchableOpacity style={styles.button} onPress={handleAdd}>
        <Text style={styles.buttonText}>FINISH →</Text>
      </TouchableOpacity>


      <Image
        source={require("../assets/images/note.png")} 
        style={styles.noteImg}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 60,
  },


  backBtn: {
    position: "absolute",
    top: 50,
    left: 20,
    padding: 6,
    borderRadius: 20,
    backgroundColor: "#f2f2f2",
  },
  backIcon: { width: 18, height: 18, tintColor: "#000" },


  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  header: { fontSize: 20, fontWeight: "bold", color: "#000" },
  sub: { color: "#777" },

  
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 10,
    width: "80%",
    marginBottom: 25,
  },
  inputIcon: { width: 20, height: 20, tintColor: "#00bcd4", marginRight: 8 },
  input: { flex: 1, paddingVertical: 10 },


  button: {
    backgroundColor: "#00bcd4",
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 10,
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },

  
  noteImg: { width: 130, height: 130, marginTop: 50 },
});
