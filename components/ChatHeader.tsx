import { View, Text, TouchableOpacity } from "react-native";
import { StatusBar } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useAuth } from "@/context/authContext";
import { useRouter } from "expo-router"; // Import the useRouter hook

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const ChatHeader = () => {
  const { user } = useAuth();
  const router = useRouter(); 

  const navigateToGroupChat = () => {
    router.push("/GroupChat"); // Navigates to the GroupChat screen
  };

  return (
    <View
      style={{
        padding: hp(3),
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "pink",
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
      }}
    >
      <StatusBar backgroundColor="pink" barStyle="light-content" />
      <Text style={{ fontSize: hp(3) }} className="font-bold text-white">
        Chats
      </Text>
      
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>

        
        {/* Round button next to the profile */}
        <TouchableOpacity
          onPress={navigateToGroupChat} // On press, navigate to the GroupChat screen
          style={{
            width: hp(5),
            height: hp(5),
            marginRight:wp(7),
            borderRadius: hp(2.5), // Circular button
            backgroundColor: "white", // Button color
            justifyContent: "center",
            alignItems: "center",
            marginLeft: hp(2), 
          }}
        >
          <Text style={{ fontSize: hp(3), color: "pink" }}>+</Text> {/* The 'G' can be an icon or text */}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatHeader;
