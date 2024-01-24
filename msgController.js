
const {myQueue, addJob, processJob} = require("./queue.js")

//? 2. process the job
myQueue.process(processJob)

// Define a local completed event
myQueue.on('completed', async (job, result) => {
	const {id, data} = job
	console.log("🚀 ~ file: queue.js:45 ~ myQueue.on ~ data:", data)
	console.log("🚀 ~ file: queue.js:45 ~ myQueue.on ~ id:", id)

	// flush the data in redis queue, which is completed.
	await myQueue.clean(0, 'completed');

	//clean all jobs that failed over 60 seconds ago.
	await myQueue.clean(60000, 'failed');
})
		
exports.sendMsg = async function (req, res, next){
	try{
		const {data} = req?.body
		console.log("🚀 ~ file: msgController.js:5 ~ data:", data)
		

		//? 1. let's do the assignment, 
		await addJob(data).catch(console.error)  


		

		res.status(200).json({status:"success"})
	}catch(e){
		console.error('Job failed:', e);
		// await job.fail(e);
		res.status(400).json({status: "failure"})
	}


}