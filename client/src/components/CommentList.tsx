"use client";

import axios from "axios";
import { useEffect, useState } from "react";

// 24. Displaying Comments

interface Comment {
  id: string;
  content: string;
}

type Props = {
  postId: string;
};

// この postId が comments に関連づけられています。。
const CommentList = ({ postId }: Props) => {
  const [comments, setComments] = useState<Comment[]>([]);

  const fetchData = async () => {
    // この postId が comments に関連づけられています。
    // なので、postId により comments を取得することができます。
    const res = await axios.get(
      `http://localhost:4001/posts/${postId}/comments`,
    );
    setComments(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ul>
      {comments.map((comment) => (
        <li key={comment.id}>{comment.content}</li>
      ))}
    </ul>
  );
};

export default CommentList;
