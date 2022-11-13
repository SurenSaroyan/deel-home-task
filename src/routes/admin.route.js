const { Router } = require('express');

const validate = require('../libs/validate');
const schema = require('../validation-schemas/admin.schema');
const AdminController = require('../controllers/admin.controller');

const router = Router();

router.get('/admin/best-profession', validate(schema.getBestProffesion), AdminController.getBestProfession);

router.get('/admin/best-clients', validate(schema.getBestClients), AdminController.getBestClients);

module.exports = router;
