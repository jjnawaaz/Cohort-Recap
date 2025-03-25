import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppBar from "./AppBar";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import AddCourse from "./AddCourse";
import Courses from "./Courses";
import Course from "./Course";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          backgroundColor: "#eeeeee",
        }}
      >
        <RecoilRoot>
          <Router>
            <AppBar />
            <Routes>
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/addcourse" element={<AddCourse />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/courses/:courseId" element={<Course />} />
            </Routes>
          </Router>
        </RecoilRoot>
      </div>
    </>
  );
}

export default App;
