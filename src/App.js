import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import useAuthHook from "./shared/hooks/auth-hook";
import { AuthContext } from "./shared/context/auth-context";
import LoadingSpinner from "./shared/components/UIElements/LoadingSpinner";

const Users = React.lazy(() => import("./user/pages/Users"));
const NewPlace = React.lazy(() => import("./places/pages/NewPlace"));
const UserPlaces = React.lazy(() => import("./places/pages/UserPlaces"));
const UpdatePlace = React.lazy(() => import("./places/pages/UpdatePlace"));
const MainNavigation = React.lazy(() =>
  import("./shared/components/Navigation/MainNavigation")
);
const Auth = React.lazy(() => import("./user/pages/Auth"));

const App = () => {
  const { token, login, logout, userId } = useAuthHook();
  let routes;

  if (token) {
    routes = (
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/:userId/places" element={<UserPlaces />} />
        <Route path="/places/new" element={<NewPlace />} />
        <Route path="/places/update/:placeId" element={<UpdatePlace />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/:userId/places" element={<UserPlaces />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token,
        login: login,
        logout: logout,
        userId,
      }}
    >
      <BrowserRouter>
        <Suspense
          fallback={
            <div className="center">
              <LoadingSpinner asOverlay />
            </div>
          }
        >
          <MainNavigation />
          <main>{routes}</main>
        </Suspense>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;
