import React from "react";
import { useCallback, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/auth-context";
function useForm({ formIsDisabled, setFormIsDisabled }) {
  const { isLoggedIn, login, logout } = useContext(AuthContext);
  const submitForm = (event) => {
    event.preventDefault();
    login();
  };
  const inputHandler = useCallback((id, value, isValid) => {
    setFormIsDisabled((prevState) => ({
      ...prevState,
      [id]: !isValid,
    }));
  }, []);
  return [submitForm, inputHandler];
}

export default useForm;
