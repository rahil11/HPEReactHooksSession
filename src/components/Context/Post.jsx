import React, { useContext } from "react";
import { UserContext } from "../../App";

const Post = props => {
  const user = useContext(UserContext);
  return (
    <div>
      <h4>
        {props.data.title}{" "}
        {user.id === props.data.userId && (
          <button onClick={() => props.deletePost(props.data.id)}>
            Delete
          </button>
        )}
      </h4>
      <p>{props.data.body}</p>
      <div>
        <button onClick={() => props.toggleLike(props.data.id, user.id)}>
          {props.data.likes.indexOf(user.id) > -1 ? "Unlike" : "Like"}
        </button>{" "}
        Total Likes: {props.data.likes.length}
      </div>
    </div>
  );
};

export default Post;
