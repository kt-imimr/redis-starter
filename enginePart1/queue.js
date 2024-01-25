// Require the Bull library
const {
  Queue, 
  Worker, 
  QueueEvents 
} = require('bullmq');
// const Bull = require('bull')

const queueEvents = new QueueEvents("myQueue")

// Define Redis connection details
const connectionOptions = {
  host: '127.0.0.1', // Redis server address
  port: 6379,        // Redis server port
  // You can add more Redis connection options here if needed
};

const jobOptions ={
  removeOnComplete: true,
  removeOnFail: 5000,
}



// Create a queue with the specified Redis connection
const myQueue = new Queue('myQueue', { 
  connection: connectionOptions, 
  defaultJobOptions: jobOptions,
  settings:{
    concurrency: 1,
    lockDuration: 10000, // 10 seconds
  }
});




// ? 1. Enqueue a job
const addJob = async (data) => {
	for(let i = 0; i < 200; i++){
	  await myQueue.add('myjob', { data: `${data}-${i}` });
	  // console.log every time when a new job is added
	  console.log("job added", i)
	}
}
  

//? 2. process the job
const processJob = async (job, token) => {
  
  try{
    setTimeout(async () => {
      console.log("job done", job.data)
      
      // job.progress(job.data)
      console.log(job.progress);

      if(job.id){
        return job.id.toString() + 'done'
      } else {
        console.log(`${job.id} not found`);
      }

    
    }, 2000)

  }catch(e){
    console.log(err);
    const errorMessage = err?.message || err?.Error || err.toString(); // Capture the error message
    // // job.moveToFailed({ failedReason: errorMessage }); // Move the job to the failed state with the error message
    // // await job.update({ failedReason: errorMessage }); // Update the job's state with the error message
    job.moveToFailed({ failedReason: errorMessage })

  }
}

const worker = new Worker('myQueue', processJob, {
  connection: connectionOptions,
})

worker.on("progress", (job, progress) => {
  // console.log("🚀 ~ file: queue.js:58 ~ myQueue.on ~ job:", job)
  console.log("🚀 ~ file: queue.js:61 ~ progress:", progress)
  console.log("time spent:", job.finishedOn - job.processedOn, "ms")

})


// Define a local completed event
worker.on('completed', async (job, result) => {
	// console.log("🚀 ~ file: queue.js:69 ~ myQueue.on ~ result:", result)
	const {id, data} = job
	console.log("🚀 ~ file: queue.js:45 ~ myQueue.on ~ data:", data)
	console.log("🚀 ~ file: queue.js:45 ~ myQueue.on ~ id:", id)

	// flush the data in redis queue, which is completed.
	await myQueue.clean(0, 'completed');

	//clean all jobs that failed over 60 seconds ago.
	await myQueue.clean(60000, 'failed');
})
		

queueEvents.on('progress', ({jobId, data}, timestamp) => {
  console.log(`${jobId} reported progress: ${data} at ${timestamp}`);
})

module.exports = {addJob, myQueue}