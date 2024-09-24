import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

// 42. Creating the Moderation Service
// 45. Handling Moderation

const app = express();
app.use(bodyParser.json());

// event bus から event を受け取ります。
app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  if (type === "CommentCreated") {
    const status = data.content.includes("orange") ? "rejected" : "approved";

    await axios.post("http://localhost:4005/events", {
      type: "CommentModerated",
      // status だけ更新します。
      data: {
        id: data.id,
        postId: data.postId,
        status,
        content: data.content,
      },
    });
  }

  res.send({});
});

app.listen(4003, () => {
  console.log("Listening on 4003");
});
