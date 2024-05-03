require("dotenv").config();
const express = require("express");
const router = require("./routes");
const dbConnection = require("./config/mongoDbConfig");
const cors = require("cors");

const app = express();
dbConnection();
app.use(cors());
app.use(express.json());
app.use("/", router);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`app is listening on port ${port}`));
