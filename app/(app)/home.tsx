import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "@/context/authContext";
import ChatList from "@/components/ChatList";
import { query, where, getDocs } from "firebase/firestore";
import { userRef } from "@/firebaseConfig";
const HomePage = () => {
  const { logout, user } = useAuth();
  const [users, setUsers] = useState([]);

  const handleLogout = async () => {
    await logout();
  };

  const getUsers = async () => {
    // Fetch users from Firebase
    const q = query(userRef, where("userId", "!=", user?.uid));
    const querySnapshot = await getDocs(q);
    let data:any = [];
    querySnapshot.forEach((doc) => {
      data.push({ ...doc.data() });
    });
    console.log('got users: ' , data )
    setUsers(data);
  };

  useEffect(() => {
    if (user?.uid) {
      getUsers();
    }
  }, []);

  console.log("user data ", user);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {users.length > 0 ? (
          <ChatList currentUser={user} users={users} />
        ) : (
          <ActivityIndicator size="large" />
        )}
      </View>
      <Button title="LOGOUT" onPress={handleLogout} />
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
