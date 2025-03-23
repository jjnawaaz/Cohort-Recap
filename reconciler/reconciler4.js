let vDOM = [];

function createDOMElement(existingDOM, currentDOM) {
  var parentElement = document.getElementById("mainArea");
  let added = 0,
    updated = 0,
    deleted = 0;
  currentDOM.forEach((item) => {
    // check if Item already exists
    var existingItem = existingDOM.find((oldItem) => {
      return oldItem.id === item.id;
    });
    if (existingItem) {
      updated++;
      var existingChild = document.querySelector(`[data-id='${item.id}']`);
      existingChild.children[0].innerHTML = existingItem.title;
      existingChild.children[1].innerHTML = existingItem.description;
    } else {
      added++;
      var childElement = document.createElement("div");
      childElement.dataset.id = item.id; // inserting ID into child element div
      var grandChildElement1 = document.createElement("span");
      grandChildElement1.innerHTML = item.title;

      var grandChildElement2 = document.createElement("span");
      grandChildElement2.innerHTML = item.description;

      var grandChildElement3 = document.createElement("button");
      grandChildElement3.innerHTML = "Delete";
      grandChildElement3.setAttribute("onclick", "deleteTodo(" + item.id + ")");

      childElement.appendChild(grandChildElement1);
      childElement.appendChild(grandChildElement2);
      childElement.appendChild(grandChildElement3);
      parentElement.appendChild(childElement);
    }
  });
  //
  existingDOM.forEach((oldItem) => {
    // all the remaining items are to be deleted
    if (!currentDOM.some((item) => item.id === oldItem.id)) {
      deleted++;
      var childToRemove = document.querySelector(`[data-id='${oldItem.id}']`);
      parentElement.removeChild(childToRemove);
    }
  });

  console.log(added);
  console.log(updated);
  console.log(deleted);
}

function updatevDOM(todos) {
  let existingDOM = [...vDOM];
  vDOM = todos.map((item) => {
    return { title: item.title, description: item.description, id: item.id };
  });
  createDOMElement(existingDOM, vDOM);
}

window.setInterval(() => {
  let todos = [];
  for (let i = 0; i < Math.floor(Math.random() * 100); i++) {
    todos.push({
      title: `This is a new todo with Id ${i + 1}`,
      description: `This is description of todo with id ${i + 1}`,
      id: i + 1,
    });
  }
  updatevDOM(todos);
}, 2000);
