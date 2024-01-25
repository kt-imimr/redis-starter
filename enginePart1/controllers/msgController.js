
const { addJob} = require("../queue.js")


exports.sendMsg = async function (req, res, next){
	try{
		const {data} = req?.body
		console.log("🚀 ~ file: msgController.js:5 ~ data:", data)
		
		//? 1. redis-addJob
		await addJob(data).catch(console.error)  

		res.status(200).json({status:"success"})
	}catch(e){
		console.error('Job failed:', e);
		// await job.fail(e);
		res.status(400).json({status: "failure"})
	}


}