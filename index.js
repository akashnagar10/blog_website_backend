const express = require("express");
const path = require("path");

const userRoutes = require("./routes/user");
const { connectDB } = require("./connect");

const app = express();
const PORT = 3000;

connectDB("mongodb://localhost:27017/Blog")
  .then(() => {
    console.log("Database connected successfully 🚀");
  })
  .catch((err) => {
    console.error("Database connection error 🤨:", err);
  });

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/", (req, res) => {
  res.render("home");
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/user", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
