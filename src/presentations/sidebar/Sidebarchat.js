import React from 'react'
import "./sidebarchat.css"
import { Link } from "react-router-dom";
import { Avatar } from '@mui/material';

function Sidebarchat(props) {

  const { name, id } = props;

  return (
    <Link to={`/rooms/${id}`} style={{ textDecoration: "none" }}>
      <div className="Sidebarchat">
        <Avatar style={{ padding: "0 15px 0 13px" }} src={'https://avatars.dicebear.com/api/bottts/1.svg'} />
        <div className="SidebarChat_info">
          <h2 >{name}</h2>
        </div>
      </div>
    </Link>
  )
}
export default Sidebarchat
