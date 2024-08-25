import { Link } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const logout = async () => {
    const response = await axios.post(
      "http://localhost:8000/logout",
      {},
      { withCredentials: true }
    );
    if (response.error) {
      toast.error(response.error);
    } else {
      setUser(null);
      toast.success("Logged out successfully");
      navigate("/");
    }
  };

  return (
    <div className="flex justify-around p-4">
      <Link to={"/"}>Bake boutique</Link>
      <div className="flex gap-2 space-x-9">
        {user ? (
          <div className="flex gap-2 items-center justify-center">
            <div>{user.name}</div>
            <button onClick={logout}>Logout</button>
          </div>
        ) : (
          <ul className="flex gap-2 items-center justify-center">
            <li>
              <Link to={"/login"}>Login</Link>
            </li>
            <li>
              <Link to={"/register"}>Register</Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};
