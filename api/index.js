const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const authRoute = require("./routes/create");
const morgan = require("morgan");
const { uuid } = require("uuidv4");
const fs = require("fs");
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const swaggerJSdoc = require("swagger-jsdoc");

// Extended: https://swagger.io/specification/#infoObject
const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Card API",
			version: "1.0.0",
			description: "A Simple Express Card API",
		},
		servers: [
			{
				url: "http://localhost:8800",
			},
		],
	},
	apis: ["./routes/*.js"],
};
const swaggerDocs = swaggerJSdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));


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
  morgan("id [:id] method[:method] url[:url] response time[:response-time] request[:body] ", { stream: accesslogstream })
);

app.use(morgan("id [:id] method[:method] url[:url] response time[:response-time] request[:body] "));

app.listen(8800, () => {
  console.log("Server is running on port 8800");
});

app.use(express.json());

function assignid(req, res, next) {
  req.id = uuid();
  next();
}

app.use(morgan({
  collection: 'error_logger',
  connectionString:process.env.MONGO_URL,
  user: 'lama',
  pass: 'lama'
 },
 {
  skip: function (req, res) {
      return res.statusCode < 400;
  }
 },
 'dev'
));

mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (err) => {
    if (err) console.log(err);
    else console.log(`Database connected`); // acutally either this must get prin
  }
);


app.use("/api/create", authRoute);
