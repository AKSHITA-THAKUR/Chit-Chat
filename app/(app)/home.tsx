import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "@/context/authContext";
import { db } from "@/firebaseConfig";
import ChatList from "@/components/ChatList";
import { query, where, getDocs , doc, setDoc,collection, Timestamp} from "firebase/firestore";
import {  userRef } from "@/firebaseConfig";
type User = {
  userId: string;
  username: string;
  profileUrl: string;
};

const HomePage = () => {
  const { logout, user } = useAuth();
  const [users, setUsers] = useState<User[]>([]);


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
    setUsers(data);
    return data; 
  };


  useEffect(() => {
    if (user?.uid) {
      getUsers();
    }
  }, [user]);

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
