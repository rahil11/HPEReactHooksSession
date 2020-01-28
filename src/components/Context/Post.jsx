import React, { useContext } from "react";
import { UserContext } from "../../App";

const Post = props => {
  const user = useContext(UserContext);
  return (
    <div>
      <h4>
        {props.data.title}{" "}
        {user.id === props.data.userId && <a href="#">Edit</a>}
      </h4>
      <p>{props.data.body}</p>
    </div>
  );
};

export default Post;
