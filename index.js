#! /usr/bin/env node
"use strict";

const login = require("facebook-chat-api");
const giphy = require("giphy-api")();
const confg = require("./config");
const genius = require("node-hackgenius");
const request = require("request");
const define = require("define-it").definitions;

login({email: confg.EMAIL, password: confg.PASS}, function callback(err, api) {
  if (err) return console.error(err);

  var listen = api.listen(function callback(err, message) {
    if (err) return console.error(err);
    let msg = message.body.toLowerCase();

    if (msg.includes("/kick")) {
      var user = msg.replace("/kick ", "").toUpperCase();
      if (confg[user] != undefined)
        api.removeUserFromGroup(confg[user], message.threadID);
    }

    if (msg.includes("/add")) {
      var user = msg.replace("/add ", "").toUpperCase();
      if (confg[user] != undefined)
        api.addUserToGroup(confg[user], message.threadID);
    }

    if (msg === "/say hi") {
      api.sendMessage("Hello, I\'m Kashav Bot!", message.threadID);
    }

    if (msg === "/stop") {
      api.sendMessage("Goodbye!", message.threadID); 
      return listen();
    }

    if (msg === ": )") {
      api.sendMessage("( :", message.threadID);
    }

    if (msg.includes("/nba")) {
      api.sendMessage("BALL IS LIFE", message.threadID);
    }

    if (msg.includes("/define")) {
      var query = msg.replace("/define ", "");
      define(query, function(err, res) {
        if (err) api.sendMessage('Can\'t find definition', message.threadID);
        if (!err) api.sendMessage(res[0], message.threadID);
      });
    }

    if (msg.includes("/giphy")) {
      var query = msg.replace("/giphy ", "");
      giphy.search(query).then(function(res) {
        var gif = res.data[Math.floor(Math.random() * res.data.length)].images.downsized.url;
        api.sendMessage(gif, message.threadID)
      });
    }

    if (msg.includes("/rapgenius")) {
      var query = msg.replace("/rapgenius ", "")
      genius.search(query).then(function(res) {
        return res[0];
      }).then(function(song) {
        var url = song.url
        api.sendMessage(url, message.threadID);
      });
    }
  });
});
