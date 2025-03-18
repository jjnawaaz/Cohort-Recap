const express = require("express");
const app = express();

function sum(n) {
  let sum = 0;
  n = parseInt(n);
  for (let i = 0; i <= n; i++) {
    sum += i;
  }
  return sum;
}

app.get("/", (req, res) => {
  res.send("Hello from node app");
});

app.get("/calculatesum", (req, res) => {
  let num = req.query.num;
  let result = sum(num);
  result = result.toString();
  res.send(result);
});

app.listen(3000, () => {
  console.log("Server Started");
});
