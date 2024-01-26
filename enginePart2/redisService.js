const redis = require("redis")
const Bull = require('bull');

// const redisConfig = {
//     host: '127.0.0.1', // Redis server address
//     port: 6379,        // Redis server port
//     // You can add more Redis connection options here if needed
// };

// const jobOptions = {
//     lockDuration: 10000, // 10 seconds
// };

// let queue = new Bull('KT', { redis: redisConfig }); // only use this one so far


// const processJob = async (job, done) => {
// 	try{
// 	  setTimeout(async () => {
// 		console.log("processing job: ", job.data)
		
// 		// job.progress(job.data)
		
// 		done()
		
// 	  }, 2000)
// 	}catch(e){
// 	  console.log(err);
// 	  const errorMessage = err?.message || err?.Error || err.toString(); // Capture the error message
// 	  // job.moveToFailed({ failedReason: errorMessage }); // Move the job to the failed state with the error message
// 	  // await job.update({ failedReason: errorMessage }); // Update the job's state with the error message
// 	  job.fail({ failedReason: errorMessage })
  
// 	}
// }
(async () => {

    const client = redis.createClient();
  
    const subscriber = client.duplicate();
  
    await subscriber.connect();
  
    await subscriber.subscribe('to_be_executed', (message) => {
      console.log(typeof message); // 'message'
    });
  
    console.log("enginePart2: redisService starts");

})();

// exports.redisSubscriber = async(req, res) => {

// }