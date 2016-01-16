#! /usr/bin/env node
"use strict";

const login = require("facebook-chat-api");

const SWAR = 100000624288312;
// const KASHAV = 100000964052538;
const ANUJ = 100001462860435;
const KAARTIKEY = 100006982309222;

login({email: process.argv[2], password: process.argv[3]}, function callback(err, api) {
  if (err) return console.error(err);

  api.listen(function callback(err, message) {
    var msg = message.body.toLowerCase();

    if (msg.includes("/kick")) {
      if (msg.includes("swar"))
        api.removeUserFromGroup(SWAR, message.threadID);
      else if (msg.includes("kaartikey"))
        api.removeUserFromGroup(KAARTIKEY, message.threadID);
      else if (msg.includes("anuj"))
        api.removeUserFromGroup(ANUJ, message.threadID);
    }

    if (msg === "/say hi") {
      api.sendMessage("Hello!", message.threadID);
    }

    if (msg === "/stop") {
      api.sendMessage("Goodbye!", message.threadID);
      return stopListening();
    }

  });
});
