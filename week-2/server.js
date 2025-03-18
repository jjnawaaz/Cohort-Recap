const express = require("express");
const app = express();

app.use(express.json());

let data = [
  {
    name: "Junaid",
  },
  {
    name: "Kirat",
  },
];

app.get("/", (req, res) => {
  res.send(data);
});

app.listen(3000, () => {
  console.log(`Server Started`);
});
