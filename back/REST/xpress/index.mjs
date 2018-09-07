/*jslint devel: true */
// "use strict";

import {router as author}  from "./routes/author";
import express from "express";

const app = express();

// app.get("/", (req, res) => res.send("Hello World!"))

// const other = require("./routes/other");

app.use("/", author);



app.listen(3000, () => console.log("Example app listening on port 3000!"));