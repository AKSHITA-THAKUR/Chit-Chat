import { useState, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/authContext";

const SignUp = () => {
  const router = useRouter(); 
  const {Register} = useAuth();
  const usernameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const profileUrlRef = useRef("");

  const handleSignUp = async () => {
    if (!usernameRef.current || !emailRef.current || !passwordRef.current || !profileUrlRef.current) {
      Alert.alert("Please fill out all fields");
      return;
    }
    let response = await Register(emailRef.current ,passwordRef.current , usernameRef.current , profileUrlRef.current );
    console.log('got result: ' , response)
    // console.log({
    //   username: usernameRef.current,
    //   email: emailRef.current,
    //   password: passwordRef.current,
    //   profileUrl: profileUrlRef.current,
    // });
 if(!response.success){
  Alert.alert("Failed to create account. Please check your details and try again." , response.msg)
 }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      {/* Username Input */}
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#a1a1aa"
        onChangeText={(value) => (usernameRef.current = value)}
      />

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#a1a1aa"
        keyboardType="email-address"
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

      {/* Profile URL Input */}
      <TextInput
        style={styles.input}
        placeholder="Profile URL"
        placeholderTextColor="#a1a1aa"
        onChangeText={(value) => (profileUrlRef.current = value)}
      />

      {/* Sign-Up Button */}
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Link to Sign-In */}
      <View style={styles.linkContainer}>
        <Text style={styles.linkText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => router.push("/signUp")}>
          <Text style={styles.linkActionText}>Sign In</Text>
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

export default SignUp;
