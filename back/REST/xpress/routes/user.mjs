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
import request from 'request';

const router = new express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));


router.post("/", (req, res) => {
    mongoQuery((collection,client) => {
        collection.find({
            'username': req.body.username
        }).toArray(function (err, docs) {
            assert.equal(err, null);
            if (docs.length > 0) {
                res.send("Sorry, the username already exists.");
            } else {

                console.log("generating salt...");
                const psalt = Math.random().toString(36).substring(2, 12);
                const phash = sha1(req.body.pass + psalt);
                console.log('inserting user in db...');

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
                    request({
                        uri: 'http://neo4jbig8575.cloudapp.net:8080/author',
                        method: 'POST',
                        json: req.body},
                        function (error, response, body) {
                            if (!error && response.statusCode == 200) {
                                console.log('author added correctly to neo4j') // Print the shortened url.
                            }
                        });


                });


            }
        });
    });
});

router.post("/authenticate", (req, res) => {
    mongoQuery((collection,client) => {
        collection.find({
            'username': req.body.username
        }).toArray(function (err, docs) {
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
            // console.log("entraaaaaa");
            // console.log(docs.length);
            if(docs.length===0){
                res.status(400);
                res.send(false);
            }
            else if (sha1(req.body.pass + docs[0].salt) === docs[0].hash) {
                res.send(true);
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