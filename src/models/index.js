const { sequelize } = require('../conections/db.connection');
const Contract = require('./contract.model');
const Profile = require('./profile.model');
const Job = require('./job.model');
const Transaction = require('./transaction.model');

Profile.hasMany(Contract, { as: 'Contractor', foreignKey: 'ContractorId' });
Contract.belongsTo(Profile, { as: 'Contractor' });
Profile.hasMany(Contract, { as: 'Client', foreignKey: 'ClientId' });
Contract.belongsTo(Profile, { as: 'Client' });
Contract.hasMany(Job);
Job.belongsTo(Contract);

module.exports = {
    sequelize,
    Profile,
    Contract,
    Job,
    Transaction,
};
