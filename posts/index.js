import express from "express";
import { randomBytes } from "crypto";
import bodyParser from "body-parser";

const app = express();
// bodyParser.json() ミドルウェアを使用します。
app.use(bodyParser.json());
// 仮のデータベースとして使用します。
const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts", (req, res) => {
  // id は key として使われます。
  const id = randomBytes(4).toString("hex");

  const { title } = req.body;

  // id と title を保存します。
  posts[id] = { id, title };

  // 201 Created
  res.status(201).send(posts[id]);
});

app.listen(4000, () => {
  console.log("Listing on port 4000");
});
