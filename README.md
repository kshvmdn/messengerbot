# MessengerBot
Facebook Messenger bot for random commands (and lols _ofc_). Built with [facebook-chat-api](https://github.com/Schmavery/facebook-chat-api).

#### Usage
Clone repository, install dependencies.

```
git clone github.com/kshvmdn/messengerbot && cd messengerbot
```

```
npm install
```

Configure account/friend msg IDs
```
touch config.js
```
Add the following to `config.js`.
```javascript
module_exports = {
	'EMAIL': '', // FB email
	'PASS': '', // FB pass
	// add for every friend that you want to use kick/add functionality with
	'FRIEND_NAME': FRIEND_MSG_ID // see below to find this value
}
```


Either find `FRIEND_MSG_ID` by
+ manually parsing through the XHR responses (check `pull` in devtools) or 
+ adding the following line to `index.js`, then running the program and waiting for the _"target"_ to message (`FRIEND_MSG_ID` is `message.senderID`).
```javascript
...
var listen = api.listen(function callback(err, message) {
    console.log(message); // add this (line 16)
...
```

Run the app.
```
node index.js
```

The bot should be running. Add _it_ to your group chat and you're ready!

#### Contribute
Feel free to [make a pull request](https://github.com/kshvmdn/messengerbot/pulls) or [open an issue](https://github.com/kshvmdn/messengerbot/issues)! All contributions are welcome.
