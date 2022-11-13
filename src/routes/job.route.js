const { Router } = require('express');
const { getProfile } = require('../middleware/profile.middleware');
const validate = require('../libs/validate');
const schema = require('../validation-schemas/job.schema');
const JobsController = require('../controllers/jobs.controller');

const router = Router();

router.get('/jobs/unpaid', getProfile, JobsController.getUnpaidJobs);

router.post('/jobs/:job_id/pay', validate(schema.paidForJob), getProfile, JobsController.paidForJob);

module.exports = router;
