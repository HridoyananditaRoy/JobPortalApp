// routes/job.routes.js
const express = require('express');
const { jobRegister, getAllJobs, getJobsById, updateJobs , deleteJob} = require('../controllers/job.controllers.js');
const authenticatedUser = require('../middlewares/auth.middleware.js');

const router = express.Router();

router.post('/create',authenticatedUser, jobRegister); // POST /api/v1/jobs/register
router.get('/get', getAllJobs);
router.get('/get/:id',authenticatedUser, getJobsById);
router.put('/update/:id',authenticatedUser, updateJobs);
router.delete('/delete/:id', authenticatedUser, deleteJob);

module.exports = router;
