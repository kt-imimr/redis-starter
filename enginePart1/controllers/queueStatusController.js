const {myQueue} = require("../queue.js")
exports.queueStatus = async function (req, res, next) {
    
    const queueStatus = await myQueue.getJobCounts();
    const waitingJobs = await myQueue.getWaiting(); // Get the waiting jobs
    const activeJobs = await myQueue.getActive(); // Get the active jobs
    const completedJobs = await myQueue.getCompleted(); // Get the completed jobs
    const failedJobs = await myQueue.getFailed(); // Get the failed jobs
    const delayedJobs = await myQueue.getDelayed(); // Get the delayed jobs
  
    const jobs = await myQueue.getJobs(); // Get all jobs in the queue
    const pausedJobs = jobs.filter(job => job?.state === 'paused'); // Filter jobs by state
  
    const queueInfo = {
      ...queueStatus,
      // waiting: waitingJobs,
      // active: activeJobs,
      // completed: completedJobs,
      // failed: failedJobs,
      // delayed: delayedJobs,
      // paused: pausedJobs,
      waitingJobs,
      activeJobs,
      completedJobs,
      failedJobs,
      delayedJobs,
      pausedJobs
    };
    
    res.json(queueInfo);
}