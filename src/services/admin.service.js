class AdminService {
    static getBestProfession({ startDate, endDate }, Models) {
        return Models.Profile.findBestProfession({ startDate, endDate }, Models);
    }

    static getBestClients({ startDate, endDate, limit }, Models) {
        return Models.Profile.getBestClients({ startDate, endDate, limit }, Models);
    }
}

module.exports = AdminService;
