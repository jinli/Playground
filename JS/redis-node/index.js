
let redis = require('redis');

//let pub = redis.createClient();
let sub = redis.createClient({host: "127.0.0.1"});

sub.on("subscribe", (channel, count) => {
    console.log("Subscribed to " + channel + ". Now subscribed to " + count + " channel(s).");
});


sub.on("message", (channel, message) => {
    console.log("Message from channel " + channel + ":" + message);
})

sub.subscribe("foo");

