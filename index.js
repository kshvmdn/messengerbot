#! /usr/bin/env node
"use strict";

const login = require("facebook-chat-api");
const confg = require('./config');

login({email: confg.EMAIL, password: confg.PASS}, function callback(err, api) {
  if (err) return console.error(err);

  api.listen(function callback(err, message) {
    var msg = message.body.toLowerCase();

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
  });
});
