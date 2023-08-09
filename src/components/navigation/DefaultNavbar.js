import React from "react";
import { Navbar, Container, Nav, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
//context
import { useUserState } from "../../context";
//components
import { ProfileDropdown } from "../elements";

function DefaultNavbar(props) {
  const state = useUserState();
  const user = JSON.parse(localStorage.getItem("user"));

  const root = (window.location.pathname + window.location.search).substr(1);
  return (
    <header className="default-navbar">
      <div>
        <NavLink to="/">
          <img src="/images/bb.png" width={50} height={50} />
        </NavLink>
      </div>
      <Nav className="ms-3">
        <div className="sub-nav-link">
          <NavLink to="/" className="header-link">
            Home
          </NavLink>
        </div>
        {state &&
          state.product_categories.length > 0 &&
          state.product_categories.map((item) => {
            return (
              <div
                key={item.id}
                className={root==`category?key=${item.id}` ? "cat_sub_link": ""}
              >
                <NavLink
                  to={`/category?key=${item.id}`}
                  className="header-link"
                >
                  {item.name}
                </NavLink>
              </div>
            );
          })}
        {/* <NavLink to="/shower?key=shower" className="header-link">
          Bath and shower
        </NavLink>
        <NavLink to="/maiotures?key=maiosture" className="header-link">
          Moisturizers
        </NavLink>
        <NavLink to="/fragments?key=fragment" className="header-link">
          Fragments
        </NavLink> */}
      </Nav>
      <Nav className="ms-auto sub-nav-link">
        <NavLink to="/about" className="header-link">
          <span className="nav-link-span">
            <img src="/images/info.png" />
            <p className="mb-0">About us</p>
          </span>
        </NavLink>
        {user !==null ? (
          <ProfileDropdown />
        ) : (
          <NavLink to="/login" className="header-link">
            <span className="nav-link-span">
              <img src="/images/account.png" />
              <p className="mb-0">Login</p>
            </span>
          </NavLink>
        )}

        <NavLink to="/cart" className="header-link">
          <span className="nav-link-span cart-span w-100 h-100">
            <img src="/images/shopping-cart.png" />
            <p className="mb-0">cart</p>
            {state.cart_count > 0 && (
              <span className="cart-number-container">{state.cart_count}</span>
            )}
          </span>
        </NavLink>
      </Nav>
    </header>
  );
}

export default DefaultNavbar;
