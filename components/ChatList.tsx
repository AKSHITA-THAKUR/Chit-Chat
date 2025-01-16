import { View, FlatList, StyleSheet } from "react-native";
import React from "react";
import ChatItem from "./ChatItem";

interface User {
  profileUrl: string;
  userId: string;
  username: string;
}

interface ChatListProps {
  users: User[];
}

const ChatList: React.FC<ChatListProps> = ({ users }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={(item) => item.userId} // Use userId as a unique key
        renderItem={({ item }) => <ChatItem item={item} />}
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
