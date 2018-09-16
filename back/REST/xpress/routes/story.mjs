/*jslint devel: true */
// "use strict";

import express from "express";
import {
    query
} from "../dbConnectivity/query.mjs"
import bodyParser from "body-parser";
const router = new express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));


// roo story
router.get("/root", (req, res) => {
    query("match (N:Root) return id(N)", {
        "": ""
    }, "row", (data) => {
        res.setHeader('Content-Type', 'application/json');
        res.json(data.results[0].data[0].row[0]);
    });
});

// all stories
router.get("/", (req, res) => {
    query("match (N:Story) return N", {
        "": ""
    }, "row", (data) => {
        res.setHeader('Content-Type', 'application/json');
        res.json(data);
    });
})

// get particular story

router.get("/:id", (req, res) => {
    query("match (N:Story) where id(N) = $sid return N", {
        sid: parseInt(req.params.id)
    }, "row", (data) => {
        res.setHeader('Content-Type', 'application/json');
        res.json(data);
    });
});

// story authors
router.get("/:id/authors", (req, res) => {
    query(`
    MATCH (s:Story ),(r:Root ) 
    where id(s)=$sid
    match  p = allShortestPaths((s)-[:Inherits*]->(r)) 
    match (a:Author)-[:Wrote]->(n)
    where n in nodes(p)
    return a
    `, {
        sid: parseInt(req.params.id)
    }, "row", (data) => {
        res.setHeader('Content-Type', 'application/json');
        res.json(data);
    });
});

// story ratings
router.get("/:id/ratings", (req, res) => {
    query("match (s:Story)<-[r:Rating]-(a:Author) where id(s)=$sid return r,a", {
        sid: parseInt(req.params.id)
    }, "row", (data) => {
        res.setHeader('Content-Type', 'application/json');
        res.json(data);
    });
});

// story tags

router.get("/:id/tags", (req, res) => {
    query("match (s:Story)-[:Is]->(t:Tag) where id(s)=$sid return t", {
        sid: parseInt(req.params.id)
    }, "row", (data) => {
        res.setHeader('Content-Type', 'application/json');
        res.json(data);
    });
});

// TODO: create story

router.post("/", (req, res) => {
    const story = req.body.story
    const tags = req.body.tags
    const authorUsername = req.body.author.username

    let tagQuery = `match (a:Author) 
                    match (p:Story) 
                    where a.username = $uname and id(p) = $pid 
                    create (s :Story $props), (a) -[:Wrote]->(s), (p)<-[:Inherits]-(s)`
    //need to create tags if they dont already exist
    // for(let tag of tags){
    //     miQuery += "merge ({0}:Tag {{ name: ${0}}}) ".format(tag.replace("#", ""))
    //     tagDict[tag.replace("#", "")] = tag
    //     miQuery += "create (s)-[:Is]->(" + tag.replace("#", "") + ") "
    // }
});

export {
    router
};