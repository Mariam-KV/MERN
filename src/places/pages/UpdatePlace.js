import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { DUMMY_PLACES } from "./UserPlaces";
import useForm from "../../shared/hooks/useForm";
import "./PlaceForm.css";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/utils/validators";
function UpdatePlace() {
  const params = useParams().placeId;
  const place = DUMMY_PLACES.find((el) => el.id === params);
  const [formIsDisabled, setFormIsDisabled] = useState({
    title: true,
    description: true,
  });
  const [submitForm, inputHandler] = useForm({
    formIsDisabled,
    setFormIsDisabled,
  });
  if (!place) {
    return <h3>Couldn't find a place!</h3>;
  }

  return (
    <form className="place-form " onSubmit={submitForm}>
      <Input
        element="input"
        type="text"
        id="title"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        value={place.title}
        valid={true}
        onInput={inputHandler}
      />
      <Input
        element="textarea"
        type="text"
        id="description"
        label="Description"
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description."
        value={place.description}
        valid={true}
        onInput={inputHandler}
      />
      <Button
        type="submit"
        disabled={formIsDisabled.title || formIsDisabled.description}
      >
        Update place
      </Button>
    </form>
  );
}

export default UpdatePlace;
