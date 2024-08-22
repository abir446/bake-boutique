import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    try {
      const { data } = await axios.post(
        "http://localhost:8000/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({});
        toast.success("Login successful");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={loginUser}>
      <label htmlFor="">Email</label>
      <input
        type="email"
        value={data.email}
        onChange={(e) => setData({ ...data, email: e.target.value })}
        name=""
        id="email"
        placeholder="john@doe.com"
        autoComplete="email"
      />
      <label htmlFor="">Password</label>
      <input
        type="password"
        value={data.password}
        onChange={(e) => setData({ ...data, password: e.target.value })}
        name=""
        id="password"
        placeholder="Password"
        autoComplete=""
      />
      <button type="submit">Login</button>
    </form>
  );
};
