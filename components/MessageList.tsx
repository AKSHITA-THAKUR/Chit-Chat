import { View, Text, FlatList, StyleSheet } from "react-native";
import React from "react";
import { useRef } from "react";
import { RefObject } from "react";
import { heightPercentageToDP as hp , widthPercentageToDP as wp } from "react-native-responsive-screen";
import { DocumentData } from "firebase/firestore";

interface User {
  profileUrl: string;
  userId: string;
  username: string;
}

interface MessageListProps {
  message: DocumentData[];
  User: User;
}

const MessageList: React.FC<MessageListProps> = ({ message, User  }) => {
    const scrollViewRef = useRef<any>(null);
  
  return (
    <FlatList
    ref={scrollViewRef}
      data={message}
      keyExtractor={(item, index) => index.toString()} 
      renderItem={({ item }) => {
        const isCurrentUser = User?.userId === item?.userId;
      
        return (
          <View
            style={[
              styles.messageContainer,
              isCurrentUser ? styles.currentUserMessage : styles.otherUserMessage,
            ]}
          >
            <Text style={isCurrentUser ? styles.currentUserText : styles.otherUserText}>
              {item?.text || "No Text"}
            </Text>
          </View>
        );
      }}
      contentContainerStyle={{ paddingBottom: 80 }} // Add padding for input
      onContentSizeChange={() => {
        scrollViewRef?.current?.scrollToEnd({ animated: true });
      }}
    />
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    marginVertical: 5,
    maxWidth: "70%",
    borderRadius: 10,
    padding: hp(2),
  },
  currentUserMessage: {
    backgroundColor: "#007bff", 
    alignSelf: "flex-end", 
    marginRight: 10,
  },
  otherUserMessage: {
    backgroundColor: "lightgray", 
    alignSelf: "flex-start", 
    marginLeft: 10,
  },
  currentUserText: {
    color: "#fff", 
  },
  otherUserText: {
    color: "#333", 
  },
});

export default MessageList;
