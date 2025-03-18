const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.status(500).send("Hello there");
});

app.listen(3000, () => {
  console.log(`Server Started`);
});
