import React, { useState, useContext } from "react";
import Map from "../../shared/components/UIElements/Map";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import { AuthContext } from "../../shared/context/auth-context";
import "./PlaceItem.css";
const PlaceItem = (props) => {
  const { isLoggedIn } = useContext(AuthContext);
  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  return (
    <React.Fragment>
      <Modal
        show={showMap}
        onCancel={() => setShowMap(false)}
        header={props.address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={() => setShowMap(true)}>CLOSE</Button>}
      >
        <div className="map-container">
          <Map
            center={props.coordinates}
            zoom={16}
            style={{ width: "100%", height: "400px" }}
          />
        </div>
      </Modal>
      <Modal
        show={showConfirmModal}
        onCancel={() => setShowConfirmModal(false)}
        header="Are you sure?"
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={
          <>
            <Button
              danger
              onClick={() => {
                setShowConfirmModal(false);
                console.log("deleting");
              }}
            >
              Delete
            </Button>
            <Button inverse onClick={() => setShowConfirmModal(false)}>
              Cancel
            </Button>
          </>
        }
      />

      <li className="place-item">
        <Card className="place-item__content">
          <div className="place-item__image">
            <img src={props.image} alt={props.title} />
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={() => setShowMap(true)}>
              VIEW ON MAP
            </Button>
            {isLoggedIn ? (
              <>
                <Button to={`/places/${props.id}`}>EDIT</Button>
                <Button danger onClick={() => setShowConfirmModal(true)}>
                  DELETE
                </Button>
              </>
            ) : (
              ""
            )}
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default PlaceItem;
