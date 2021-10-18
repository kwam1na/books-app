import React from 'react';
import {
  Nav,
  NavLink,
  NavMenu
} from './NavbarElements';

const Navbar = () => {
  return (
    <>
      <Nav className="nav">
        <NavMenu className="nav">
          <NavLink to='/books' activeStyle={{ color: "#282c34", fontWeight: "bold" }}>
            SEARCH
          </NavLink>
          <NavLink to='/library' activeStyle={{ color: "#282c34", fontWeight: "bold" }}>
            LIBRARY
          </NavLink>
        </NavMenu>
      </Nav>
    </>
  );
};

export default Navbar;