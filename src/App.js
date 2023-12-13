import React, { useState, useCallback } from "react";
import { Route, Routes, Navigate, redirect } from "react-router-dom";
import Users from "./user/pages/Users";
import Auth from "./user/pages/Auth";
import UserPlaces from "./places/pages/UserPlaces";
import UpdatePlace from "./places/pages/UpdatePlace";
import NewPlace from "./places/pages/NewPlace";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import { AuthContext } from "./shared/context/auth-context";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      <MainNavigation />
      <main>
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/:userId/places" exact element={<UserPlaces />} />

          <Route
            path="/places/new"
            element={!isLoggedIn ? <Navigate to="/auth" /> : <NewPlace />}
          />
          <Route
            path="/auth"
            element={isLoggedIn ? <Navigate to="/" /> : <Auth />}
          />
          <Route
            path="/places/:placeId"
            element={
              isLoggedIn ? <UpdatePlace /> : <p>You need to be logged in!</p>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </AuthContext.Provider>
  );
}

export default App;
