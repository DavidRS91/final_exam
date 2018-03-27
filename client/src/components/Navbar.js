import React from "react";
import { NavLink } from "react-router-dom";

function Navbar(props) {
  const { user, onSignOut = () => {} } = props;
  const handleSignOut = event => {
    event.preventDefault();
    onSignOut();
  };
  return (
    <nav className="Navbar">
      <NavLink exact to="/">
        Home
      </NavLink>
      <NavLink exact to="/">
        Auctions
      </NavLink>
      <NavLink exact to="/auctions/new">
        New Auction
      </NavLink>
      {user ? (
        [
          <span key="1">Hello, {user.first_name}</span>,
          <a key="2" href="/sign_out" onClick={handleSignOut}>
            Sign Out
          </a>
        ]
      ) : (
        <NavLink exact to="/sign_in">
          Sign In
        </NavLink>
      )}
    </nav>
  );
}

export default Navbar;
