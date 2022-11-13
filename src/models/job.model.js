const Sequelize = require('sequelize');
const { sequelize } = require('../conections/db.connection');

class Job extends Sequelize.Model {
    static findJobsToPay({ clientId, status }, Contract) {
        return this.findOne({
            attributes: {
                include: [[sequelize.fn('SUM', sequelize.col('price')), 'totalPrice']],
            },
            include: [
                {
                    attributes: [],
                    model: Contract,
                    required: true,
                    where: {
                        ClientId: clientId,
                        status: {
                            [Sequelize.Op.not]: status,
                        },
                    },
                },
            ],
            where: {
                paid: null,
            },
        });
    }
}

Job.init(
    {
        description: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        price: {
            type: Sequelize.DECIMAL(12, 2),
            allowNull: false,
        },
        paid: {
            type: Sequelize.BOOLEAN,
            default: false,
        },
        paymentDate: {
            type: Sequelize.DATE,
        },
    },
    {
        sequelize,
        modelName: 'Job',
    },
);
module.exports = Job;
