/*jslint devel: true */
// "use strict";

import {router as author}  from "./routes/author";
import {router as story}  from "./routes/story";
import express from "express";

const app = express();

app.use("/author", author);
app.use("/story", story);



app.listen(3000, () => console.log("Example app listening on port 3000!"));