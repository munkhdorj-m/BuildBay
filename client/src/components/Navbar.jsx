import { AccountCircle, Search, ShoppingCart } from "@mui/icons-material";
import { Badge } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";
import SearchBar from "./SearchBar";

const links = [
  { to: "/products", label: "Бүх бараа" },
  { to: "/products/haalga", label: "Хаалга" },
  // { to: "/products", label: "Обой" },
  // { to: "/products", label: "Цонх" },
  // { to: "/products", label: "Шал" },
];

const NavContainer = styled.nav`
  display: flex;
  padding: 1px;
  justify-content: space-evenly;
  align-items: center;
  box-shadow: 0 6px 20px rgba(56, 125, 255, 0.17);
  -webkit-filter: drop-shadow(0 6px 20px rgba(56, 125, 255, 0.017));
  filter: drop-shadow(0 6px 20px rgba(56, 125, 255, 0.017));
  background-color: #f8f9fa;
  ${mobile({ height: "50px" })};
  text-decoration: none;
`;

const NavLogo = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  color: #22202e;
  ${mobile({ fontSize: "24px" })}
`;

const NavLinks = styled.ul`
  display: flex;
  text-decoration: none;
  justify-content: center;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 44px;
  color: #22202e;
`;

const NavItem = styled.li`
  margin: 0 0.5rem;
  color: #22202e;
  &:last-child {
    margin-right: 0;
  }
`;

const NavLink = styled(Link)`
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: bold;
`;

const SideActions = styled.ul`
  display: flex;
  align-items: center;
  padding: 5px;
  gap: 20px;
  color: #22202e;
  a:hover {
    color: #22202e;
  }
`;

const Button = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 20px 30px;
  gap: 20px;
  background: #5a45f2;
  border-radius: 8px;
  box-shadow: 0 2px #666;
  &:hover {
    background: #22202e;
  }
  &:active {
    transform: translateY(4px);
  }
  font-weight: 700;
  font-size: 18px;
  line-height: 16px;
  color: #ffffff;
`;

function Navbar() {
  return (
    <NavContainer>
      <Link to="/ " style={{ textDecoration: "none" }}>
        <NavLogo>
          <img
            src="logo.png"
            style={{
              width: 60,
              height: 60,
              borderRadius: "50px",
              marginRight: 10,
              top: 0,
            }}
          ></img>
          LOGO
        </NavLogo>
      </Link>
      <NavLinks>
        {links.map((link) => (
          <NavItem key={link.to}>
            <NavLink style={{ textDecoration: "none" }} to={link.to}>
              {link.label}
            </NavLink>
          </NavItem>
        ))}
      </NavLinks>

      <SideActions>
        <SearchBar />
        <Search />
        <Link to="/cart ">
          <Badge badgeContent={4} color={"primary"}>
            <ShoppingCart>Сагс</ShoppingCart>
          </Badge>
        </Link>
        <Link to="/profile">
          <AccountCircle />
        </Link>
        <Link to="/login" style={{ textDecoration: "none" }}>
          <Button>Нэвтрэх</Button>
        </Link>
      </SideActions>
    </NavContainer>
  );
}

export default Navbar;
