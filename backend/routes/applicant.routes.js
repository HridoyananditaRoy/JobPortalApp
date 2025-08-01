const express = require('express');
const authenticatedUser = require("../middlewares/auth.middleware.js");
const { applyJob, getApplicants, getAppliedJobs, updateStatus } 
= require("../controllers/applicant.controllers.js");
 
const router = express.Router();

router.route("/apply/:id").get(authenticatedUser, applyJob);
router.route("/get").get(authenticatedUser, getAppliedJobs);
router.route("/:id/applicants").get(authenticatedUser, getApplicants);
router.route("/status/:id/update").post(authenticatedUser, updateStatus);
 

module.exports = router;
