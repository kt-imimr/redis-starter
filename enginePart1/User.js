const Bull = require('bull');


const redisConfig = {
    host: '127.0.0.1', // Redis server address
    port: 6379,        // Redis server port
    // You can add more Redis connection options here if needed
};

const jobOptions = {
    lockDuration: 10000, // 10 seconds
};

class User {
    constructor(){
        this.username = null
        this.queue = null
        this.userQueues = {}   // we can use "username" as a key to lookup their own queue
        this.addJob = null
    }
    hasQueue(username){
        return !!this.userQueues[username]
    }

    createQueue(username){
        this.queue = new Bull(username, { redis: redisConfig }); // only use this one so far
        this.userQueues[username] = this.userQueues[username] ? this.userQueues[username] : this.queue
        this.username = username
        return this.queue
    }
    


    getQueue(username){
        return this.queue || this.userQueues[username]
    }
    
    getUsername(){
        return this.username
    }

    
}

const user = new User()
module.exports = user
