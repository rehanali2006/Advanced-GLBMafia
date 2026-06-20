const { createClient } = require("redis");

const client = createClient({
    url: "redis://127.0.0.1:6379"
});

client.on("error", console.error);

client.connect();

module.exports = client;