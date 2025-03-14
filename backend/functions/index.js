const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./routes");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/", routes);

// Deploy Express API as Firebase Function
exports.api = functions.https.onRequest(app);
