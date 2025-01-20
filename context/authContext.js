import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import {  doc, getDoc, setDoc } from "firebase/firestore";
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      console.log("got user:", user?.email);
      if (user) {
        setIsAuthenticated(true);
        setUser(user);
        updateUserData(user.uid)
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    });
    return unsub;
  }, []);

const updateUserData = async(userId)=>{
const docRef = doc(db, 'users' , userId);
const docSnap = await getDoc(docRef)

if(docSnap.exists()){
  let data = docSnap.data();
  setUser({ username: data.username, profileUrl: data.profileUrl, userId: data.userId });
}
}

  const login = async (email, password) => {
    try {
       await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (error) {
      console.log("the error is ", error.message);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const Register = async (email, password, username, profileUrl) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("response of user is", response?.user);
      await setDoc(doc(db, "users", response?.user?.uid), {
        username,
        profileUrl,
        userId: response?.user?.uid,
      });
      return { success: true, data: response?.user };
    } catch (error) {
      console.error("Error during registration:", error.message);
      return { success: false, msg: error.message };
    }
  };
  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, Register }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error("useAuth must be wrapped inside AuthContextProvider");
  }
  return value;
};
