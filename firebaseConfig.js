// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {initializeAuth , getReactNativePersistence} from "firebase/auth"
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getFirestore , collection} from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyAdwaltVwshytHOw_L3K2wWnQvmXo8l0tk",
  authDomain: "example-project-96c3d.firebaseapp.com",
  projectId: "example-project-96c3d",
  storageBucket: "example-project-96c3d.firebasestorage.app",
  messagingSenderId: "55657446864",
  appId: "1:55657446864:web:4a3577f88b898f5fa78dd5",
  measurementId: "G-HSYGY06DJR"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = initializeAuth(app,{
  persistence: getReactNativePersistence(AsyncStorage)  
})
export const db = getFirestore(app);
export const userRef = collection(db , 'users')
export const roomRef = collection(db , 'rooms')


