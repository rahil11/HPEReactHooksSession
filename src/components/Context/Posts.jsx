import React, { useEffect, useState } from "react";
import { Post } from "./Post";

export const Posts = () => {
  const [posts, setPosts] = useState([]);
  useEffect(async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    setPosts(await response.json());
  }, []);
  return (
    <div>
      {posts.map(post => (
        <Post data={post} key={post.id} />
      ))}
    </div>
  );
};
