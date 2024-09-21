"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import CommentCreate from "@/components/CommentCreate";
import CommentList from "@/components/CommentList";

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
    <div className={"grid grid-cols-4 grid-rows-3 gap-3"}>
      {Object.values(posts).map((post) => (
        <Card key={post.id}>
          <CardHeader>
            <p className={"text-2xl"}>{post.title}</p>
          </CardHeader>
          <CardBody className={"gap-4"}>
            {/* この post.id を comments に関連づけます。 */}
            <CommentList postId={post.id} />
            <CommentCreate postId={post.id} />
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default PostList;
