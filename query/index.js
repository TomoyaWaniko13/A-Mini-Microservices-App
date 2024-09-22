import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

// 35. Creating the Data Query Service
// 36. Parsing Incoming Events

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Posts service と Comments service からの
// それぞれの event のデータを関連づけて、この posts 配列に追加します。
const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

// event bus から event を受け取って、posts 配列に追加します。
app.post("/events", (req, res) => {
  const { type, data } = req.body;

  if (type === "PostCreated") {
    // post の id, title を取得します。
    const { id, title } = data;
    // posts 配列の の id 番目に、post の id, title, comments: [] を追加します。
    posts[id] = { id, title, comments: [] };
  }

  if (type === "CommentCreated") {
    // comment の id, content と post の id を取得します。
    const { id, content, postId } = data;

    // posts 配列の post を postId で探します。
    const post = posts[postId];

    // post の comments property に comment の id と content を追加します。
    post.comments.push({ id, content });
  }

  // event を受け取って、posts 配列に追加した結果を出力します。
  console.log(posts);

  res.send({});
});

app.listen(4002, () => {
  console.log("Listening on 4002");
});
