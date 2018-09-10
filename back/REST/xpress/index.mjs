/*jslint devel: true */
// "use strict";

import {router as author}  from "./routes/author";
import {router as story}  from "./routes/story";
import {router as rating}  from "./routes/rating";
import express from "express";

const app = express();

app.use("/author", author);
app.use("/story", story);
app.use("/rating", rating);



app.listen(3000, () => console.log("Narrario back listening on port 3000!"));