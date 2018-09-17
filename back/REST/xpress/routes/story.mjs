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

//create story
// {
// 	"padre":257,
// 	"story":{
// 		"title":"tercero",
// 		"text":"blabidi blabidi bla",
// 		"date": "2017-08-23",
// 		"modifiability":2
// 	},
// 	"author":{"username":"mneira011"},
// 	"tags":["#academic","#fantasy"]
// }

router.post('/',(req,res)=>{
    console.log("entra a postear");
    const tags = req.body.tags;
    let myQuery = `
        match (a:Author) 
        match (p:Story) 
        where a.username = $uname and id(p) = $pid 
        create (s :Story $props), (a) -[:Wrote]->(s), (p)<-[:Inherits]-(s) `;
    const tagQuery = tags.map((x)=>`merge (${x.replace("#","")}:Tag {name: \$${x.replace("#","")}})  create (s)-[:Is]->(${x.replace("#","")}) `).join(" ");
    let tagDict = {}
    for(let i of tags){
        tagDict[i.replace("#","")] = i;
    }

    tagDict["props"] = req.body.story;
    tagDict["uname"] = req.body.author.username;
    tagDict["pid"] = req.body.padre;
    // console.log(tagDict);
    // console.log(myQuery);
    query(myQuery+tagQuery, tagDict, "row", (data) => {
        console.log("finished");
        // res.setHeader('Content-Type', 'application/json');
        
        res.send("Created story succesfully");

    });
    


});


// root story
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
    query("match (s:Story) match(a:Author) match (t:Tag) where (a)-[:Wrote]->(s) and (s)-[:Is]->(t) return s,a,collect(t)", {
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



export {
    router
};
