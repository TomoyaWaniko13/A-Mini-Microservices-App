import express from "express";
import bodyParser from "body-parser";
import { randomBytes } from "crypto";
import cors from "cors";
import axios from "axios";

// 15. Implementing a Comments Service
// 33. Emitting Comment Creation Events
// 34. Receiving Events
// 43. Adding Comment Moderation
// 46. Updating Comment Content

const app = express();
// bodyParser.json() ミドルウェアを使用します。
app.use(bodyParser.json());
app.use(cors());

// post の ID により、関連づけられた comments を保持します。
const commentsByPostId = {};

// id は post の ID です。その post に comment が関連づけられます。
app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;

  const comments = commentsByPostId[req.params.id] || [];
  comments.push({ id: commentId, content, status: "pending" });

  commentsByPostId[req.params.id] = comments;

  // event bus に event を送信します。
  await axios.post("http://localhost:4005/events", {
    type: "CommentCreated",
    data: {
      id: commentId,
      content,
      postId: req.params.id,
    },
    status: "pending",
  });

  console.log(commentsByPostId);

  res.status(201).send(comments);
});

// event bus から event を受け取ります。
app.post("/events", async (req, res) => {
  console.log("Event Received:", req.body.type);

  const { type, data } = req.body;

  if (type === "CommentModerated") {
    const { postId, id, status, content } = data;
    const comments = commentsByPostId[postId];

    // status を変更するべき comment を探します。
    const comment = comments.find((comment) => {
      return comment.id === id;
    });

    // comment の status を変更します。
    comment.status = status;

    await axios.post("http://localhost:4005/events", {
      type: "CommentUpdated",
      data: { id, status, postId, content },
    });
  }

  res.send({});
});

app.listen(4001, () => {
  console.log("listening on 4001");
});
