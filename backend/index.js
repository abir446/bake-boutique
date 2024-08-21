const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).json("Test Success");
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  //   console.log(email, password);
  res.status(201).json({ email, password });
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  //   console.log(email, password);
  res.status(201).json({ name, email, password });
});

const port = 8000;

app.listen(port, () => {
  console.log(`Port Running on: ${port}`);
});
