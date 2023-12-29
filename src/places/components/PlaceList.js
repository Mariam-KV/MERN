import React from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import Card from "../../shared/components/UIElements/Card";
import PlaceItem from "./PlaceItem";
import Button from "../../shared/components/FormElements/Button";
import "./PlaceList.css";
import { AuthContext } from "../../shared/context/auth-context";
const PlaceList = (props) => {
  const { userId } = useContext(AuthContext);
  const currentId = useParams().userId;
  console.log(userId, currentId);
  if (props.items.length === 0) {
    return (
      <div className="place-list center">
        {userId === currentId && (
          <Card>
            <h2>No places found. Maybe create one?</h2>
            <Button to="/places/new">Share Place</Button>
          </Card>
        )}
      </div>
    );
  }

  return (
    <ul className="place-list">
      {props.items.map((place) => (
        <PlaceItem
          key={place._id}
          id={place._id}
          image={place.image}
          title={place.title}
          description={place.description}
          address={place.address}
          creatorId={place.creator.toString()}
          coordinates={place.location}
          onPlacesChange={props.onPlacesChange}
        />
      ))}
    </ul>
  );
};

export default PlaceList;
