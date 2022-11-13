const { Router } = require('express');

const AdminRoute = require('./admin.route');
const ContractRoute = require('./contract.route');
const JobRoute = require('./job.route');
const ProfileRoute = require('./profile.route');

const router = Router();

router.use(AdminRoute);
router.use(ContractRoute);
router.use(JobRoute);
router.use(ProfileRoute);

module.exports = router;
