/**
 * Basic Reconciler of React
 */

// Function Create DOM Element
function createDomElement(data) {
  var parentElement = document.getElementById("mainArea");
  parentElement.innerHTML = "";
  let added = 0;
  data.forEach((element) => {
    added++;
    var childElement = document.createElement("div");
    var grandchildElement1 = document.createElement("span");
    var grandchildElement2 = document.createElement("span");
    var grandchildElement3 = document.createElement("button");

    grandchildElement1.innerHTML = element.title;
    grandchildElement2.innerHTML = element.description;
    grandchildElement3.innerHTML = "Button";

    childElement.appendChild(grandchildElement1);
    childElement.appendChild(grandchildElement2);
    childElement.appendChild(grandchildElement3);

    parentElement.appendChild(childElement);
  });
  console.log(added);
}

// Window
window.setInterval(() => {
  let todos = [];
  for (let i = 0; i < Math.floor(Math.random() * 100); i++) {
    todos.push({
      title: "New Todo",
      description: "Todo Description",
      id: i + 1,
    });
  }
  createDomElement(todos);
}, 2000);
