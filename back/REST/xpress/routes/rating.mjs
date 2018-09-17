"use strict";

import express from "express";
import {query} from "../dbConnectivity/query.mjs";
const router = new express.Router();


// story ratings
router.get("/:storyId", (req, res) => {
  query("match (s:Story)<-[r:Rating ]-(a:Author) where id(s) = $sid return a, r", {
    sid: parseInt(req.params.storyId)
  }, "row", (data) => {
    res.setHeader("Content-Type", "application/json");
    res.json(data);
  });
});


export {
  router
};