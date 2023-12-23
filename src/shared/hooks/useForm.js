import React from "react";
import { useCallback, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/auth-context";
function useForm({ formIsDisabled, setFormIsDisabled }) {
  const [inputs, setInputs] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const { isLoggedIn, login, logout } = useContext(AuthContext);
  const submitForm = async (event) => {
    event.preventDefault();
    console.log(inputs, 777);
    if (!isLoggedIn) {
      setIsLoading(true);
      fetch("http://localhost:5000/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputs),
      })
        .then((res) => {
          res.json();
        })
        .then((message) => {
          setIsLoading(false);
          console.log(message);
          login();
        })
        .catch((err) => {
          setIsLoading(false);
          setError(err.message);
          console.log(err);
        });
    }
  };
  console.log(isLoading, error);
  const inputHandler = useCallback((id, value, isValid) => {
    setInputs((prevState) => ({
      ...prevState,
      [id]: value,
    }));
    setFormIsDisabled((prevState) => ({
      ...prevState,
      [id]: !isValid,
    }));
  }, []);
  return [submitForm, inputHandler, isLoading, error];
}

export default useForm;
