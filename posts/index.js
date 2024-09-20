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
  const id = randomBytes(4).toString();

  const { title } = req.body;

  posts[id] = { id, title };

  res.status(200).send(posts[id]);
});

app.listen(4000, () => {
  console.log("Listing on port 4000");
});
