const config = require('config');
const Sequelize = require('sequelize');
const { sequelize } = require('../conections/db.connection');

class Contract extends Sequelize.Model {
    static findAllNotTerminated({ clientId, contractorId, status }) {
        const orCondition = [{ clientId }];
        if (contractorId) {
            orCondition.push({ contractorId });
        }
        return this.findAll({
            where: {
                [Sequelize.Op.or]: orCondition,
                status: {
                    [Sequelize.Op.not]: status,
                },
            },
        });
    }
}
Contract.status = config.get('models.Contract.status');

Contract.init(
    {
        terms: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        status: {
            type: Sequelize.ENUM('new', 'in_progress', 'terminated'),
        },
    },
    {
        sequelize,
        modelName: 'Contract',
    },
);

module.exports = Contract;
