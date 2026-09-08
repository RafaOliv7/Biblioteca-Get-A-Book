const express = require("express");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(express.json());

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

app.use(express.static("public"));

const UserRoutes = require("./routes/UserRoutes");
const BookRoutes = require("./routes/BookRoutes");

app.use("/users", UserRoutes);
app.use("/books", BookRoutes);

app.listen(5000);
