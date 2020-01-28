import React, { useContext } from "react";
import { UserContext } from "../../App";

const Header = props => {
  const user = useContext(UserContext);
  return (
    <div>
      <p style={{ float: "right" }}>
        Logged in as - <b>{`${user.name} (ID: ${user.id})`}</b>
      </p>
      <h1>Welcome!</h1>
    </div>
  );
};

export default Header;
