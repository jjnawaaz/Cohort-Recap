const express = require("express");
const app = express();

function middleware(req, res, next) {
  let success = true;
  if (success) {
    next();
  } else {
    res.send("Error in middleware");
  }
}

app.use(express.json());
app.use(middleware);

app.get("/", (req, res) => {
  res.send("Hello there");
});

app.listen(3000, () => {
  console.log("Server Started");
});
