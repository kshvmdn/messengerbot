#! /usr/bin/env node
"use strict";

const login = require("facebook-chat-api");
const giphy = require("giphy-api")();
const confg = require("./config");
const genius = require("node-hackgenius");

login({email: confg.EMAIL, password: confg.PASS}, function callback(err, api) {
  if (err) return console.error(err);

  api.listen(function callback(err, message) {
    var msg = message.body.toLowerCase();
    api.markAsRead(message.threadID);

    if (msg.includes("/kick")) {
      if (msg.includes("swar"))
        api.removeUserFromGroup(confg.SWAR, message.threadID);
      else if (msg.includes("kaartikey"))
        api.removeUserFromGroup(confg.KAARTIKEY, message.threadID);
      else if (msg.includes("anuj"))
        api.removeUserFromGroup(confg.ANUJ, message.threadID);
    }

    if (msg === "/say hi")
      api.sendMessage("Hello!", message.threadID);

    if (msg === "/stop") {
      api.sendMessage("Goodbye!", message.threadID); 
      return stopListening();
    }

    if (msg.match(/\/giphy (.+)/)) {
      var search = msg.replace("/giphy", "")
      giphy.search(search).then(function(res) {
        var gif = res.data[Math.floor(Math.random() * res.data.length)].images.downsized.url;
        api.sendMessage(gif, message.threadID)
      });
    }

    if (msg.match(/\/rapgenius (.+)/)) {
      var search = msg.replace("/rapgenius", "")
      genius.search(search).then(function(res) {
        return res[0];
      }).then(function(song) {
        api.sendMessage(song.url, message.threadID);
      });
    }
  });
});
