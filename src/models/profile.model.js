const Sequelize = require('sequelize');
const { sequelize } = require('../conections/db.connection');

class Profile extends Sequelize.Model {
    static updateBalanceById({ id, amount, symbol }, transaction) {
        return this.update({
            balance: Sequelize.literal(`balance ${symbol} ${amount}`),
        }, { where: { id } }, transaction);
    }

    static findBestProfession({ startDate, endDate }, Models) {
        return this.findOne({
            attributes: ['profession', [sequelize.fn('SUM', sequelize.col('price')), 'earned']],
            include: [
                {
                    model: Models.Contract,
                    as: 'Contractor',
                    attributes: [],
                    required: true,
                    include: [
                        {
                            model: Models.Job,
                            required: true,
                            attributes: [],
                            where: {
                                paid: true,
                                paymentDate: {
                                    [Sequelize.Op.gte]: startDate,
                                    [Sequelize.Op.lte]: endDate,
                                },
                            },
                        },
                    ],
                },
            ],
            where: {
                type: 'contractor',
            },
            group: ['profession'],
            order: [[sequelize.col('earned'), 'DESC']],
            subQuery: false,
        });
    }

    static getBestClients({ startDate, endDate, limit }, Models) {
        return this.findAll({
            attributes: [
                'id',
                [sequelize.literal("firstName || ' ' || lastName"), 'fullName'],
                [sequelize.fn('SUM', sequelize.col('price')), 'paid']],
            include: [
                {
                    model: Models.Contract,
                    as: 'Client',
                    attributes: [],
                    required: true,
                    include: [
                        {
                            model: Models.Job,
                            required: true,
                            attributes: [],
                            where: {
                                paid: true,
                                paymentDate: {
                                    [Sequelize.Op.gte]: startDate,
                                    [Sequelize.Op.lte]: endDate,
                                },
                            },
                        },
                    ],
                },
            ],
            where: {
                type: 'client',
            },
            group: ['Profile.id'],
            order: [[sequelize.col('paid'), 'DESC']],
            limit,
            subQuery: false,
        });
    }
}
Profile.init(
    {
        firstName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        profession: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        balance: {
            type: Sequelize.DECIMAL(12, 2),
        },
        type: {
            type: Sequelize.ENUM('client', 'contractor'),
        },
    },
    {
        sequelize,
        modelName: 'Profile',
    },
);

module.exports = Profile;
