require('dotenv').config();
const express = require("express");
const app = express();
const port = process.env.PORT;
const router = require('./server/routers/routers');
const cors = require("cors")

app.use(cors());
app.use(express.json());
app.use("/", express.static('./server/images'))
app.use('/', router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
