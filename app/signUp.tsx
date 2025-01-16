import { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/authContext";
const SignIn = () => {
  const router = useRouter(); 
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const handleSignIn = async () => {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert("Please fill out all fields");
      return;
    }
    const response = await login(emailRef.current , passwordRef.current);
    if(!response.success){
      Alert.alert('Sign In' , response.msg)
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>

      {/* Username Input */}
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#a1a1aa"
        onChangeText={(value) => (emailRef.current = value)}
      />

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#a1a1aa"
        secureTextEntry
        onChangeText={(value) => (passwordRef.current = value)}
      />

      {/* Sign-In Button */}
      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      {/* Link to Sign-Up */}
      <View style={styles.linkContainer}>
        <Text style={styles.linkText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => router.push("/signIn")}>
          <Text style={styles.linkActionText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    color: "#1f2937", // text-gray-800 equivalent
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#d1d5db", // border-gray-300 equivalent
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    color: "#000",
  },
  button: {
    width: "100%",
    backgroundColor: "#3b82f6", // bg-blue-500 equivalent
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  linkContainer: {
    flexDirection: "row",
    marginTop: 8,
  },
  linkText: {
    color: "#6b7280", // text-gray-600 equivalent
    fontSize: 14,
  },
  linkActionText: {
    color: "#3b82f6", // text-blue-500 equivalent
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default SignIn;
