import React, { useState } from "react";
import { Button } from "react-bootstrap";
//router
import { useNavigate, NavLink } from "react-router-dom";
//context
import { useUserDispatch } from "../../context";
// Actions types
import * as ActionTypes from "../../constans/ActionTypes";

function ProfileDropdown(props) {
    const dispatch = useUserDispatch();
  const [showItems, setShowItems] = useState(false);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const dropDown = () => {
    setShowItems(!showItems);
  };

  const handleLogut = () => {
    localStorage.clear();
    dispatch({
      type: ActionTypes.CART_COUNT,
      payload: 0,
    });
    navigate("/");
  };
  return (
    <div className="profile-dropdown">
      <div className="profile_dropdown_container" onClick={dropDown}>
        <span className="nav-link-span">
          <img src="/images/account.png" />
          <p className="mb-0 profile_title">Profile</p>
        </span>
      </div>
      <div
        className="profile_dropdown_body"
        style={{ display: showItems ? "block" : "none" }}
      >
        <div className="text-end">
          <p className="profile_text mb-0">{user && user.name}</p>
          <p className="profile_text mb-0">{user && user.email}</p>
          <p className="profile_text mb-0">{user && user.mobile}</p>
        </div>
        <div>
          <div className="logout_button_wrapper">
            <NavLink to="/orders" className="dashboard-link">
              Orders
            </NavLink>

            {user && user.userType === "@adm!n" && (
              <div>
                <NavLink to="/admin/dashboard" className="dashboard-link">
                  Dashboard
                </NavLink>
              </div>
            )}
          </div>

          <Button className="logout_btn" onClick={handleLogut}>
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProfileDropdown;
