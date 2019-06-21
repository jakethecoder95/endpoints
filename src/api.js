const express = require("express");
const serverless = require("serverless-http");
const bodyParser = require("body-parser");

const app = express();
const router = express.Router();
const cutterConstructionRoutes = require("./routes/cutter-construction");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

router.use("/cutter-construction", cutterConstructionRoutes);

// Errors
router.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  if (req.headers.origin) {
    res.status(status).json({ message: error.message, data: error.data });
  } else {
    res.status(500).json({
      errorMsg:
        "500 Error: We appologies for the inconvenience. Our team is working to get this fixed."
    });
  }
});

app.use("/.netlify/functions/api", router);

module.exports.handler = serverless(app);
