const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

// Routes
const fooRoutes = require("./routes/foo-route");

const allowedOrigins = process.env.APP_URI.split(",").map((url) => `${url}`);
const options = (cors.CorsOptions = {
    origin: allowedOrigins,
});

app.use(express.json());
app.use(cors(options));
app.use(cookieParser(process.env.SECRET_COOKIES));

app.use("/api", fooRoutes);

if (process.env.NODE_ENV !== "production") {
    console.log("Allowed Origins: ", allowedOrigins);
}

module.exports = app;
