import { View, Text, TouchableOpacity } from "react-native";
import { StatusBar } from "react-native";
import { query, where, getDocs } from "firebase/firestore";
import { db , userRef } from '@/firebaseConfig';
import React , {useEffect , useState} from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useAuth } from "@/context/authContext";
import { useRouter } from "expo-router"; // Import the useRouter hook

type User = {
  userId: string;
  username: string;
  profileUrl: string;
};
const ChatHeader = () => {
  const { user  } = useAuth();
  const router = useRouter(); 
  const [users , setUsers] = useState<User[]>([]);

  const navigateToGroupChat = () => {
    router.push({pathname:"/(app)/Modal" }); // Navigates to the GroupChat screen
  };
  
  const getUsers = async () => {
    try {
      const q = query(userRef, where("userId", "!=", user?.uid));
      const querySnapshot = await getDocs(q);
      let data:any = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data() });
      });
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
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
            marginRight:wp(3),
            borderRadius: hp(2.5), 
            backgroundColor: "white", 
            justifyContent: "center",
            alignItems: "center",
            marginLeft: hp(2), 
          }}
        >
          <Text style={{ fontSize: hp(3), color: "pink" }}>+</Text> 
        </TouchableOpacity>
        <TouchableOpacity
          onPress={()=>router.push("/(app)/GroupChat")} 
          style={{
            width: hp(5),
            height: hp(5),
            marginRight:wp(7),
            borderRadius: hp(2.5), 
            backgroundColor: "white", 
            justifyContent: "center",
            alignItems: "center",
            marginLeft: hp(2), 
          }}
        >
          <Text style={{ fontSize: hp(3), color: "pink" }}>G</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatHeader;
