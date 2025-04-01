import { useEffect } from "react";

import "./App.css";
import { RecoilRoot, useSetRecoilState } from "recoil";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import TodoList from "./components/TodoList";
import { authState } from "./store/authState";

function App() {
  return (
    <>
      <RecoilRoot>
        <Router>
          <InitState />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<Login />} />
            <Route path="/todos" element={<TodoList />} />
          </Routes>
        </Router>
      </RecoilRoot>
    </>
  );
}

function InitState() {
  const atomData = useSetRecoilState(authState);
  const navigate = useNavigate();
  const init = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:3000/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data) {
        atomData({ username: data.username, token: data.token });
        navigate("/todos");
      } else {
        navigate("/login");
      }
    } catch (e) {
      navigate("/login");
    }
    useEffect(() => {
      init();
    }, []);
  };
  return <></>;
}

export default App;
