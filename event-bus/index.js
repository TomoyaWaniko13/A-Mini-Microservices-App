import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

// 31. A Basic Event Bus Implementation
// 45. Handling Moderation

const app = express();
app.use(bodyParser.json());

app.post("/events", (req, res) => {
  const event = req.body;

  // event は送信されるデータです。
  // http://localhost:4000/events は リクエストの送信先の URL です。
  axios.post("http://localhost:4000/events", event).catch((err) => {
    console.log(err.message);
  });

  axios.post("http://localhost:4001/events", event).catch((err) => {
    console.log(err.message);
  });

  axios.post("http://localhost:4002/events", event).catch((err) => {
    console.log(err.message);
  });

  axios.post("http://localhost:4003/events", event).catch((err) => {
    console.log(err.message);
  });

  res.send({ status: "OK" });
});

app.listen(4005, () => {
  console.log("Listening on 4005");
});
