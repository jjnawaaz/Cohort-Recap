"use strict";
function UpdateTodos(id, todo) {
    return [todo, id];
}
const item = UpdateTodos(2, { title: "New Title" });
console.log(item);
