const JobsService = require('../services/jobs.service');
const ContractService = require('../services/contract.service');
const BadRequest = require('../libs/errors/bad-request-error');
const ProfileService = require('../services/profile.service');

class JobsController {
    static async getUnpaidJobs(req, res, next) {
        try {
            const { Contract, Job } = req.app.get('models');
            const profileId = req.profile.id;
            const contracts = await ContractService.getContracts({ clientId: profileId, contractorId: profileId }, Contract);
            const contractIds = [...new Set(contracts.map(({ id }) => id))];
            const unpaidJobs = await JobsService.getUnpaidJobs({ contractIds }, Job);
            return res.json(unpaidJobs);
        } catch (e) {
            return next(e);
        }
    }

    static async paidForJob(req, res, next) {
        const {
            Contract, Job, Profile, Transaction,
        } = req.app.get('models');
        const transaction = await Transaction.openTransaction();

        try {
            const { profile } = req;
            const { job_id: jobId } = req.params;
            const unpaidJob = await JobsService.getUnpaidJobById({ id: jobId }, Job);
            if (!unpaidJob) {
                return next(new BadRequest(`Not found job with id:${jobId}`, req.path));
            }
            const contract = await ContractService.getContract({ id: unpaidJob.ContractId, clientId: profile.id }, Contract);
            if (!contract) {
                return next(new BadRequest('You can\'t paid for this job', req.path));
            }
            if (profile.balance < unpaidJob.price) {
                return next(new BadRequest('You don\'t have enough balance', req.path));
            }
            const clientUpdateData = { id: profile.id, amount: unpaidJob.price, symbol: '-' };
            const contractorUpdateData = { id: contract.ContractorId, amount: unpaidJob.price, symbol: '+' };

            const updateClientBalance = ProfileService.updatedBalanceById(clientUpdateData, Profile, transaction);
            const updateContractorBalance = ProfileService.updatedBalanceById(contractorUpdateData, Profile, transaction);
            const updateJobStatus = JobsService.updateStatus({ id: unpaidJob.id, paid: 1 }, Job, transaction);
            await Promise.all([updateClientBalance, updateContractorBalance, updateJobStatus]);
            await Transaction.commitTransaction(transaction);

            return res.json({ success: true });
        } catch (e) {
            await Transaction.rollbackTransaction(transaction);
            return next(e);
        }
    }
}

module.exports = JobsController;
