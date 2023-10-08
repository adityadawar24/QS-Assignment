import React from "react";
import CardComponent from "../card/Card.js";


const Ticket = ({ ticket , userMap}) => {
  const { title, userId ,id} = ticket;

  return (
    <CardComponent
    id = {id}
    userId = {userId}
      title={title}
      userMap = {userMap}
      description={
        <div className="discText">
</div>

      }
    />
  );
};

export default Ticket;
