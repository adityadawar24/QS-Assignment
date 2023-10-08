import React, { useState } from 'react';
import './Navbar.css';

const Navbar = ({ onOrderByChange, onGroupByChange }) => {
  // Initialize state variables
  const [isOpen, setIsOpen] = useState(false);
  const [orderBy, setOrderBy] = useState(() => localStorage.getItem("orderBy") || "--Select--");
  const [groupBy, setGroupBy] = useState(() => localStorage.getItem("groupBy") || "--Select--");

  //to toggle the dropdown visibility
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  //for changing options

  const handleOrderByChange = (e) => {
    const orderByValue = e.target.value;
    setOrderBy(orderByValue);
    localStorage.setItem("orderBy", orderByValue); // Store in localStorage
    onOrderByChange(orderByValue);
  };

  const handleGroupByChange = (e) => {
    const groupByValue = e.target.value;
    setGroupBy(groupByValue);
    localStorage.setItem("groupBy", groupByValue); 
    onGroupByChange(groupByValue);
  };

//navigation bar with a dropdown for display options

  return (
    <nav className="navbar">
      <div className="nav-item">
        <button className="nav-button" onClick={toggleDropdown}>
          <i className='fa-solid fa-sliders'></i> Display <i className="fa-solid fa-angle-down"></i>
        </button>
        {isOpen && (
          <div className="dropdown">
            <div className="itemRow">
            <p>Grouping</p>
              <select className="nav-button" onChange={handleGroupByChange} value={groupBy}>
                <option value="user">User</option>
                <option value="status">Status</option>
                <option value="priority">Priority</option>
              </select>
            </div>
            <div className="itemRow">
            <p>Ordering</p>
              <select className="nav-button" onChange={handleOrderByChange} value={orderBy}>
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
              
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
