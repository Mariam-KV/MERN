import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Users from "./user/pages/Users";
import NewPlace from "./NewPlace";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
function App() {
  return (
    <>
      <MainNavigation />
      <main><Routes>
          <Route path="/" element={<Users />} />
          <Route path="/places/new" element={<NewPlace />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
