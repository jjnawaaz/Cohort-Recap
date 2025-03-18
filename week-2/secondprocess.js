function callbackfn(data) {
  console.log(data);
}

function getData(data) {
  data.json().then(callbackfn);
}

fetch("http://localhost:3000/", {
  method: "Get",
}).then(getData);
