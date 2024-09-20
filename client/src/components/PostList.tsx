"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardHeader } from "@nextui-org/card";

// 22. Fetching and Rendering Posts

interface Post {
  id: string;
  title: string;
}

const PostList = () => {
  // server side では posts はオブジェクトとして設定されています。
  // なので、client side でもオブジェクトを受け取るために、オブジェクトとして設定します。
  const [posts, setPosts] = useState<Record<string, Post>>({});

  const fetchPosts = async () => {
    const res = await axios.get("http://localhost:4000/posts");
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className={"grid grid-cols-4 h-48 gap-3"}>
      {Object.values(posts).map((post) => (
        <Card key={post.id}>
          <CardHeader>
            <p>{post.title}</p>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};

export default PostList;
