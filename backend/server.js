const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./routes");

const app = express();
app.use(cors());
app.use(bodyParser.json());


// // Test API Route
// app.get("/", (req, res) => {
//   res.send("Hello, Express Backend with Firebase!");
// });

// // API Route to Create a User in Firestore
// app.post("/register", async (req, res) => {
//   try {
//     const { email, name, phone } = req.body;
//     const newUser = await db.collection("users").add({ email, name, phone });

//     res.status(201).json({ id: newUser.id, message: "User created successfully" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// Middleware
app.use(cors()); 
app.use(bodyParser.json()); 
app.use('/', routes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
