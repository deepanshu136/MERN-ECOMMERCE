const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

require("dotenv").config();
const connectDB = require("./config/db");
const router = require("./routes/user");

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api", router);

const PORT = 8080 || process.env.PORT;

connectDB();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
