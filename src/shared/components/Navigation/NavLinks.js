import React from "react";
import "./NavLinks.css";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../shared/context/auth-context";
import Button from "../FormElements/Button";
function NavLinks(props) {
  const { isLoggedIn, login, logout } = useContext(AuthContext);

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          All Users
        </NavLink>
      </li>
      {isLoggedIn && (
        <li>
          <NavLink to="u1/places">My Places</NavLink>
        </li>
      )}
      {isLoggedIn && (
        <li>
          <NavLink to="/places/new">Add Places</NavLink>
        </li>
      )}
      {!isLoggedIn && (
        <li>
          <NavLink to="auth">Authenticate </NavLink>
        </li>
      )}
      <li>
        {isLoggedIn && <button onClick={() => logout()}>Log out</button>}
        {/* {!isLoggedIn && <button onClick={() => login()}> Log in</button>} */}
      </li>
    </ul>
  );
}

export default NavLinks;
