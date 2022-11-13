const JobService = require('../services/jobs.service');
const ProfileService = require('../services/profile.service');
const NotFoundError = require('../libs/errors/not-found-error');
const UnauthorizedError = require('../libs/errors/unauthorized-error');
const BadRequest = require('../libs/errors/bad-request-error');

class ProfileController {
    static async deposit(req, res, next) {
        const {
            Contract, Job, Profile, Transaction,
        } = req.app.get('models');
        const transaction = await Transaction.openTransaction();
        try {
            const { userId } = req.params;
            const { amount } = req.body;
            const profile = await ProfileService.getProfile(userId, Profile);
            if (!profile) {
                next(new UnauthorizedError('Profile doesn\'t exist'));
            }
            const jobsToPay = await JobService.getJobsToPay(profile, { Job, Contract });
            if (!jobsToPay) {
                return next(new NotFoundError('Doesn\'t found jobs to pay', req.path));
            }

            if (amount > jobsToPay) {
                return next(new BadRequest(`You can't deposit ${amount}, maximum deposit amount is ${jobsToPay}`));
            }
            const clientUpdateData = { id: profile.id, amount, symbol: '+' };

            await ProfileService.updatedBalanceById(clientUpdateData, Profile, transaction);

            await Transaction.commitTransaction(transaction);
            const updatedBalance = { ...profile.dataValues, balance: profile.balance + amount };
            return res.json(updatedBalance);
        } catch (e) {
            await Transaction.rollbackTransaction(transaction);
            return next(e);
        }
    }
}

module.exports = ProfileController;
