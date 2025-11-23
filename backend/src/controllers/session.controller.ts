import z from "zod";
import SessionModel from "../model/session.model.js";
import catchErrors from "../utils/catchErrors.js";
import appAssert from "../utils/appAssert.js";
import { NOT_FOUND, OK } from "../constants/http.js";

export const getSessionHandler = catchErrors(async (req, res, next) => {
    const sessions = await SessionModel.find(
        { 
            userId: req.userId,
            expiredAt: { $gt: new Date() }
         },
         {
            _id: 1,
            userAgent: 1,
            createdAt: 1,
         },
         {
            sort: { createdAt: -1 }
         }
    );

    return res.status(200).json(
        sessions.map(session => ({
            ...session.toObject(),
            ...(session.id === req.sessionId && { current: true })
            }))
    );

})

export const deleteSessionHandler = catchErrors(async (req, res, next) => {
        const sessionId = z.string().parse(req.params.id);
        const deleted = await SessionModel.deleteOne({ _id: sessionId, userId: req.userId });
        appAssert(deleted, 'Session not found', NOT_FOUND);
        return res.status(OK).json({ message: "session deleted" });
});