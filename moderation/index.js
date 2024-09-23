import express from "express";
import bodyParser from "body-parser";

// 42. Creating the Moderation Service

const app = express();
app.use(bodyParser.json());

app.post("/events", (req, res) => {});

app.listen(4003, () => {
  console.log("Listening on 4003");
});
