import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PlaceList from "../components/PlaceList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

import { useHttpClient } from "../../shared/hooks/http-hook";
const UserPlaces = () => {
  const { userId } = useParams();
  const [places, setPlaces] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  useEffect(() => {
    async function fPlacesByUserId() {
      try {
        const result = await sendRequest(
          `http://localhost:5000/api/users/id/${userId}`
        );
        setPlaces(result.places);
      } catch (err) {}
    }
    fPlacesByUserId();
  }, [sendRequest, userId]);
  function placesChange(id) {
    setPlaces((prev) => prev.filter((place) => place._id !== id));
  }

  return (
    <>
      {isLoading && <LoadingSpinner asOverlay />}
      {error && <ErrorModal error={error} onClear={clearError} />}
      {!isLoading && !error && (
        <PlaceList items={places} onPlacesChange={placesChange} />
      )}
    </>
  );
};

export default UserPlaces;
