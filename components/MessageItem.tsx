import { View, Text } from "react-native";
import React from "react";
import { DocumentData } from "firebase/firestore";

interface MessageListProps {
  message: DocumentData[];
}

const MessageItem: React.FC<MessageListProps> = ({ message }) => {
  return (
    <View>
      <Text>MessageItem</Text>
    </View>
  );
};

export default MessageItem;
