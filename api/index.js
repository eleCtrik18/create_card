const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const authRoute = require("./routes/create");

app.listen(8800, () => {
  console.log("Server is running on port 8800");
});

app.use(express.json());

mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (err) => {
    if (err) console.log(err);
    else console.log(`Database connected`); // acutally either this must get prin
  }
);



app.use("/api/create", authRoute);
