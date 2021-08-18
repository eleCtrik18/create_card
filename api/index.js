const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const authRoute = require("./routes/create");
const morgan = require("morgan");
const { uuid } = require("uuidv4");
const fs = require("fs");
const path = require("path");

morgan.token("id", function getId(req) {
  return req.id;
});
morgan.token("body", function getUser(req) {
  return JSON.stringify(req.body);
});
morgan.token("request", function getIp(res) {
  return JSON.stringify(res.data.body);
});



app.use(assignid);

let accesslogstream = fs.createWriteStream(path.join(__dirname, "access.log"), {
  flags: "a",
});
app.use(
  morgan(":id :method :url :response-time :body ", { stream: accesslogstream })
);

app.use(morgan(":id :method :url :response-time :body "));

app.listen(8800, () => {
  console.log("Server is running on port 8800");
});

app.use(express.json());

function assignid(req, res, next) {
  req.id = uuid();
  next();
}

mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (err) => {
    if (err) console.log(err);
    else console.log(`Database connected`); // acutally either this must get prin
  }
);

app.use("/api/create", authRoute);
