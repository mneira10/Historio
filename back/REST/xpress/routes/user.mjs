/*jslint devel: true */
// "use strict";

import express from "express";
import bodyParser from "body-parser";
import {
    query,
    mongoQuery
} from "../dbConnectivity/query.mjs"
import assert from 'assert';
import sha1 from 'sha1';

const router = new express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));

// all users
router.get("/", (req, res) => {
    mongoQuery((collection)=>{
        // res.send(data);
        collection.find({}).toArray(function(err, docs) {
            assert.equal(err, null);
            res.json(docs);
          });
    });
    
});

router.post("/",(req,res)=>{
    mongoQuery((collection)=>{
        collection.find({'username':req.body.username}).toArray(function(err, docs) {
            assert.equal(err, null);
            res.json(docs);
          });
    });
});

router.post("/authenticate",(req,res)=>{
    mongoQuery((collection)=>{
        collection.find({'username':req.body.username}).toArray(function(err, docs) {
            assert.equal(err, null);

            // console.log("Hashed psswd inpyt");
            // console.log(req.body.pass);
            // console.log("sha1 qwerty1234")
            // console.log("153fa238cec90e5a24b85a79109f91ebe68ca481");
            // console.log("salt");
            // console.log(docs[0].salt);
            // console.log("input hash + salt");
            // console.log(req.body.pass+docs[0].salt);
            // console.log("sha of input hash + salt");
            // console.log(sha1(req.body.pass+docs[0].salt));
            // console.log("Hashed psswd db");
            // console.log(docs[0].hash);
            if(sha1(req.body.pass+docs[0].salt)===docs[0].hash){
                res.send(true);
            }
            else{
                res.send(false);
            }
            
          });
    });
});

export {
    router
};