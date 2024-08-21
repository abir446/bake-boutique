import { useState } from "react";
import axios from "axios";

export const LoginForm = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const loginUser = (e) => {
    e.preventDefault();
    console.log(data);
    axios
      .post("http://localhost:8000/login", data)
      .then((response) => {
        console.log(response.data);
        setData({
          email: "",
          password: "",
        });
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
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
