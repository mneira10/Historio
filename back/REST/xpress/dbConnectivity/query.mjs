/*jslint devel: true */
// "use strict";


import btoa from 'btoa';
import request from "request";


let headersToSend = {
    'Authorization': 'Basic ' + b64EncodeUnicode('flask:2hn54frYm4', 'utf-8'),
    'Accept': 'application/json; charset=UTF-8',
    'Content-Type': 'application/json'
}


function query(theQuery, JSONparam = {
    "": ""
}, returnType = "graph", cbk) {
    let config = {
        "statements": [{
            "statement": theQuery,
            "parameters": JSONparam,
            "resultDataContents": [returnType]
        }]
    }
    // url to db: http://neo4jbig8575.cloudapp.net

    request({
        url: "http://neo4jbig8575.cloudapp.net:7474/db/data/transaction/commit",
        method: "POST",
        headers: headersToSend,
        json: config
    }, function (error, response, body) {
        cbk(body);
    });


}

function b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
        function toSolidBytes(match, p1) {
            return String.fromCharCode('0x' + p1);
        }));
}

export {query};