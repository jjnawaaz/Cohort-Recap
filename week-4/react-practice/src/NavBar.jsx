import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();
  const handleSignUp = () => {
    navigate("/admin/signup");
  };
  const handleSignIn = () => {
    navigate("/admin/signin");
  };
  return (
    <>
      <nav style={{ padding: "10px", backgroundColor: "#fac0c4" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>CourseAPP</div>
          <div style={{ display: "flex" }}>
            <Button
              variant="contained"
              style={{ marginRight: "10px", backgroundColor: "red" }}
              onClick={handleSignUp}
            >
              Sign Up
            </Button>
            <Button variant="contained" onClick={handleSignIn}>
              Sign In
            </Button>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
