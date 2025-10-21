import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

interface Task {
  id: number;
  title: string;
}

export default function Home() {
  const router = useRouter();
  const { user, newJob } = useLocalSearchParams<{ user?: string; newJob?: string }>();
  
  const [search, setSearch] = useState("");
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "To check email" },
    { id: 2, title: "UI task web page" },
    { id: 3, title: "Learn javascript basic" },
    { id: 4, title: "Learn HTML Advance" },
    { id: 5, title: "Medical App UI" },
    { id: 6, title: "Learn Java" },
  ]);

 
  useEffect(() => {
    if (newJob) {
      try {
        const parsed = JSON.parse(newJob);
        if (parsed.title) {
          setTasks((prev) => [
            ...prev,
            { id: prev.length + 1, title: parsed.title },
          ]);
        }
      } catch (e) {
        console.log("Không thể parse newJob:", e);
      }
    }
  }, [newJob]);

  return (
    <View style={styles.container}>
      {/* Nút Back */}
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Image source={require("../assets/images/back.png")} style={styles.backIcon} />
      </TouchableOpacity>

      {/* Header */}
      <View style={styles.headerContainer}>
        <Image
          source={require("../assets/images/avatar.png")}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.header}>Hi {user}</Text>
          <Text style={styles.sub}>Have a great day ahead</Text>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Image
          source={require("../assets/images/search.png")}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Task List */}
      <FlatList
        data={tasks.filter((t) =>
          t.title.toLowerCase().includes(search.toLowerCase())
        )}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.taskCard}>
            <Image
              source={require("../assets/images/check.png")}
              style={styles.checkIcon}
            />
            <Text style={styles.taskText}>{item.title}</Text>
            <TouchableOpacity>
              <Image
                source={require("../assets/images/edit.png")}
                style={styles.editIcon}
              />
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Add Button */}
      <TouchableOpacity style={styles.addBtn} onPress={() => router.push("/add")}>
        <Image
          source={require("../assets/images/plus.png")}
          style={{ width: 30, height: 30, tintColor: "#fff" }}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },

  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 10,
    backgroundColor: "#eee",
    borderRadius: 20,
    padding: 6,
  },
  backIcon: { width: 20, height: 20, tintColor: "#000" },

  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 60,
  },
  avatar: { width: 60, height: 60, borderRadius: 30, marginRight: 10 },
  header: { fontSize: 20, fontWeight: "bold", color: "#000" },
  sub: { color: "#888" },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  searchIcon: { width: 20, height: 20, tintColor: "#999", marginRight: 8 },
  searchInput: { flex: 1, paddingVertical: 8 },

  taskCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 20,
    padding: 12,
    marginBottom: 10,
    elevation: 2,
  },
  checkIcon: { width: 20, height: 20, tintColor: "green", marginRight: 10 },
  taskText: { flex: 1, fontSize: 16 },
  editIcon: { width: 20, height: 20, tintColor: "red" },

  addBtn: {
    backgroundColor: "#00bcd4",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 30,
    alignSelf: "center",
    elevation: 4,
  },
});
