import { View, Text,  TouchableOpacity, StyleSheet } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useRouter } from "expo-router";
import React from "react";
import { Image } from "expo-image";

interface User {
  profileUrl: string;
  username: string;
  userId: string;
}

interface ChatItemProps {
  item: User;
}

const ChatItem: React.FC<ChatItemProps> = ({ item}) => {
  const router = useRouter();

    const handlePress = () => {
      router.push({
        pathname: "/chatRom",
        params: {
          profileUrl: item.profileUrl,
          username: item.username,
          userId: item.userId,
        },
      });
      console.log("the params to pass are " , item.profileUrl , item.userId , item.username)

    };
  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <Image
        source={item?.profileUrl}
        placeholder={require("../assets/images/avatar.jpg")}
        style={styles.avatar}
      />

      <View style={styles.textContainer}>
        <View style={styles.topRow}>
          <Text style={styles.name} numberOfLines={1}>
            {item.username}
          </Text>
          <Text style={styles.time} numberOfLines={1}>
            Time
          </Text>
        </View>

        {/* Last Message */}
        <Text style={styles.lastMessage} numberOfLines={1}>
          Last message
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: wp(4),
    paddingBottom: hp(1),
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: hp(1),
    width: wp(100),
    height: hp(10),
  },
  avatar: {
    height: hp(8),
    width: hp(8),
    borderRadius: hp(3),
  },
  textContainer: {
    flex: 1,
    marginLeft: wp(3),
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: hp(2),
    fontWeight: "600",
    color: "#333",
    marginRight: wp(2),
  },
  time: {
    fontSize: hp(1.6),
    fontWeight: "500",
    color: "#777",
    textAlign: "right",
    marginRight:wp(10),
    marginTop:hp(2)
  },
  lastMessage: {
    fontSize: hp(1.6),
    fontWeight: "500",
    color: "#777",
    marginTop: hp(0.5),
  },
});

export default ChatItem;
