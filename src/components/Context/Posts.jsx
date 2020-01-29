import React, { useEffect, useState, useContext } from "react";
import Post from "./Post";
import { UserContext } from "../../App";

const Posts = () => {
  const user = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const getAllPosts = () => {
    setFilteredPosts([]);
    setIsFiltered(false);
  };
  const getPostsOfUser = () => {
    setFilteredPosts(posts.filter(post => post.userId === user.id));
    setIsFiltered(true);
  };

  useEffect(() => {
    const getPosts = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      setPosts(await response.json());
    };
    getPosts();
  }, []);

  return (
    <div>
      <span>Filter: </span>
      <button onClick={getPostsOfUser}>My Posts</button> |{" "}
      <button onClick={getAllPosts}>All Posts</button>
      <ol>
        {(isFiltered ? filteredPosts : posts).map(post => (
          <li key={post.id}>
            <Post data={post} />
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Posts;
