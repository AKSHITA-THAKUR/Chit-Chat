import React, { useEffect } from "react";
import { Slot, useRouter, useSegments } from "expo-router";
import { useAuth, AuthContextProvider } from "../context/authContext";
import { MenuProvider } from "react-native-popup-menu";

const MainLayout = () => {
  const { isAuthenticated } = useAuth();
  const segments = useSegments(); //This hooks returns the array of all routes
  const router = useRouter();

  useEffect(() => {
    if (typeof isAuthenticated == "undefined") return;
    const inApp = segments[0] == "(app)";

    if (isAuthenticated && !inApp) {
      router.replace("/(app)/home");
    } else if (isAuthenticated == false) {
      router.replace("/signUp");
    }
    //check if user is authentiacted or not
  }, [isAuthenticated]);
  return <Slot />;
};
export default function _layout() {
  return (
    <MenuProvider>
      <AuthContextProvider>
        <MainLayout />
      </AuthContextProvider>
    </MenuProvider>
  );
}
