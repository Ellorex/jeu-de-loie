const redis = require('redis');
const { spawn } = require('child_process');

spawn('redis-server');
let redisClient = redis.createClient(6379, '127.0.0.1');

redisClient.on('connect', function() {
    console.log('Redis client connected');
});

redisClient.on('error', function (err) {
    console.log('Something went wrong ' + err);
});

module.exports = {
    redisClient,
}
