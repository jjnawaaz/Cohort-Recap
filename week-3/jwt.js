const jwt = require("jsonwebtoken");

const data = {
  id: 1,
  name: "Junaid",
};
let secret = "IamBatman";
const token = jwt.sign(data, secret);

console.log(token);
