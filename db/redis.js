'use strict'
const redis = require('redis');
const config = require('../settings');

const redisLink = config['redis'][process.env.NODE_ENV || 'development']['connectionString'];
const redisClient = redis.createClient(redisLink);

redisClient
    .on('error', err => console.log('------ Redis connection failed ------' + err))
    .on('connect', () => console.log('------ Redis connection succeed ------'));

module.exports =  {
    redis: redis,
    redisClient: redisClient,
};
