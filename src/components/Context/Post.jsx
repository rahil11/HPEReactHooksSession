import React from "react";
export const Post = props => {
  return (
    <div>
      <h2>{props.data.title}</h2>
      <p>{props.data.body}</p>
    </div>
  );
};
