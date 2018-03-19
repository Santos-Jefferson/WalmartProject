﻿"use strict";

var tokenApi = "8d97n679j89udpwveju6naw3";
var urlDomain = "https://api.walmartlabs.com";

function getInput() {
    return document.getElementById("searchString").value;
}

function getUrlProdPath(input, token){
    var result = urlDomain + "/v1/search?query=" + input + "&apiKey=" + tokenApi + "&sort=price&order=desc";
    return result;
}

function getUrlRecommPath(input, token) {
    var result = urlDomain + "/v1/nbp?apiKey=" + token + "&itemId=" + input;
    return result;
}

function getDataFromWalmart(url) {
    var settings = {
        "async": true,
        "crossDomain": true,
        "dataType": 'jsonp',
        "url": url,
        "method": "GET",
        "headers": {
            "Cache-Control": "no-cache",
            "Postman-Token": "d58cbb69-4cb1-436c-a02b-ba5f27cf9981"
        }
    }
    var table = "";
    $.ajax(settings).done(function (response) {
        if (response.totalResults === 0) {
            document.getElementById("jsonReturn").innerHTML = response.message;
        }
        else {
            for (var i = 0; i < response.items.length; i++) {
                var itemIdRecomm = response.items[i].itemId;
                table += "<div class=prodGallery><a target=_blank href=javascript:" + getRecommFromWalmart(itemIdRecomm) + "><img src=" + response.items[i].largeImage + "></a><hr />";
                table += "<div class=desc><strong>" + response.items[i].name + "</strong><br /><br />";
                table += response.items[i].shortDescription + "<br />";
                table += "<strong>$" + response.items[i].salePrice.toFixed(2) + "</strong></div></div>";
            }
            document.getElementById("productsReturn").innerHTML = table;
        }
    });
}

function getRecommFromWalmart(itemId) {
    var settings = {
        "async": true,
        "crossDomain": true,
        "dataType": 'jsonp',
        "url": urlDomain + "/v1/nbp?apiKey=" + tokenApi + "&itemId=" + 923785964,
        "method": "GET",
        "headers": {
            "Cache-Control": "no-cache",
            "Postman-Token": "a6eb861a-7b15-45c0-8ce1-158db64533ce"
        }
    }
    var table = "";
    $.ajax(settings).done(function (response) {
        //console.log(response);
        for (var i = 0; i < response.items.length; i++) {
            table += "<div class=prodGallery>" + response.items[i].largeImage + "></a>";
            table += "<div class=desc><strong>" + response.items[i].name + "</strong><br /><br />";
            table += "<strong>$" + response.items[i].salePrice.toFixed(2) + "</strong></div></div>";
        }
        document.getElementById("recommReturn").innerHTML = table;
    });
}

function getRecommFromWalmartTest() {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.walmartlabs.com/v1/nbp?apiKey=8d97n679j89udpwveju6naw3&itemId=278727265",
        "method": "GET",
        "headers": {
            "Cache-Control": "no-cache",
            "Postman-Token": "39bf9206-3a95-431c-a362-4ed82389a2cd"
        }
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
    });
}


function main() {
    //var log = getRecommFromWalmartTest();
    //console.log(log);

    var input = getInput();
    var urlRecommPath = getUrlRecommPath(input, tokenApi);
    var urlProdPath = getUrlProdPath(input, tokenApi);
    getDataFromWalmart(urlProdPath, urlRecommPath);
}