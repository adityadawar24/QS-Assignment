import React from "react";
import { Card } from "antd";
import {
  UserOutlined,CheckCircleTwoTone,
} from "@ant-design/icons";
import './Card.css'

function CardComponent({id, title, description, buttonText,userId,userMap }) {
  function getUserName(str) {                 // Function to get the user's name based on their id
    for (let i = 0; i < userMap.length; i++) {
      if (userMap[i].id === str) {
        return  userMap[i].name
      }
    }
  }
  return (                      //card with its description
    <Card className="card">
      <div className="cardTitle" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "#B8BABE" }}>
        <div>{id}</div>
      <div style={{color:"black"}}><UserOutlined style={{ marginRight: "5px" }} />
             {getUserName(userId)}</div>
      </div>
      <div className="card-body">
        <h5 className="card-title" >
          <CheckCircleTwoTone
            style={{ marginRight: "5px", color: "#52c41a" }}
          />
          {title}
        </h5>
        <div className="card-text">
          {description}
        </div>
        <div className="request">
        <h5><i class="fa-solid fa-ellipsis-h" style={{padding: "20px"}}></i><i class="fa-solid fa-circle" style={{color: "lightgray"}}></i> <strong  style={{color: "gray"}}>Feature Request</strong></h5>
        </div>
      </div>
    </Card>
  );
}

export default CardComponent;
