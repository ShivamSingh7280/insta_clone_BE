const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());

// CORS :

app.use(cors());

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

// Passport :
const configurePassport = require("./config/passport");
configurePassport(passport);

// MongoDB :

mongoose
	.connect(`${MONGODB_URI}`)
	.then(() => console.log(`MONGODB connected successfully.`))
	.catch((error) => console.log(`DB failed to connect! ${error}`));

const authRoutes = require("./routes/auth.routes");
const postRoutes = require("./routes/post.routes");

// Routes ::

app.use("/user", postRoutes);
app.use("/auth", authRoutes);

// EXPRESS SERVER :

app.listen(PORT, () => {
	console.log(`Express Server started at PORT : ${PORT}`);
});
