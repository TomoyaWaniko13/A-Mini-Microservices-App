import express from "express";
import { randomBytes } from "crypto";
import bodyParser from "body-parser";
import cors from "cors";

// 13. Posts Service Creation
// 21. Handling CORS Errors

const app = express();

app.use(bodyParser.json());
app.use(cors());

// 仮のデータベースとして使用します。
const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts", (req, res) => {
  // post の id を作ります。
  const id = randomBytes(4).toString("hex");

  // post の title を request から取得します。
  const { title } = req.body;

  // post の id と title を保存します。
  posts[id] = { id, title };

  // 201 Created
  // post の id に関連づけられた id と title を send() します。
  res.status(201).send(posts[id]);
});

app.listen(4000, () => {
  console.log("Listing on port 4000");
});
