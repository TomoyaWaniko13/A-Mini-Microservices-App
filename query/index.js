import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import axios from "axios";

// 35. Creating the Data Query Service
// 36. Parsing Incoming Events
// 43. Adding Comment Moderation
// 47. A Quick Test
// 51. Implementing Event Sync

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Posts service と Comments service からの
// それぞれの event のデータを関連づけて、この posts 配列に追加します。
const posts = {};

const handleEvent = (type, data) => {
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
};

app.get("/posts", (req, res) => {
  res.send(posts);
});

// event bus から event を受け取ります。
app.post("/events", (req, res) => {
  const { type, data } = req.body;
  handleEvent(type, data);
  res.send({});
});

app.listen(4002, async () => {
  console.log("Listening on 4002");
  const res = await axios.get("http://localhost:4005/events");

  for (let event of res.data) {
    console.log("Processing event: ", event.type);
    handleEvent(event.type, event.data);
  }
});
