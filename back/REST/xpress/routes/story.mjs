/*jslint devel: true */
// "use strict";

import express from "express";
import {query} from "../dbConnectivity/query.mjs"
const router = new express.Router();


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
router.get("/",(req,res)=>{
    query("match (N:Story) return N", {
        "": ""
    }, "row", (data) => {
        res.setHeader('Content-Type', 'application/json');
        res.json(data);
    });
})

// get particular story

router.get("/:id",(req,res)=>{
    query("match (N:Story) where id(N) = $sid return N", {
        sid : parseInt(req.params.id)
    }, "row", (data) => {
        res.setHeader('Content-Type', 'application/json');
        res.json(data);
    });
});

// story authors
router.get("/:id/authors",(req,res)=>{
    query("MATCH (s:Story ),(r:Root ) where id(s)=$sid match  p = allShortestPaths((s)-[:Inherits*]->(r)) match (a:Author)-[:Wrote]->(n) RETURN distinct a;", {
        sid : parseInt(req.params.id)
    }, "row", (data) => {
        res.setHeader('Content-Type', 'application/json');
        res.json(data);
    });
});

// story ratings
router.get("/:id/ratings",(req,res)=>{
    query("match (s:Story)<-[r:Rating]-(a:Author) where id(s)=$sid return r,a", {
        sid : parseInt(req.params.id)
    }, "row", (data) => {
        res.setHeader('Content-Type', 'application/json');
        res.json(data);
    });
});

// story tags

router.get("/:id/tags",(req,res)=>{
    query("match (s:Story)-[:Is]->(t:Tag) where id(s)=$sid return t", {
        sid : parseInt(req.params.id)
    }, "row", (data) => {
        res.setHeader('Content-Type', 'application/json');
        res.json(data);
    });
});

// TODO: create story

export {
    router
};