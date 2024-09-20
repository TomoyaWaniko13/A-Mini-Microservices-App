import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import axios from "axios";

// 23. Creating Comments

type Props = {
  postId: string;
};

// この post.id を comment に関連づけます。
const CommentCreate = ({ postId }: Props) => {
  const [content, setContent] = useState("");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // この post.id を comment に関連づけます。
    await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
      content,
    });

    setContent("");
  };

  return (
    <form action="" onSubmit={onSubmit} className={"flex flex-col gap-3"}>
      <Input
        label={"new comment"}
        value={content}
        onChange={(event) => setContent(event.target.value)}
      />
      <div>
        <Button color="primary" type={"submit"}>
          Submit
        </Button>
      </div>
    </form>
  );
};

export default CommentCreate;
