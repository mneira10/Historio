/*jslint devel: true */
// "use strict";

import express from "express";
import btoa from 'btoa';
import $ from 'jquery';
const router = new express.Router();

let headersToSend = {
    'Authorization': 'Basic ' + b64EncodeUnicode('flask:2hn54frYm4', 'utf-8'),
    'Accept': 'application/json; charset=UTF-8',
    'Content-Type': 'application/json'
}

function query(theQuery, JSONparam = { "" : "" } , returnType="graph",cbk) {
    let config = {
        "statements": [
            {
                "statement": theQuery,
                "parameters": JSONparam,
                "resultDataContents": [returnType]
            }
        ]
    }
    // url to db: http://neo4jbig8575.cloudapp.net

    $.ajax({
        url: 'http://neo4jbig8575.cloudapp.net',
        type: 'post',
        data: config,
        headers: headersToSend,
        dataType: 'json',
        success: ((data) => cbk(data) )
    });
}

function b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
        function toSolidBytes(match, p1) {
            return String.fromCharCode('0x' + p1);
    }));
}

router.get("/", (req, res) => {
    query("match (n) return n" , (data) => console.log(data));
});

export {router};



