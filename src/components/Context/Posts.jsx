import React, { useEffect, useState, useContext, useReducer } from "react";
import Post from "./Post";
import { UserContext } from "../../App";

const initialState = {
  allPosts: [],
  filteredPosts: [],
  isFiltered: false
};

const PostsReducer = (state, action) => {
  switch (action.type) {
    case "SET_ALL":
      return {
        ...state,
        allPosts: action.data
      };
    case "FILTER_FOR_USER":
      return {
        ...state,
        filteredPosts: state.allPosts.filter(
          post => post.userId === action.userId
        ),
        isFiltered: true
      };
    case "CLEAR_FILTER":
      return {
        ...state,
        filteredPosts: [],
        isFiltered: false
      };
    default:
      return state;
  }
};

const Posts = () => {
  const user = useContext(UserContext);

  const [state, dispatch] = useReducer(PostsReducer, initialState);

  const getAllPosts = () => {
    dispatch({ type: "CLEAR_FILTER" });
  };
  const getPostsOfUser = () => {
    dispatch({ type: "FILTER_FOR_USER", userId: user.id });
  };

  useEffect(() => {
    const getPosts = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const postsResponse = await response.json();
      dispatch({ type: "SET_ALL", data: postsResponse });
    };
    getPosts();
  }, []);

  return (
    <div>
      <span>Filter: </span>
      <button onClick={getPostsOfUser}>My Posts</button> |{" "}
      <button onClick={getAllPosts}>All Posts</button>
      <ol>
        {(state.isFiltered ? state.filteredPosts : state.allPosts).map(post => (
          <li key={post.id}>
            <Post data={post} />
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Posts;
