class ProfileService {
    static async getProfile(id, Model) {
        return Model.findOne({ where: { id } });
    }

    static async updatedBalanceById({ id, amount, symbol }, Model, transaction) {
        return Model.updateBalanceById({ id, amount, symbol }, transaction);
    }
}

module.exports = ProfileService;
