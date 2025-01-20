import {
  FlatList,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
} from "react-native";
import { useState, useEffect } from "react";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/authContext";
import { collection , doc , setDoc , Timestamp } from "firebase/firestore";
import { db } from "@/firebaseConfig";

interface User {
  userId: string;
  username: string;
  profileUrl: string;
}

export default function TransparentModal() {
  const router = useRouter();
  const { user, fetchAllUsers, userData } = useAuth();
  const [userList, setUserList] = useState<User[]>([]); // Define userList state with User[] type
  const [groupMembers, setGroupMembers] = useState<any>([]);
  const [groupName, setGroupName] = useState(""); // State for group name
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]); // Array to store userIds of selected users
  const newCollectionRef = collection(db, "groupCollection");

  useEffect(() => {
    fetchAllUsers();
  }, []);

  useEffect(() => {
    const filteredUsers = userData.filter(
      (item: User) => item.userId !== user?.userId
    );
    setUserList(filteredUsers);
    console.log("The userList is ", filteredUsers);
  }, [userData]);

  const toggleUserSelection = (userId: string) => {
    setSelectedUsers((prevSelected) => {
      if (prevSelected.includes(userId)) {
        return prevSelected.filter((id) => id !== userId);
      } else {
        return [...prevSelected, userId];
      }
    });
  };

  const createGroup = async() => {
    if (!groupName.trim()) {
      Alert.alert("Error", "Please enter a group name.");
      return;
    }
    if (selectedUsers.length === 0) {
      Alert.alert("Error", "Please select at least one member.");
      return;
    }
    const membersWithCurrentUser = [...selectedUsers, user?.userId];

    const memberIds = membersWithCurrentUser;
    try{
      const groupRef = doc(newCollectionRef);
      await setDoc(groupRef, {
        groupName: groupName, 
        members: memberIds,  
        createdAt: Timestamp.now(), 
      });
      Alert.alert("Group created successfully!");
      setGroupName("");
      setSelectedUsers([]);
    }
    catch (error) {
      console.error("Error creating group: ", error);
      Alert.alert("Error creating group. Please try again.");
    }
    console.log("Group Name:", groupName);
    console.log("Group Members:", memberIds);
    
  };



  const renderUserItem = ({ item }: { item: User }) => {
    const isSelected = selectedUsers.includes(item.userId);
    return (
      <TouchableOpacity
        style={styles.userItem}
        onPress={() => toggleUserSelection(item.userId)}
      >
        <Image
          source={{ uri: item.profileUrl }}
          style={styles.avatar}
          placeholder={require("../../assets/images/avatar.jpg")}
        />
        <Text style={styles.username}>{item.username}</Text>
        {isSelected && <Ionicons style={{marginLeft:widthPercentageToDP(40)}} name="add-circle" size={24} color="green" />}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create a Group</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter group name"
        value={groupName}
        onChangeText={setGroupName}
      />

      <Text style={styles.subHeading}>Add Group Members</Text>

      <FlatList
        data={userList} 
        renderItem={renderUserItem} 
        keyExtractor={(item) => item.userId} 
        contentContainerStyle={styles.flatlistContainer}
      />

      <TouchableOpacity style={styles.createButton}  onPress={createGroup}>
        <Text style={styles.createButtonText}>Create Group</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white", 
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  subHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#555",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  flatlistContainer: {
    paddingBottom: 20,
  },
  userItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  username: {
    fontSize: 18,
    color: "#333",
  },
  createButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  createButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
