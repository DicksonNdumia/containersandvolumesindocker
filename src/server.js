import express from "express";

const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
  res.json({
    message: "Hello From a container",
    service: "Hello-node",
    pod: process.env.POD_NAME || "unknown",
    time: new Date().toISOString(),
  });
});

app.get("/ready", (req, res) => res.status(200).send("ready"));
app.get("/healthy", (req, res) => res.status(200).send("ok"));

app.get("/hello", (req, res, next) => {
  res.send(200).json({
    message: "hello World",
  });
});

app.listen(PORT, () => {
  console.log(`Port is running on port ${PORT}`);
});
