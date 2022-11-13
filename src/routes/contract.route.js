const { Router } = require('express');
const ContractController = require('../controllers/contract.controller');
const { getProfile } = require('../middleware/profile.middleware');
const validate = require('../libs/validate');
const schema = require('../validation-schemas/contract.schema');

const router = Router();

router.get('/contracts/:id', validate(schema.getContract), getProfile, ContractController.getContract);
router.get('/contracts', getProfile, ContractController.getContracts);

module.exports = router;
