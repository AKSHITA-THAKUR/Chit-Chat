import { View, Text, FlatList } from "react-native";
import React from "react";
import { DocumentData } from "firebase/firestore";

interface MessageListProps {
  message: DocumentData[]; 
}

const MessageList: React.FC<MessageListProps> = ({ message }) => {
    console.log(message)
  return (
    <View>
      <FlatList
        data={message}
        keyExtractor={(item, index) => index.toString()} // Ensure a unique key for each item
        renderItem={({ item }) => (
          <View>
            <Text>{item?.text || "No Text"}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default MessageList;
