import { View, FlatList, StyleSheet } from "react-native";
import React from "react";
import ChatItem from "./ChatItem";

interface User {
  profileUrl: string;
  userId: string;
  username: string;
}
interface Group {
  groupId: string;
  groupName: string;
  members: string[];  // List of userIds for group members
  type: "group";  // Specify that it's a group
}

interface ChatListProps {
  users: User[];
  currentUser: User;
}

const ChatList: React.FC<ChatListProps> = ({ users ,currentUser }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={(item) => item.userId} // Use userId as a unique key
        renderItem={({ item }) => <ChatItem currentUser={currentUser} item={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ChatList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
