const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user");
const { hashPassword, comparePasswords } = require("./helper/auth.js");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
    credentials: true, // Allow cookies to be sent
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  console.log("Token:", token); // Log the token
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
      if (err) {
        console.error("JWT Verification Error:", err); // Log the error
        return res.json(null);
      }
      // console.log("User:", user); // Log the user
      res.json(user);
    });
  } else {
    res.json(null);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ error: "Please provide email and password" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ error: "No such user found!" });
    }

    const match = await comparePasswords(password, user.password);

    if (match) {
      jwt.sign(
        { email: user.email, id: user._id, name: user.name },
        process.env.JWT_SECRET,
        {},
        (err, token) => {
          if (err) {
            throw err;
          }
          res
            .cookie("token", token, {
              httpOnly: true,
              secure: true,
              sameSite: "none",
              path: "/",
            })
            .status(200)
            .json({ message: "Login successful", user });
        }
      );
    } else {
      return res.json({ error: "Password is incorrect" });
    }
  } catch (error) {
    console.log(error);
  }
});

//Registration Post
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

    const hashed = await hashPassword(password);

    const userCreated = await User.create({ name, email, password: hashed });
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
