const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Job = require('../models/job.models.js');

//create a job
const jobRegister = async (req, res) => {
    try {
        const { title, desc, requirements, salary, location, numberOfPos, experience, jobType, companyId } = req.body;

if (!companyId) {
  return res.status(400).json({
    success: false,
    msg: "companyId is required"
  });
}

        const userId = req.id;// assuming you're using auth middleware to set req.id

        //validate required fields
        if (
            !title || !desc || !requirements ||
            salary === undefined || salary === null ||
            !location || numberOfPos === undefined || numberOfPos === null ||
            !experience || !jobType
        ) {
            return res.status(400).json({
                success: false,
                msg: "All fields are required."
            });
        }



        //Find if same job exists
        const userJob = await Job.findOne({ title, created_By: userId });
        if (userJob) {
            return res.status(400).json({
                msg: "Job with this title already exists!",
                success: false
            })
        }

        const userjobCreate = await Job.create({
            title, desc, requirements, salary, location, numberOfPos, experience, jobType,
            created_By: req.id,
            // company: companyId,
             company: req.body.companyId 
        });



        return res.status(201).json({
            success: true,
            msg: "Job created successfully",
            job: userjobCreate
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            msg: "Something went wrong!",
            success: false
        })
    }
}

//get all jobs


const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate("company", "CompanyName");

  const transformedJobs = jobs.map((job) => ({
  _id: job._id,
  title: job.title,
  location: job.location,
  desc: job.desc, // ✅ Add this
  numberOfPos: job.numberOfPos, // ✅ Add this
  company: job.company
    ? {
        _id: job.company._id,
        companyName: job.company.CompanyName,
      }
    : null,
  jobType: job.jobType,
  salary: job.salary,
  createdAt: job.createdAt,
}));


    res.status(200).json({
      msg: "Jobs got successfully!",
      success: true,
      jobs: transformedJobs,
    });
  } catch (error) {
    console.error("Fetch jobs error:", error);
    res.status(500).json({ msg: "Failed to fetch jobs", error });
  }
};


//get jobs by id

const getJobsById = async (req, res) => {
    try {
        const jobId = req.params.id;
        
        const job = await Job.findById(jobId).populate("company", "CompanyName");;

        if (!job) {
            return res.status(400).json({
                msg: "Job Not Found!",
                success: false
            })
        }

        res.status(200).json({
            msg: "Jobs fetched successfully!",
            success: true,
            job
        });
    } catch (error) {
        console.error("Register company error:", error.message);
        return res.status(500).json({
            msg: "Something went wrong!",
            success: false
        });
    }
}


//update a job
// const updateJobs = async (req, res) => {
//     try {
//         const { id } = req.params; // make sure your route is /api/v1/jobs/update/:id
//         //Extract from req.body
//         const { title, desc, requirements, salary, location,
//             numberOfPos, experience, jobType
//         } = req.body;

//         const updateFields =
//         {
//             title, desc, requirements, salary, location,
//             numberOfPos, experience, jobType
//         }

//         const job = await Job.findById(id);
//         if (!job) {
//             return res.status(404).json({
//                 msg: "Job Not Found!",
//                 success: false
//             });
//         }

//         // Ensure only the creator can update
//         if (job.created_By.toString() !== req.id) {
//             return res.status(403).json({
//                 msg: "Unauthorized to update this job.",
//                 success: false
//             });
//         }



//         const updatedJob = await Job.findByIdAndUpdate(
//             id,
//             updateFields,
//             // req.body,->Avoid Passing Entire req.body in Update
//             //This is unsafe:
//             { new: true } // returns the updated document
//         );

//         if (!updatedJob) {
//             return res.status(404).json({
//                 msg: "Job Not Found!",
//                 success: false
//             });
//         }

//             res.status(200).json({
//                 msg: "Job updated successfully!",
//                 success: true,
//                 job: updatedJob
//             });
//         } catch (error) {
//             console.error("Update job error:", error.message);
//             res.status(500).json({
//                 msg: "Something went wrong!",
//                 success: false
//             });
//         }
//     };

// controllers/jobController.js
// const updateJobs = async (req, res) => {
//   try {
//     const { id } = req.params;

//     // ✅ Make sure req.id exists
//     if (!req.id) {
//       return res.status(401).json({ msg: "Unauthorized: No user ID" });
//     }

//     const job = await Job.findById(id);

//     if (!job) {
//       return res.status(404).json({ msg: "Job not found" });
//     }

//     // Check if job.user exists before calling toString
// if (!job.user || job.user.toString() !== req.user.id) {
//   return res.status(401).json({ success: false, message: "Not authorized to update this job" });
// }


//     // ✅ Update with provided fields only
//     const updatedFields = {
//       title: req.body.title || job.title,
//       desc: req.body.desc || job.desc,
//       requirements: req.body.requirements || job.requirements,
//       salary: req.body.salary || job.salary,
//       location: req.body.location || job.location,
//       numberOfPos: req.body.numberOfPos || job.numberOfPos,
//       experience: req.body.experience || job.experience,
//       jobType: req.body.jobType || job.jobType,
//     };

//     const updatedJob = await Job.findByIdAndUpdate(id, updatedFields, { new: true });

//     res.status(200).json({
//       msg: "Job updated successfully!",
//       success: true,
//       job: updatedJob,
//     });
//   } catch (error) {
//     console.error("Update error:", error);
//     res.status(500).json({
//       msg: "Failed to update job",
//       success: false,
//       error: error.message,
//     });
//   }
// };


const updateJobs = async (req, res) => {
  try {
    const jobId = req.params.id;
    const updates = req.body;

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ msg: "Job not found" });

    // ✅ Safe access checks
    if (!job.postedBy || !req.user || !req.user._id) {
      return res.status(403).json({ msg: "Authorization data missing" });
    }

    // ✅ Authorization check
    if (job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ msg: "Not authorized to update this job" });
    }

    const updatedJob = await Job.findByIdAndUpdate(jobId, updates, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ msg: "Job updated successfully", job: updatedJob });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ msg: "Server error during update" });
  }
};




// controllers/job.controllers.js
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

if (!job) {
  return res.status(404).json({ success: false, message: "Job not found" });
}

// Check if job.user exists before calling toString
if (!job.user || job.user.toString() !== req.user.id) {
  return res.status(401).json({ success: false, message: "Not authorized to delete this job" });
}

await job.deleteOne();

res.status(200).json({ success: true, message: "Job deleted successfully" });

  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ msg: "Failed to delete job", success: false });
  }
};



    module.exports = {
        jobRegister,
        getAllJobs,
        getJobsById,
        updateJobs,
        deleteJob
    }