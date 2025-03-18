// req.body , req.params, req.query and req.headers

const express = require("express");
const app = express();

app.use(express.json());

app.get("/:id", (req, res) => {
  // get from req.query

  // req.body data
  let data2 = req.body;
  console.log(data2);
  // req.query
  let data = req.query.counter;
  //req.params
  let data1 = req.params.id;
  // Headers
  let data3 = req.headers.name;
  res.send(
    `Data from req.query is ${data} and data from req.params is ${data1} and data from req.body is ${data2} and data from headers is ${data3}`
  );
});

app.listen(3000, () => {
  console.log("Server Started in PORT 3000");
});
