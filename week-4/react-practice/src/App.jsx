import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import "./App.css";
import AdminSignIn from "./components/AdminSignIn";
import AdminSignUp from "./components/AdminSignUp";
import HomePage from "./Home";
import UserSignIn from "./usercomponents/UserSignIn";
import UserSignUp from "./usercomponents/UserSignUp";

function App() {
  console.log("Hitting app ");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin/signin" element={<AdminSignIn />} />
        <Route path="/admin/signup" element={<AdminSignUp />} />
        <Route path="/users/signin" element={<UserSignIn />} />
        <Route path="/users/signup" element={<UserSignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
