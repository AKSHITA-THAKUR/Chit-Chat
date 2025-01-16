import { View, Text } from "react-native";
import { StatusBar } from "react-native";
import { Image } from "expo-image";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useAuth } from "@/context/authContext";
const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";
const ChatHeader = () => {
  const {user} = useAuth();
  return (
    <View
      style={{
        padding: hp(3),
        flexDirection: "row",
        justifyContent:"space-between",
        backgroundColor: "pink",
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
      }}
    >
      <StatusBar backgroundColor="pink" barStyle="light-content" />
      <Text style={{ fontSize: hp(3) }} className="font-bold text-white">
        Chats
      </Text>
      <Image
      source={user?.profileUrl}
        style={{ height: hp(6), aspectRatio: 1, borderRadius: 100 }}
        placeholder={{ blurhash }}
        contentFit="cover"
        transition={500}
      />
    </View>
  );
};

export default ChatHeader;
