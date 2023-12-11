import React from "react";
import { Link } from "react-router-dom";
import SideDrawer from "./SideDrawer";
import MainHeader from "./MainHeader";
import { useState } from "react";
import "./MainNavigation.css";
import Backdrop from "../UIElements/Backdrop";
import NavLinks from "./NavLinks";
const MainNavigation = (props) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  function closeDrawer() {
  
    setDrawerOpen(false);
  }
  return (
    <>
      {drawerOpen && <Backdrop onClick={closeDrawer} />}
      <SideDrawer show={drawerOpen} onClick={closeDrawer}>
        <nav className="main-navigation__drawer-nav">
          <NavLinks />
        </nav>
      </SideDrawer>

      <MainHeader>
        <button
          className="main-navigation__menu-btn"
          onClick={() => setDrawerOpen(true)}
        >
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-navigation__title">
          <Link to="/">YourPlaces</Link>
        </h1>
        <nav className="main-navigation__header-nav ">
          <NavLinks />
        </nav>
      </MainHeader>
    </>
  );
};

export default MainNavigation;
