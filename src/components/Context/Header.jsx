import React from "react";

const Header = props => (
  <div>
    <p style={{ float: "right" }}>
      Logged in as - <b>{`${props.user.name} (ID: ${props.user.id})`}</b>
    </p>
    <h1>Welcome!</h1>
  </div>
);

export default Header;
