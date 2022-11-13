const { Router } = require('express');

const validate = require('../libs/validate');
const schema = require('../validation-schemas/profile.schema');
const ProfileController = require('../controllers/profile.controller');

const router = Router();

router.post('/balances/deposit/:userId', validate(schema.deposit), ProfileController.deposit);

module.exports = router;
