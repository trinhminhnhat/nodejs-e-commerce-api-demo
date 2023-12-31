'use strict';

const { BadRequestError } = require('../core/error.response');
const { findById } = require('../services/apiKey.service');

const HEADER = {
    API_KEY: 'x-api-key',
    AUTHORIZATION: 'authorization',
};

const apiKey = async (req, res, next) => {
    try {
        const key = req.headers[HEADER.API_KEY]?.toString();

        if (!key) {
            throw new BadRequestError('Api key is required');
        }

        // check objKey
        const objKey = await findById(key);

        if (!objKey) {
            throw new BadRequestError('Api key not found');
        }

        req.objKey = objKey;

        return next();
    } catch (error) {
        next(error);
    }
};

const permission = (permission) => {
    return (req, res, next) => {
        if (!req.objKey.permissions) {
            return res.status(403).json({
                message: 'Permission Denied',
            });
        }
        console.log('permissions: ', req.objKey.permissions);

        const validPermission = req.objKey.permissions.includes(permission);

        if (!validPermission) {
            return res.status(403).json({
                message: 'Permission Denied',
            });
        }

        return next();
    };
};

module.exports = {
    apiKey,
    permission,
};
