// Require the Bull library
const Bull = require('bull');
 
// Define Redis connection details
const redisConfig = {
  host: '127.0.0.1', // Redis server address
  port: 6379,        // Redis server port
  // You can add more Redis connection options here if needed
};
 
// Create a queue with the specified Redis connection
const myQueue = new Bull('myQueue', { redis: redisConfig });

const jobOptions = {
  lockDuration: 10000, // 10 seconds
};

// Enqueue a job
const addJob = async (data) => {
	for(let i = 0; i < 10; i++){
	  myQueue.add({ a: `${data}-${i}` }, jobOptions);
	  // console.log every time when a new job is added
	  console.log("job added", i)
	}
}
  

  //? 2. process the job
const processJob = async (job, done) => {
  try{
    setTimeout(async () => {
    console.log("job done", job.data)
    
    job.progress(job.data)
    
    done()
    
    }, 2000)
  }catch(e){
    console.log(err);
    // const errorMessage = err?.message || err?.Error || err.toString(); // Capture the error message
    // // job.moveToFailed({ failedReason: errorMessage }); // Move the job to the failed state with the error message
    // // await job.update({ failedReason: errorMessage }); // Update the job's state with the error message
    // job.fail({ failedReason: errorMessage })

  }
}


module.exports = {addJob, processJob, myQueue}