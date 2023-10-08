import React from "react";
import Ticket from "../ticket/Ticket.js";
import "./Column.css";

const Column = ({ title, tickets, userMap }) => {
  const numberOfTickets = tickets.length;    //Calculate the number of tickets in the column
  const priorityLabels = {      // Define priority and status labels with corresponding icons
    0: {
      label: "No Priority",
      icon: (
        <i className="fa-regular fa-circle-xmark" style={{ color: "#ff0000" }}></i>
      ),
    },
    1: {
      label: "Low",
      icon: (
        <i className="fa-solid fa-signal" style={{ color: "#FFCC4D" }}></i>
      ),
    },
    2: {
      label: "Medium",
      icon: (
        <i className="fa-solid fa-signal" style={{ color: "#3e85fe" }}></i>
      ),
    },
    3: {
      label: "High",
      icon: (
        <i className="fa-solid fa-signal" style={{ color: "#57fa00" }}></i>
      ),
    },
    4: {
      label: "Urgent",
      icon: (
        <i className="fa-solid fa-exclamation-circle" style={{ color: "#d10000" }}></i>
      ),
    },
  };
  const statusLabels = {
    "Todo": {
      label: "Todo",
      icon: (
        <i className="fa-solid fa-check-square" style={{ color: "#ff0000" }}></i>
      ),
    },
    "In progress": {
      label: "In Progress",
      icon: (
        <i className="fa-solid fa-spinner" style={{ color: "#3e85fe" }}></i>
      ),
    },
    "Backlog": {
      label: "Done",
      icon: (
        <i className="fa-solid fa-check-circle" style={{ color: "#99004a" }}></i>
      ),
    },
  };

  let label = title;
  let icon = <i className="fa-solid fa-user" style={{ color: "#969696" }}></i>;


  // Check if the title matches a priority or status label, and update label and icon accordingly
  if (priorityLabels.hasOwnProperty(title)) {
    const priorityData = priorityLabels[title];
    label = priorityData.label;
    icon = priorityData.icon;
  } else if (statusLabels.hasOwnProperty(title)) {
    const statusData = statusLabels[title];
    label = statusData.label;
    icon = statusData.icon;
  }

  return (
    <div className="boardColumn">
      <div className="Title">
        {icon}
        <h4>{label}</h4>
        {numberOfTickets}
        <div>
  <button className="icon-button">
    <i className="fa-solid fa-plus"></i>
  </button>
  <button className="icon-button">
    <i className="fa-solid fa-ellipsis" style={{ marginLeft: "10px" }}></i>
  </button>
</div>
      </div>
      {tickets.map((ticket) => (
        <Ticket key={ticket.id} ticket={ticket} userMap={userMap} />
      ))}
    </div>
  );
};

export default Column;
