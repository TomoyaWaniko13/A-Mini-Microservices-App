"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import CommentList from "@/components/CommentList";

// 22. Fetching and Rendering Posts
// 37. Using the Query Service

interface Comment {
  id: string;
  content: string;
}

interface Post {
  id: string;
  title: string;
  comments: Comment[];
}

type PostsMap = Record<string, Post>;

const PostList = () => {
  // server side では posts はオブジェクトとして設定されています。
  // なので、client side でもオブジェクトを受け取るために、オブジェクトとして設定します。
  const [posts, setPosts] = useState<PostsMap>({});

  // Query Service から Posts を取得します。
  const fetchPosts = async () => {
    const res = await axios.get("http://localhost:4002/posts");
    console.log(res.data);
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
            <p className={"text-2xl font-bold"}>{post.title}</p>
          </CardHeader>
          <CardBody className={"gap-4"}>
            <CommentList comments={post.comments} />
            {/*<CommentCreate comments={post.comments} />*/}
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default PostList;
