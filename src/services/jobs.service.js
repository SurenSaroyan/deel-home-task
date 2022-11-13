const config = require('config');

class JobsService {
    static getUnpaidJobById({ id }, Model, transaction) {
        return Model.findOne({ where: { id, paid: null } }, transaction);
    }

    static getUnpaidJobs({ contractIds }, Model) {
        return Model.findAll({
            where: {
                id: contractIds,
                paid: null,
            },
        });
    }

    static updateStatus({ id, paid }, Model, transaction) {
        return Model.update({ paid, paymentDate: new Date() }, { where: { id } }, { transaction });
    }

    static async getJobsToPay(profile, Models) {
        const { dataValues } = await Models.Job.findJobsToPay({ clientId: profile.id, status: Models.Contract.status.TERMINATED }, Models.Contract);
        const totalPrice = dataValues && dataValues.totalPrice;
        return totalPrice * config.get('deposit.percentage');
    }
}

module.exports = JobsService;
