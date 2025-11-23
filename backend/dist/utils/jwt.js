import jwt from "jsonwebtoken";
import { jwtSecret } from "../constants/env.js";
const defaultSignOptions = {
    audience: ['user'],
};
const accessTokenSignOptions = {
    expiresIn: '15m',
    secret: jwtSecret
};
export const refreshTokenSignOptions = {
    expiresIn: '1d',
    secret: jwtSecret,
    ...defaultSignOptions
};
export const signToken = (payload, optionsAndSecret) => {
    const { secret, ...signOptions } = optionsAndSecret || accessTokenSignOptions;
    return jwt.sign(payload, secret, { ...signOptions, ...defaultSignOptions });
};
export const verifyToken = (token, optionsAndSecret) => {
    const { secret = jwtSecret, ...verifyOptions } = optionsAndSecret || {};
    try {
        const payload = jwt.verify(token, secret, verifyOptions);
        return payload;
    }
    catch (error) {
        return error.message;
    }
};
//# sourceMappingURL=jwt.js.map