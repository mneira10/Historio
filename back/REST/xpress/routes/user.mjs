"use strict";

import express from "express";
import bodyParser from "body-parser";
import {
  query,
  mongoQuery
} from "../dbConnectivity/query.mjs";
import assert from "assert";
import sha1 from "sha1";
import request from "request";

const router = new express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: true
}));


router.post("/", (req, res) => {
  mongoQuery((collection, client) => {
    collection.find({
      "username": req.body.username
    }).toArray(function (err, docs) {
      assert.equal(err, null);
      if (docs.length > 0) {
        res.send("Sorry, the username already exists.");
      } else {

        console.log("generating salt...");
        const psalt = Math.random().toString(36).substring(2, 12);
        const phash = sha1(req.body.pass + psalt);
        console.log("inserting user in db...");

        collection.insertMany([{
          username: req.body.username,
          salt: psalt,
          hash: phash
        }], function (err, result) {
          assert.equal(err, null);
          assert.equal(1, result.result.n);
          assert.equal(1, result.ops.length);
          // console.log("Inserted 3 documents into the collection");
          console.log("created user");
          res.send("User created succesfully");
          console.log("closing conection");
          client.close();

          //create user in neo4j
          // console.log(req.body);
          delete req.body.pass;
          request({
            uri: "http://neo4jbig8575.cloudapp.net:8080/author",
            method: "POST",
            json: req.body
          },
          function (error, response) {
            if (!error && response.statusCode == 200) {
              console.log("author added correctly to neo4j"); // Print the shortened url.
            }
          });


        });


      }
    });
  });
});

router.post("/authenticate", (req, res) => {
  mongoQuery((collection, client) => {
    collection.find({
      "username": req.body.username
    }).toArray(function (err, docs) {
      assert.equal(err, null);
      if (docs.length === 0) {
        res.status(400);
        res.send(false);
      } else if (sha1(req.body.pass + docs[0].salt) === docs[0].hash) {
        const uname = req.body.username;
        query("match (n:Author) where n.username = $usrname return n", {
          usrname: uname
        }, "row", (data) => {
          res.json(data);
        });

      } else {
        res.status(400);
        res.send(false);
      }
      console.log("closing conection");
      client.close();

    });
  });
});

export {
  router
};