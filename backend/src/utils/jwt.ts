import type { SignOptions, VerifyOptions } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import type { SessionDoc } from "../model/session.model.js";
import type { UserDocument } from "../model/user.model.js";
import { jwtSecret } from "../constants/env.js";


export type refreshTokenPayload = {
    sessionId: SessionDoc['_id'];
}

export type accessTokenPayload = {
    userId: UserDocument['_id'];
    sessionId: SessionDoc['_id'];
}

type SignOptionsandSecret = SignOptions & {
    secret: string;
}

const defaultSignOptions: SignOptions = {
    audience: ['user'],
};

const accessTokenSignOptions: SignOptionsandSecret = {
    expiresIn: '15m',
    secret: jwtSecret
}

export const refreshTokenSignOptions: SignOptionsandSecret = {
    expiresIn: '1d',
    secret: jwtSecret,
    ...defaultSignOptions
}

export const signToken = (
    payload: refreshTokenPayload | accessTokenPayload, 
    optionsAndSecret?: SignOptionsandSecret
): string => {
    const { secret, ...signOptions } = optionsAndSecret || accessTokenSignOptions;
    return jwt.sign(payload, secret, {...signOptions, ...defaultSignOptions});
}

export const verifyToken = <T extends object>(
    token: string, 
    optionsAndSecret?: VerifyOptions & { secret: string }
): T => {
    const { secret = jwtSecret, ...verifyOptions } = optionsAndSecret || {};
    try {
        const payload = jwt.verify(token, secret, verifyOptions) as T;
        return payload
    } catch (error: any) {
        return error.message
    }
}
