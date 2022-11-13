const ProfileService = require('../services/profile.service');
const UnauthorizedError = require('../libs/errors/unauthorized-error');
const BadRequest = require('../libs/errors/bad-request-error');

const getProfile = async (req, res, next) => {
    try {
        const { Profile } = req.app.get('models');
        const id = req.get('profile_id');
        if (!id) {
            next(new UnauthorizedError('profile_id is required in headers'));
        }
        const profile = await ProfileService.getProfile(id, Profile);
        if (!profile) {
            next(new UnauthorizedError('Profile doesn\'t exist'));
        }
        req.profile = profile;
        return next();
    } catch (e) {
        return next(new BadRequest(e.message, req.path));
    }
};
module.exports = { getProfile };
