import React, { useEffect } from "react";
import { Slot, useRouter, useSegments } from "expo-router";
import { useAuth, AuthContextProvider } from "../context/authContext";

const MainLayout = () => {
  const { isAuthenticated } = useAuth();
  const segments = useSegments(); 
  const router = useRouter();

  useEffect(() => {
    if (typeof isAuthenticated == "undefined") return;
    const inApp = segments[0] == "(app)";

    if (isAuthenticated && !inApp) {
      router.replace("/(app)/home");
    } else if (isAuthenticated == false) {
      router.replace("/signUp");
    }
  }, [isAuthenticated]);
  return <Slot />; //used to render the currently selected route. t dynamically renders the correct child screen based on the navigation state.
};
export default function _layout() {
  return (
      <AuthContextProvider>
        <MainLayout />
      </AuthContextProvider>
  );
}
