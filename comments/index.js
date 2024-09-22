import express from "express";
import bodyParser from "body-parser";
import { randomBytes } from "crypto";
import cors from "cors";
import axios from "axios";

// 15. Implementing a Comments Service
// 33. Emitting Comment Creation Events
// 34. Receiving Events

const app = express();
// bodyParser.json() ミドルウェアを使用します。
app.use(bodyParser.json());
app.use(cors());

// post の id により、関連づけられた comments を保持します。
// comment の型は {id: string,content: string} です。
const commentsByPostId = {};

// id は post の id です。その post に comment が関連づけられます。
app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

// :id は post の id です。その post に   comment が関連づけられます。
app.post("/posts/:id/comments", async (req, res) => {
  // comment の id を作ります。
  const commentId = randomBytes(4).toString("hex");

  // comment の content を取得します。
  const { content } = req.body;

  // この行は、指定された post ID (req.params.id) に関連付けられた既存の comments 配列を取得します。
  // もし該当する post IDの comment がまだ存在しない場合（つまりundefinedの場合）、空の配列[]を代わりに使用します。
  // これにより、新しい投稿に対する最初のコメントでもエラーが発生しないようにしています。
  const comments = commentsByPostId[req.params.id] || [];

  // 新しい comment オブジェクト {id: string, content: string} を、取得した comments 配列に追加します。
  // この操作により、既存のコメントリストに新しいコメントが追加されます。
  comments.push({ id: commentId, content });

  // 更新された comments 配列を、元の commentsByPostId オブジェクトに保存し直します。
  // これにより、新しいコメントを含む更新されたコメントリストが、指定された投稿IDに関連付けられて保存されます。
  commentsByPostId[req.params.id] = comments;

  // event bus に event を送信します。
  await axios.post("http://localhost:4005/events", {
    type: "CommentCreated",
    data: { id: commentId, content, postId: req.params.id },
  });

  console.log(commentsByPostId);

  res.status(201).send(comments);
});

app.post("/events", (req, res) => {
  console.log("Event Received:", req.body.type);
  res.send({});
});

app.listen(4001, () => {
  console.log("listening on 4001");
});
