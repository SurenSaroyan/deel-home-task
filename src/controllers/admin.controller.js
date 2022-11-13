const AdminService = require('../services/admin.service');

class AdminController {
    static async getBestProfession(req, res, next) {
        try {
            const models = req.app.get('models');
            const { start: startDate, end: endDate } = req.query;

            const bestProfession = await AdminService.getBestProfession({ startDate, endDate }, models);

            return res.json(bestProfession);
        } catch (e) {
            return next(e);
        }
    }

    static async getBestClients(req, res, next) {
        try {
            const models = req.app.get('models');
            const { start: startDate, end: endDate, limit = 2 } = req.query;

            const bestClients = await AdminService.getBestClients({ startDate, endDate, limit }, models);
            return res.json(bestClients);
        } catch (e) {
            return next(e);
        }
    }
}

module.exports = AdminController;
