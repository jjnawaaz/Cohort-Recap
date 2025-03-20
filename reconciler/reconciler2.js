/**
 * Some optimization
 */

function createDomElement(data) {
  var parentElement = document.getElementById("mainArea");
  var currentElement = Array.from(parentElement.children);
  let added = 0,
    updated = 0,
    deleted = 0;
  data.forEach((todo) => {
    var existingChild = currentElement.find(
      (i) => i.dataset.id === String(todo.id)
    );

    if (existingChild) {
      updated++;
      existingChild.children[0].innerHtml = todo.id;
      existingChild.children[1].innerHtml = todo.description;

      // remove
      currentElement = currentElement.filter(
        (child) => child !== existingChild
      );
    } else {
      added++;
      // If it doesn't exist, create it
      var childElement = document.createElement("div");
      childElement.dataset.id = todo.id; // Store the ID on the element for future lookups

      var grandChildElement1 = document.createElement("span");
      grandChildElement1.innerHTML = todo.title;

      var grandChildElement2 = document.createElement("span");
      grandChildElement2.innerHTML = todo.description;

      var grandChildElement3 = document.createElement("button");
      grandChildElement3.innerHTML = "Delete";
      grandChildElement3.setAttribute("onclick", "deleteTodo(" + todo.id + ")");

      childElement.appendChild(grandChildElement1);
      childElement.appendChild(grandChildElement2);
      childElement.appendChild(grandChildElement3);
      parentElement.appendChild(childElement);
    }
  });

  // Deleted all the leftovers in currentElement
  currentElement.forEach((child) => {
    deleted++;
    parentElement.removeChild(child);
  });

  console.log(added);
  console.log(updated);
  console.log(deleted);
}

window.setInterval(() => {
  let todos = [];
  for (let i = 0; i < Math.floor(Math.random() * 100); i++) {
    todos.push({
      title: "Title of Todo App",
      description: "Description of Todo App",
      id: i + 1,
    });
  }

  createDomElement(todos);
}, 2000);
