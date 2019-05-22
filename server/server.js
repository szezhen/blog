const express = require("express"); // backend framework
const mongoose = require("mongoose"); // orm to interact with mongodb
// const bodyParser = require("body-parser");
const path = require("path");
const config = require("config");

// const items = require("./routes/api/items");

const app = express();

// Bodyparse Middleware
// app.use(bodyParser.json());
app.use(express.json());

// DB Config
// const MongoClient = require("mongodb").MongoClient;
// const uri = require("./config/keys").mongoURI;
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
// const db = require("./config/keys").mongoURI;
const db = config.get("mongoURI");

// Connect to Mongo
mongoose
  .connect(db, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log("MongoDB Connected.."))
  .catch(err => console.log(err));

// Use Routes
// app.use("/api/items", items);
app.use("/api/items", require("./routes/api/items"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));

// Serve static assets if in production
// if (process.env.NODE_ENV === "production") {
//   // Set static folder
//   app.use(express.static("client/build"));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }
// put into server package.json script for CLI
// "heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run build --prefix client"
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
