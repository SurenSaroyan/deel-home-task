const ContractService = require('../services/contract.service');
const NotFoundError = require('../libs/errors/not-found-error');

class ContractController {
    static async getContract(req, res, next) {
        try {
            const { Contract } = req.app.get('models');
            const { id } = req.params;
            const clientId = req.profile.id;
            const contract = await ContractService.getContract({ id, clientId }, Contract);
            if (!contract) {
                return next(new NotFoundError('Contract doesn\'t exist', req.path));
            }
            return res.json(contract);
        } catch (e) {
            return next(e);
        }
    }

    static async getContracts(req, res, next) {
        try {
            const { Contract } = req.app.get('models');
            const clientId = req.profile.id;
            const contracts = await ContractService.getContracts({ clientId }, Contract);

            return res.json(contracts);
        } catch (e) {
            return next(e);
        }
    }
}

module.exports = ContractController;
