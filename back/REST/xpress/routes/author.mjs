/*jslint devel: true */
// "use strict";

import express from "express";
import {query} from "../dbConnectivity/query.mjs"
const router = new express.Router();


// all authors
router.get("/", (req, res) => {
    query("match (N:Author) return N", {
        "": ""
    }, "row", (data) => {
        res.setHeader('Content-Type', 'application/json');
        res.json(data);
    });
});

// particular author

router.get("/:id", (req, res) => {
    query("match (N:Author) where id(N) = $sid return N", {
        sid : parseInt(req.params.id)
    }, "row", (data) => {
        res.setHeader('Content-Type', 'application/json');
        res.json(data);
    });
});

// author stories

router.get("/:authorName/stories", (req, res) => {
    query("match (a:Author)-[:Wrote]->(s:Story) where a.username = $uname return s.title, s.date, id(s)", {
        uname : req.params.authorName
    }, "row", (data) => {
        res.setHeader('Content-Type', 'application/json');
        res.json(data);
    });
});


export {
    router
};