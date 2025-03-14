const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./routes");

const app = express();

// Middleware
app.use(cors()); 
app.use(bodyParser.json()); 
app.use('/', routes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
