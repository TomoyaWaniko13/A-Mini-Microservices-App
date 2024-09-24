import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

// 35. Creating the Data Query Service
// 36. Parsing Incoming Events
// 43. Adding Comment Moderation
// 47. A Quick Test

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Posts service と Comments service からの
// それぞれの event のデータを関連づけて、この posts 配列に追加します。
const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

// event bus から event を受け取ります。
app.post("/events", (req, res) => {
  const { type, data } = req.body;

  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type === "CommentCreated") {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    post.comments.push({ id, content, status });
  }

  if (type === "CommentUpdated") {
    const { id, content, postId, status } = data;
    const post = posts[postId];

    const comment = post.comments.find((comment) => {
      return comment.id === id;
    });

    comment.status = status;
    comment.content = content;
  }

  // event を受け取って、posts 配列に追加した結果を出力します。
  console.log(posts);

  res.send({});
});

app.listen(4002, () => {
  console.log("Listening on 4002");
});
