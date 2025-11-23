import moongose from 'mongoose';

declare global {
    namespace Express {
        interface Request {
            userId?: UserDocument['_id'];
            sessionId?: SessionDoc['_id'];
        }
    }
}

export {};