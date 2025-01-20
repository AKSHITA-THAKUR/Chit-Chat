import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { db } from "@/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useRouter } from "expo-router";

interface GroupData {
  id: string;
  groupName: string;
  members: string[];
  createdAt: any;
}

const GroupChat = () => {
  const [groups, setGroups] = useState<GroupData[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const fetchGroups = async () => {
    try {
      const groupCollectionRef = collection(db, "groupCollection");
      const groupSnapshot = await getDocs(groupCollectionRef);

      const groupList = groupSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(), 
      })) as GroupData[];

      setGroups(groupList); 
      setLoading(false); 
    } catch (error) {
      console.error("Error fetching groups: ", error);
      setLoading(false);
    }
  };
  const handleGroupPress = (group: GroupData) => {
    router.push({
      pathname: "/groupRoom",
      params: {
        groupId: group.id,
        groupName: group.groupName,
        members: JSON.stringify(group.members),
      },
    });
  };
  useEffect(() => {
    fetchGroups();
  }, []);

  const renderItem = ({ item }: { item: GroupData }) => (
    <TouchableOpacity
      style={styles.groupItem}
      onPress={() => {
        handleGroupPress(item);
      }}
    >
      <Text style={styles.groupName}>{item.groupName}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading groups...</Text>
      ) : (
        <FlatList
          data={groups}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  groupItem: {
    padding: 15,
    marginVertical: 10,
    backgroundColor: "#f1f1f1",
    borderRadius: 8,
  },
  groupName: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default GroupChat;
