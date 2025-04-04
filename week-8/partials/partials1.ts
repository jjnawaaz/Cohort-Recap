interface Todo {
  title: string;
  description: string;
  price: Number;
  done: boolean;
}

type UpdatedTodo = Partial<Todo>;

function UpdateTodos(id: Number, todo: UpdatedTodo): [UpdatedTodo, Number] {
  return [todo, id];
}

const item = UpdateTodos(2, { title: "New Title" });
console.log(item);
