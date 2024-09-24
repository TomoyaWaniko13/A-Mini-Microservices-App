"use client";

// 24. Displaying Comments
// 37. Using the Query Service
// 48. Rendering Comments by Status

interface Comment {
  id: string;
  content: string;
  status: "pending" | "approved" | "rejected";
}

interface Props {
  comments: Comment[];
}

const CommentList = ({ comments }: Props) => {
  const renderedComments = comments.map((comment) => {
    let content;

    if (comment.status === "pending") {
      content = "This comment is awaiting moderation";
    }

    if (comment.status === "approved") {
      content = comment.content;
    }

    if (comment.status === "rejected") {
      content = "This comment has been rejected";
    }

    return <li key={comment.id}>{content}</li>;
  });

  return <ul>{renderedComments} </ul>;
};

export default CommentList;
