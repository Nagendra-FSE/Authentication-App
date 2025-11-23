import { NOT_FOUND, OK } from "../constants/http.js";
import UserModel from "../model/user.model.js";
import appAssert from "../utils/appAssert.js";
import catchErrors from "../utils/catchErrors.js";

export const getUserHandler = catchErrors(async (req, res, next) => {
    const user = await UserModel.findById(req.userId);
    appAssert(user, 'User not found', NOT_FOUND);
    return res.status(OK).json(user.omitPassword());
});