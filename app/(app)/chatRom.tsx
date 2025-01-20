import React, { useEffect, useState, useRef } from "react";
import { useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import {
  addDoc,
  collection,
  doc,
  orderBy,
  setDoc,
  Timestamp,
  query,
  onSnapshot,
  DocumentData,
} from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { useAuth } from "@/context/authContext";
import MessageList from "@/components/MessageList";
import { getRoomId } from "../../common";

const ChatRoomHeader: React.FC = () => {
  const router = useRouter();
  const [message, setMessage] = useState<DocumentData[]>([]);
  const { user } = useAuth(); //This is the user id of authenticated person
  const textRef = useRef<string>();
  const inputRef = useRef<TextInput>(null);
  const { profileUrl, username, userId } = useLocalSearchParams(); // Access params

  const handleSend = async () => {
    let message = textRef?.current?.trim();
    if (!message) return;
    try {
      let roomId = getRoomId(user?.userId, userId);
      const docRef = doc(db, "rooms", roomId);
      const messageRef = collection(docRef, "messages");
      textRef.current = "";
      if (inputRef) inputRef?.current?.clear();
      const newDoc = await addDoc(messageRef, {
        userId: user?.userId,
        text: message,
        profileUrl: user?.profileUrl,
        senderName: user?.username,
        createdAt: Timestamp.fromDate(new Date()),
      });
      console.log("new message id is", newDoc.id);
    } catch (error: any) {
      Alert.alert("Message", error.message);
    }
  };

  const createRoomIfNotExist = async () => {
    let roomId = getRoomId(user?.userId, userId);
    await setDoc(doc(db, "rooms", roomId), {
      roomId,
      createdAt: Timestamp.fromDate(new Date()),
    });
  };

  useEffect(() => {
    createRoomIfNotExist();
    let roomId = getRoomId(user?.userId, userId);
    const docRef = doc(db, "rooms", roomId);
    const messageRef = collection(docRef, "messages");
    const q = query(messageRef, orderBy("createdAt", "asc"));

    let unsub = onSnapshot(q, (snapshot) => {
      let allMessages = snapshot.docs.map((doc) => {
        return doc.data();
      });
      setMessage([...allMessages]);
    });
    return unsub;
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.headerContainer}>
        <View style={styles.leftContainer}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Image
            source={profileUrl}
            placeholder={require("../../assets/images/avatar.jpg")}
            style={styles.profileImage}
          />
        </View>

        <Text style={styles.username}>{username}</Text>

        <View style={styles.rightContainer}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="call" size={20} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="videocam" size={20} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      <MessageList message={message} User={user} />

      <View style={styles.inputContainer}>
        <TextInput
          ref={inputRef}
          onChangeText={(value) => (textRef.current = value)}
          placeholder="Type your message..."
          style={styles.input}
          multiline={true}
        />
        <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
          <Ionicons name="send" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "#fff",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: hp(8),
    height: hp(8),
    borderRadius: 20,
    marginLeft: 10,
  },
  username: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  iconButton: {
    margin: 10,
  },
  inputContainer: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f9f9f9",
    width: wp(100),
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ChatRoomHeader;
