import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <div className="flex justify-around">
      <Link to={"/"}>Bake boutique</Link>
      <div className="flex gap-2">
        <Link to={"/login"}>Login</Link>
        <Link to={"/register"}>Register</Link>
      </div>
    </div>
  );
};
