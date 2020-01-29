import React, { useContext } from "react";
import { UserContext } from "../../App";
import { PostsContext } from "./Posts";

const Post = props => {
  const user = useContext(UserContext);
  const { postUtility } = useContext(PostsContext);
  return (
    <div>
      <h4>
        {props.data.title}{" "}
        {user.id === props.data.userId && (
          <button
            style={{ float: "right" }}
            onClick={() =>
              postUtility({
                type: "DELETE_POST",
                data: { postId: props.data.id }
              })
            }
          >
            Delete
          </button>
        )}
      </h4>
      <p>{props.data.body}</p>
      <div>
        <button
          onClick={() =>
            postUtility({
              type: "TOGGLE_LIKE",
              data: { postId: props.data.id, userId: user.id }
            })
          }
        >
          {props.data.likes.indexOf(user.id) > -1 ? "Unlike" : "Like"}
        </button>{" "}
        Total Likes: {props.data.likes.length}
      </div>
    </div>
  );
};

export default Post;
