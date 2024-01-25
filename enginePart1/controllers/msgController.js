
const {myQueue} = require("../queue.js")
const user = require("../User.js")


const {createClient } = require("redis")

const client = createClient ({
	host: '127.0.0.1',
	port: 6379
})


var tempQueue = null



const jobOptions = {
    lockDuration: 10000, // 10 seconds
};

const processJob = async (job, done) => {
	try{
	  setTimeout(async () => {
		console.log("processing job: ", job.data)
		
		// job.progress(job.data)
		
		done()
		
	  }, 2000)
	}catch(e){
	  console.log(err);
	  const errorMessage = err?.message || err?.Error || err.toString(); // Capture the error message
	  // job.moveToFailed({ failedReason: errorMessage }); // Move the job to the failed state with the error message
	  // await job.update({ failedReason: errorMessage }); // Update the job's state with the error message
	  job.fail({ failedReason: errorMessage })
  
	}
}

async function addJob(queue, obj){
	// Enqueue a job
	for(let i = 0; i < 10; i++){
		await queue.add(obj, jobOptions);
		console.log("job added", 1)
		await queue.add(obj, jobOptions);
		console.log("job added", 2)
	}
}

exports.sendMsg = async function (req, res, next){
	try{
		const {username, age} = req?.body
		console.log("🚀 ~ file: msgController.js:10 ~ age:", age)
		console.log("🚀 ~ file: msgController.js:10 ~ username:", username)
		
		await user.createQueue(username)
		let queue = user.getQueue(username)

		await addJob(queue, {username, age}).catch(console.error)  


		// need to find a way to get the queue in another environment.
		// await user.userQueues[username].process(10, processJob)

		// await user.userQueues[username].on('completed', async (job, result) => {
		// 	const {id, data} = job
		// 	console.log("🚀 ~ file: queue.js:45 ~ myQueue.on ~ data:", data)
		// 	console.log("🚀 ~ file: queue.js:45 ~ myQueue.on ~ id:", id)
		
		// 	// flush the data in redis queue, which is completed.
		// 	await myQueue.clean(2000, 'completed');
		
		// 	//clean all jobs that failed over 60 seconds ago.
		// 	await myQueue.clean(2000, 'failed');
		//   // myQueue.getWorkers().then(res => {
		//   //   console.log(res);
		//   // })
		// })

		res.status(200).json({status:"success"})
	}catch(e){
		console.error('Job failed:', e);
		// await job.fail(e);
		res.status(400).json({status: "failure"})
	}


}



