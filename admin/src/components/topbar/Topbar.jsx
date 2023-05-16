import React from "react";
import "./topbar.css";
import {
  NotificationsNone,
  Language,
  Settings,
  Logout,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { logout } from "../../redux/apiCalls";

const Button = styled.button`
  background-color: #f44336;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e53935;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #ff7961;
  }
`;

export default function Topbar() {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    logout(dispatch);
    console.log("sdss");
  };

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">admin</span>
        </div>
        <div className="topRight">
          {/* <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div> */}
          {user ? (
            <div className="topbarIconContainer">
              <Logout onClick={handleClick} />
            </div>
          ) : (
            <>
              <Button style={{ background: "#39a043" }}>Нэвтрэх</Button>
            </>
          )}

          {/* <img
            src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
            className="topAvatar"
          /> */}
        </div>
      </div>
    </div>
  );
}
