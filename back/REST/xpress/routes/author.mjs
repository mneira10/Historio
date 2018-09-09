/*jslint devel: true */
// "use strict";

import express from "express";
import {query} from "../dbConnectivity/query.mjs"
const router = new express.Router();

router.get("/", (req, res) => {
    query("match (N:Root) return id(N)", {
        "": ""
    }, "row", (data) => {
        console.log("da cbk");
        res.set('Content-Type', 'application/json');
        res.send(data);
    });
});

export {
    router
};