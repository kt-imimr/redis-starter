const redis = require("redis");

(async () => {

    const client = redis.createClient();
  
    const subscriber = client.duplicate();
  
    await subscriber.connect();
  
    await subscriber.subscribe('to_be_executed', async (message) => {
      console.log(message); // 'message'
    })

    console.log("enginePart3: redisService starts");

  })();