"use client";

// 24. Displaying Comments
// 37. Using the Query Service

interface Comment {
  id: string;
  content: string;
}

interface Props {
  comments: Comment[];
}

const CommentList = ({ comments }: Props) => {
  console.log(comments);

  return (
    <ul>
      {comments.map((comment) => (
        <li key={comment.id}>{comment.content}</li>
      ))}
    </ul>
  );
};

export default CommentList;
