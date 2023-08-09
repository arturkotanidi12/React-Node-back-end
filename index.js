const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const port = process.env.PORT || 3000;

const clientsRoutes = require("./routes/clients");

// MIDDLEWARE
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:3001'],
  })
);

// use routes
app.use("/api/clients", clientsRoutes);
app.get('/', (req, res) => {
    res.send('success')
})
app.listen(port, () => console.log(`Server started on port ${port}`));
