"use strict";

import express from "express";
import bodyParser from "body-parser";
import {
  query
} from "../dbConnectivity/query.mjs";
const router = new express.Router();

router.use(bodyParser.json()); 
router.use(bodyParser.urlencoded({ extended: true }));

// all authors
router.get("/", (req, res) => {
  query("match (N:Author) return N", {
    "": ""
  }, "row", (data) => {
    res.setHeader("Content-Type", "application/json");
    res.json(data);
  });
});

// particular author

router.get("/:id", (req, res) => {
  query("match (N:Author) where id(N) = $sid return N", {
    sid: parseInt(req.params.id)
  }, "row", (data) => {
    res.setHeader("Content-Type", "application/json");
    res.json(data);
  });
});

// author stories

router.get("/:authorName/stories", (req, res) => {
  query("match (a:Author)-[:Wrote]->(s:Story) where a.username = $uname return s.title, s.date, id(s)", {
    uname: req.params.authorName
  }, "row", (data) => {
    res.setHeader("Content-Type", "application/json");
    res.json(data);
  });
});

function authorExists(req, res, uname, f) {
  query("match (n:Author) where n.username = $usrname return n", {
    usrname: uname
  }, "graph", (data) => {
    // console.log(data.results[0].data);
    if (data.results[0].data.length > 0) {
      res.status(400).send("Author already exists");
    } else {
      f();
    }
  });
}

router.post("/", (req,res)=>{
  let uname = req.body.username;
  // console.log(uname);
  authorExists(req,res,uname,()=>{
    //author doesnt exist, creemosl@! 
    query("create (:Author $props)", {
      props: req.body
    }, "row", () => {
      //once inserted, return the inserted author
      //this verifies proper insertion
      query("match (n:Author) where n.username = $usrname return n", {
        usrname: uname
      }, "row", (data) => {
        res.json(data);
      });
    });
  });
});

//delete author not supported for the time being

export {
  router
};