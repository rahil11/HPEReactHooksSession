import React, { useEffect, useState } from "react";
import Post from "./Post";

const Posts = props => {
  const [posts, setPosts] = useState([]);
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
      <ol>
        {posts.map(post => (
          <li key={post.id}>
            <Post data={post} user={props.user} />
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Posts;
