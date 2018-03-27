import React from "react";
import { NavLink } from "react-router-dom";

function Navbar(props) {
  const { user, onSignOut = () => {} } = props;
  const handleSignOut = event => {
    event.preventDefault();
    onSignOut();
  };
  return (

    <nav className="Navbar" style={{ backgroundColor: "#D3D2EA" }}>
      <NavLink style={{ padding: "20px" }} exact to="/">
        Home
      </NavLink>
      <NavLink style={{ padding: "20px" }} exact to="/">
        Auctions
      </NavLink>
      <NavLink style={{ padding: "20px" }} exact to="/auctions/new">

        New Auction
      </NavLink>
      {user ? (
        [

          <span style={{ padding: "20px" }} key="1">
            Hello, {user.first_name}
          </span>,

          <a key="2" href="/sign_out" onClick={handleSignOut}>
            Sign Out
          </a>
        ]
      ) : (

        <NavLink style={{ padding: "20px" }} exact to="/sign_in">

          Sign In
        </NavLink>
      )}
    </nav>
  );
}

export default Navbar;
