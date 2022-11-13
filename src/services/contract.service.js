class ContractService {
    static getContract({ id, clientId }, Model) {
        return Model.findOne({ where: { id, clientId } });
    }

    static getContracts({ clientId, contractorId }, Model) {
        return Model.findAllNotTerminated({ clientId, contractorId, status: Model.status.TERMINATED });
    }
}

module.exports = ContractService;
