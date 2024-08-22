const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user");

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

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name) {
      return res.json({
        error: "Name is required",
      });
    }
    if (!email) {
      return res.json({ error: "Email is required" });
    }
    if (!password || password.length < 5) {
      return res.json({
        error: "Password must be at least 5 characters",
      });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.json({
        error: "Email already exists",
      });
    }

    const userCreated = await User.create({ name, email, password });
    res.status(201).json(userCreated);
  } catch (error) {
    console.log(error);
  }
});

const port = 8000;

app.listen(port, () => {
  mongoose
    .connect(process.env.DB)
    .then(() => console.log("DB connection established"))
    .catch(() => console.log("Error connecting to Mongo"));
  console.log(`Port Running on: ${port}`);
});
