import React, { useState, useEffect } from "react";
import Column from "../column/Column";
import "antd/dist/reset.css";
import "./Board.css";
import axios from "axios";
import Navbar from "../Navbar/Navbar";

const KanbanBoard = () => {                               // Define and initialize state variables using useState
  const [tickets, setTickets] = useState([]);
  const [userMap, setUserMap] = useState([]);
  const [groupingOption, setGroupingOption] = useState(
    localStorage.getItem("groupingOption") || "status"
  );
  const [sortedBy, setSortedBy] = useState(
    localStorage.getItem("sortedBy") || "priority"
  );
  
  useEffect(() => {                    // useEffect to fetch data from an API
    async function fetchData() {
      const data = (await axios.get("https://api.quicksell.co/v1/internal/frontend-assignment")).data;
      setUserMap(data.users);
      setTickets(data.tickets);
    }
    fetchData();
  }, []);

// Event handler for changing the grouping option
  const handleGroupByChange = async (groupByValue) => {
    setGroupingOption(groupByValue); 
  };

  //for changing the sorting option
  const handleOrderByChange = async (orderByValue) => {
    setSortedBy(orderByValue); 
  };  

//to save groupingOption to local storage when it changes
  useEffect(() => {
    localStorage.setItem("groupingOption", groupingOption);
  }, [groupingOption]);

  function getUserName(str) {                       //to get the user's name based on their ID
    for (let i = 0; i < userMap.length; i++) {
      if (userMap[i].id === str) {
        return  userMap[i].name
      }
    }
  }
  useEffect(() => {
    localStorage.setItem("sortedBy", sortedBy);
  }, [sortedBy]);


  //group tickets based on the selected option (status, user, priority)
  const groupTicketsByOption = (tickets, option) => {
    const groupedTickets = {};

    tickets.forEach((ticket) => {
      const key =
        option === "status"
          ? ticket.status
          : option === "user"
          ? getUserName(ticket.userId)
          : ticket.priority;
      if (!groupedTickets[key]) {
        groupedTickets[key] = [];
      }
      groupedTickets[key].push(ticket);
    });

    return groupedTickets;
  };

  const sortTicketsByOption = (groupedTickets, option) => {
    const sortedTickets = {};

    Object.keys(groupedTickets).forEach((groupTitle) => {
      const group = groupedTickets[groupTitle];
      sortedTickets[groupTitle] =
        option === "priority"
          ? group.sort((a, b) => b.priority - a.priority)
          : group.sort((a, b) => a.title.localeCompare(b.title));
    });
    return sortedTickets;
  };
  
  console.log({tickets});
  console.log({sortedBy});
  console.log({groupingOption});


  const groupedTickets = groupTicketsByOption(tickets, groupingOption);
  const sortedTickets = sortTicketsByOption(groupedTickets, sortedBy);
  console.log({sortedTickets});
  return (
    <>
    <Navbar
    onOrderByChange={handleOrderByChange}
    onGroupByChange={handleGroupByChange}/>

    <div className="kanban-board">
      <div className="board-columns">
        {Object.keys(sortedTickets).map((groupTitle) => (
          <Column
            key={groupTitle}
            title={groupTitle}
            tickets={sortedTickets[groupTitle]}
            userMap = {userMap}
          />
        ))}
      </div>
    </div>
    </>
  );
};

export default KanbanBoard;
