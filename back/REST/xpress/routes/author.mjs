/*jslint devel: true */
// "use strict";

import express from "express";
import {query} from "../dbConnectivity/query.mjs"
const router = new express.Router();

// router.get("/", (req, res) => {
//     query("match (N:Root) return id(N)", {
//         "": ""
//     }, "row", (data) => {
//         res.setHeader('Content-Type', 'application/json');
//         res.json(data.results[0].data[0].row[0]);
//     });
// });

export {
    router
};