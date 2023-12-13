import React, {  useState } from "react";
import useForm from "../../shared/hooks/useForm";
import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/utils/validators";
import "./PlaceForm.css";
import Button from "../../shared/components/FormElements/Button";

const NewPlace = () => {
  const [formIsDisabled, setFormIsDisabled] = useState({
    title: true,
    description: true,
    adress: true,
  });
  const [submitForm, inputHandler] = useForm({
    formIsDisabled,
    setFormIsDisabled,
  });
  return (
    <form className="place-form" onSubmit={submitForm}>
      <Input
        element="input"
        type="text"
        label="Title"
        id="title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
      />
      <Input
        element="textarea"
        type="text"
        id="description"
        label="Description"
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description."
        onInput={inputHandler}
      />
      <Input
        element="input"
        type="adress"
        id="adress"
        label="Adress"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid adress."
        onInput={inputHandler}
      />
      <Button
        type="submit"
        disabled={
          formIsDisabled.title ||
          formIsDisabled.description ||
          formIsDisabled.adress
        }
      >
        Add Place
      </Button>
    </form>
  );
};

export default NewPlace;
