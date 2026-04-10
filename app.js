//Required modules
const express = require("express");

const app = express();

require("dotenv").config();

const cors = require("cors");

const connectToMongoDB = require("./handlers/mongoDbHandler");

//Required Routes
const main_routes = require("./routes/main_routes");

const auth_routes = require("./routes/auth_routes")

//Config Options
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: process.env.HOST,
    methods: ["POST", "GET", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

connectToMongoDB();

//Used Routes

app.use(main_routes);

app.use("/auth", auth_routes);

//Server Starts
app.listen(process.env.PORT, () => {
  console.log("Succesfully launched the app on port:", process.env.PORT);
});
