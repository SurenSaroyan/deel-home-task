const Sequelize = require('sequelize');
const { sequelize } = require('../conections/db.connection');

class Transaction extends Sequelize.Model {
    static openTransaction() {
        return sequelize.transaction();
    }

    static commitTransaction(transaction) {
        return transaction.commit();
    }

    static rollbackTransaction(transaction) {
        return transaction.rollback();
    }
}
Transaction.init({}, {
    sequelize,
    modelName: 'Transaction',
});
module.exports = Transaction;
