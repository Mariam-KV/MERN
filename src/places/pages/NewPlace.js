import React, { useCallback, useState } from "react";

import Input from "../../shared/components/FormElements/Button/Input";
import {
  VALIDATOR_adress,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/utils/validators";
import "./NewPlace.css";
import Button from "../../shared/components/FormElements/Button/Button";

const NewPlace = () => {
  const [{ title, text, adress }, setFormIsDisabled] = useState({
    title: true,
    text: true,
    adress: true,
  });
  const submitForm = (event) => {
    event.preventDefault();
  };
  const titleInputHandler = useCallback((id, value, isValid) => {
    setFormIsDisabled((prevState) => ({
      ...prevState,
      title: !isValid,
    }));
  }, []);
  const descriptionInputHandler = useCallback((id, value, isValid) => {
    setFormIsDisabled((prevState) => ({
      ...prevState,
      text: !isValid,
    }));
  }, []);
  const adressInputHandler = useCallback((id, value, isValid) => {
    setFormIsDisabled((prevState) => ({
      ...prevState,
      adress: !isValid,
    }));
  }, []);

  console.log(title, text);
  return (
    <form className="place-form" onSubmit={submitForm}>
      <Input
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={titleInputHandler}
      />
      <Input
        element="textarea"
        type="text"
        id="description"
        label="Description"
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description."
        onInput={descriptionInputHandler}
      />
      <Input
        element="input"
        type="adress"
        id="adress"
        label="Adress"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid adress."
        onInput={adressInputHandler}
      />
      <Button type="submit" disabled={title || text || adress}>
        Add Place
      </Button>
    </form>
  );
};

export default NewPlace;
