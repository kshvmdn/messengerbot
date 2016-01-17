#! /usr/bin/env node
"use strict";

const login = require("facebook-chat-api");
const giphy = require("giphy-api")();
const confg = require("./config");
const genius = require("node-hackgenius");

login({email: confg.EMAIL, password: confg.PASS}, function callback(err, api) {
  if (err) return console.error(err);

  api.listen(function callback(err, message) {
    let msg = message.body.toLowerCase();

    if (msg.includes("/kick")) {
      var user = msg.replace("/kick ", "").toUpperCase();
      api.removeUserFromGroup(confg[user], message.threadID);
    }

    if (msg.includes("/add")) {
      var user = msg.replace("/add ", "").toUpperCase();
      api.addUserToGroup(confg[user], message.threadID);
    }

    if (msg.includes("/say"))
      api.sendMessage(msg.replace("/say ", ""), message.threadID);

    if (msg === "/stop") {
      api.sendMessage("Goodbye!", message.threadID); 
      return stopListening();
    }

    if (msg.includes("/giphy")) {
      var query = msg.replace("/giphy", "")
      giphy.search(query).then(function(res) {
        var gif = res.data[Math.floor(Math.random() * res.data.length)].images.downsized.url;
        api.sendMessage(gif, message.threadID)
      });
    }

    if (msg.includes("/rapgenius")) {
      var query = msg.replace("/rapgenius", "")
      genius.search(query).then(function(res) {
        return res[0];
      }).then(function(song) {
        var url = song.url
        api.sendMessage(url, message.threadID);
      });
    }
  });
});
