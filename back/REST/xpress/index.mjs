"use strict";

import {router as author}  from "./routes/author";
import {router as story}  from "./routes/story";
import {router as rating}  from "./routes/rating";
import {router as user}  from "./routes/user";
import express from "express";
import cors from "cors";


const app = express();
app.use(cors());

app.use("/author", author);
app.use("/story", story);
app.use("/rating", rating);
app.use("/user", user);

const port = 8080;

app.listen(port, () => console.log("Narrario back listening on port " + port + "!"));