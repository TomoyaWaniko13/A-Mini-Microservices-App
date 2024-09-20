"use client";

import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import axios from "axios";

// 19. React Project Setup
// 20. Building Post Submission

const PostCreate = () => {
  const [title, setTitle] = useState<string>();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    //   通常、フォームが送信されると、ページが再読み込みされたり、別のページに遷移したりします。
    //   preventDefault() メソッドはこの動作を止めます。
    event.preventDefault();
    console.log(event);
    await axios.post("http//localhost:4000/posts", { title });
    setTitle("");
  };

  return (
    <form action="" onSubmit={onSubmit} className={"flex flex-col gap-3"}>
      <Input
        label={"title"}
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <div>
        <Button color="primary" type={"submit"}>
          Submit
        </Button>
      </div>
    </form>
  );
};

export default PostCreate;
