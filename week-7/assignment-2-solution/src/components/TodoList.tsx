import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { authState } from "../store/authState";

type Todos = {
  _id?: string;
  title: string;
  description: string;
  done?: boolean;
};

const TodoList = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const authStateValue = useRecoilState(authState);
  const token = localStorage.getItem("token");
  const [todos, setTodos] = useState<Todos[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch("http://localhost:3000/todo/todos", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const response = await data.json();
      if (response) {
        setTodos(response);
      }
    };
    fetchData();
  }, [token]);

  const handleLogout = () => {
    localStorage.setItem("token", "");
    window.location = "/";
  };

  const handleSubmit = async () => {
    let todoData: Todos = {
      title: title,
      description: description,
    };
    let response: Response = await fetch("http://localhost:3000/todo/todos", {
      method: "POST",
      body: JSON.stringify(todoData),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
    });
    let data = await response.json();
    if (data) {
      setTodos([...todos, data]);
    }
  };

  const handleDone = async (id: string) => {
    let response: Response = await fetch(
      `http://localhost:3000/todo/todos/${id}/done`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    let data = await response.json();
    setTodos(todos.map((item) => (item._id === data._id ? data : item)));
  };
  return (
    <div>
      <div>
        Hello {authStateValue[0].username}
        <br />
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div>
        <input
          type="text"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={handleSubmit}>Add todo</button>
      </div>
      <div>
        {todos ? (
          todos.map((item: Todos) => (
            <div key={item._id}>
              <div>Title: {item.title}</div>
              <div>Description: {item.description}</div>
              <button onClick={() => item._id && handleDone(item._id)}>
                {item.done ? "Done" : "Mark as Done"}
              </button>
            </div>
          ))
        ) : (
          <>
            <div>Loading..</div>
          </>
        )}
      </div>
    </div>
  );
};

export default TodoList;
