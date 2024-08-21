import { useState } from "react";
import axios from "axios";

export const RegisterForm = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const registerUser = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/register", data)
      .then((response) => {
        console.log(response.data);
        setData({
          name: "",
          email: "",
          password: "",
        });
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
    console.log(data);
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
