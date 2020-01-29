import React, { useEffect, useState, useContext, useReducer } from "react";
import Post from "./Post";
import { UserContext } from "../../App";

const initialState = {
  allPosts: [],
  filteredPosts: [],
  isFiltered: false
};

const PostsReducer = (state, action) => {
  const toggleLike = (listOfPosts, postId, userId) => {
    return listOfPosts.map(post => {
      // Check if user has liked the post already
      const indexOfUserLike = post.likes.indexOf(userId);
      if (postId === post.id) {
        let likes = [...post.likes];
        if (indexOfUserLike > -1) {
          likes.splice(indexOfUserLike, 1);
        } else {
          likes = [...likes, userId];
        }
        return {
          ...post,
          likes
        };
      }
      return post;
    });
  };

  const filterPost = (listOfPosts, postId) => {
    return listOfPosts.filter(post => post.id !== postId);
  };

  switch (action.type) {
    case "SET_ALL":
      return {
        ...state,
        allPosts: action.data.map(post => ({ ...post, likes: [] }))
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
    case "TOGGLE_LIKE":
      return {
        ...state,
        allPosts: toggleLike(
          state.allPosts,
          action.data.postId,
          action.data.userId
        ),
        filteredPosts: toggleLike(
          state.filteredPosts,
          action.data.postId,
          action.data.userId
        )
      };
    case "DELETE_POST":
      return {
        ...state,
        allPosts: filterPost(state.allPosts, action.data.postId),
        filteredPosts: filterPost(state.filteredPosts, action.data.postId)
      };
    default:
      return state;
  }
};

export const PostsContext = React.createContext();

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
      <PostsContext.Provider value={{ postUtility: dispatch }}>
        <ol>
          {(state.isFiltered ? state.filteredPosts : state.allPosts).map(
            post => (
              <li key={post.id}>
                <Post data={post} />
              </li>
            )
          )}
        </ol>
      </PostsContext.Provider>
    </div>
  );
};

export default Posts;
