import express from "express";
import bodyParser from "body-parser";
import { randomBytes } from "crypto";

// 15. Implementing a Comments Service

const app = express();
// bodyParser.json() ミドルウェアを使用します。
app.use(bodyParser.json());

// post の id により、関連づけられた comments を探します。
// comment は {id: string,content: string} です。
const commentsByPostId = {};

// id は post の id です。その post に comment が関連づけられます。
app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

// id は post の id です。その post に comment が関連づけられます。
app.post("/posts/:id/comments", (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;

  // この行は、指定された post ID に関連付けられた既存の comments 配列を取得します。
  // もし該当する post IDの comment がまだ存在しない場合（つまりundefinedの場合）、空の配列[]を代わりに使用します。
  // これにより、新しい投稿に対する最初のコメントでもエラーが発生しないようにしています。
  const comments = commentsByPostId[req.params.id] || [];

  // 新しい comment オブジェクト（id と content を持つ）を、取得した comments 配列に追加します。
  // この操作により、既存のコメントリストに新しいコメントが追加されます。
  comments.push({ id: commentId, content });

  // 更新された comments 配列を、元の commentsByPostId オブジェクトに保存し直します。
  // これにより、新しいコメントを含む更新されたコメントリストが、指定された投稿IDに関連付けられて保存されます。
  commentsByPostId[req.params.id] = comments;

  res.status(200).send(comments);
});

app.listen(4001, () => {
  console.log("listening on 4001");
});
