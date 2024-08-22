import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const RegisterForm = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const registerUser = async (e) => {
    e.preventDefault();
    const { name, email, password } = data;

    try {
      const { data } = await axios.post("http://localhost:8000/register", {
        name,
        email,
        password,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({});
        toast.success("Registration Success");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={registerUser}>
      <label htmlFor="">Name</label>
      <input
        type="text"
        value={data.name}
        onChange={(e) => setData({ ...data, name: e.target.value })}
        placeholder="John Doe"
        autoComplete="name"
      />
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
        id="passord"
        placeholder="Password"
      />
      <button type="submit">Register</button>
    </form>
  );
};
