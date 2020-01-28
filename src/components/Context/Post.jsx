import React from "react";

const Post = props => {
  return (
    <div>
      <h4>
        {props.data.title}{" "}
        {props.user.id === props.data.userId && <a href="#">Edit</a>}
      </h4>
      <p>{props.data.body}</p>
    </div>
  );
};

export default Post;
