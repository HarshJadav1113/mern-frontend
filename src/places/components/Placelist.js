import React from "react";
import "./Placelist.css";
import Placeitems from "./Placeitems";
import Card from "../../shared/components/UIComponents/Card";
import Button from "../../shared/components/Formcomponent/Button";


const Placelist = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="place-list center"> 
        <Card>
          <h2>No places found. Maybe Create one?</h2>
          <Button to="/places/new">Share Place</Button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="place-list">
      {props.items.map((place) => (
        <Placeitems
          key={place.id}
          id={place.id}
          image={place.image}
          title={place.title}
          address={place.address}
          description={place.description}
          creatorId={place.creator}
          coordinates={place.location}
          onDelete={props.onDeletePlace}
        />
      ))}
    </ul>
  );
};

export default Placelist;
