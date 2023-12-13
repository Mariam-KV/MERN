import React from "react";
import { useState } from "react";
import { AuthContext } from "../../shared/context/auth-context";
import useForm from "../../shared/hooks/useForm";
import Input from "../../shared/components/FormElements/Input";
import Card from "../../shared/components/UIElements/Card";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/utils/validators";
import Button from "../../shared/components/FormElements/Button";
import "./Auth.css";
import { useContext } from "react";
function Auth() {
  const { isLoggedIn, login, logout } = useContext(AuthContext);

  const [formIsDisabled, setFormIsDisabled] = useState({
    email: true,
    password: true,
    name: true,
  });
  const [isLogin, setIsLogin] = useState(false);
  const [submitForm, inputHandler] = useForm({
    setFormIsDisabled,
  });
  function switchModeHandler() {
    setIsLogin((prev) => !prev);
  }

  return (
    <Card className="authentication">
      <h2>Login Required</h2>
      <form onSubmit={submitForm}>
        {!isLogin && (
          <Input
            element="input"
            type="text"
            id="name"
            label="Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid name."
            onInput={inputHandler}
          />
        )}
        <Input
          element="input"
          type="text"
          id="email"
          label="Email"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL]}
          errorText="Please enter a valid email."
          onInput={inputHandler}
        />
        <Input
          element="input"
          type="text"
          id="password"
          label="Password"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid password."
          onInput={inputHandler}
        />
        <Button
          type="submit"
          disabled={
            formIsDisabled.email ||
            formIsDisabled.password ||
            (!isLogin ? formIsDisabled.name : "")
          }
        >
          {isLogin ? "Log in" : "Sign up"}
        </Button>
      </form>
      <Button inverse onClick={switchModeHandler}>
        Switch to {isLogin ? "Sign up" : "Log in"}
      </Button>
    </Card>
  );
}

export default Auth;
