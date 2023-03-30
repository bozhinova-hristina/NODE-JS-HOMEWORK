import { verifyAccssToken } from "../const/jwt.const.js";
import { AuthModel } from "../models/auth.model.js";

export const tokenValidator = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) throw new Error();

    const token = authorizationHeader.split(" ")[1];

    const { userId } = verifyAccssToken(token);
    console.log(userId);

    await AuthModel.getUserById(userId);

    return next();
  } catch (error) {
    console.log(error);
    res.sendStatus(403);
  }
};

export const roleValidator = async (req, res, next) => {
  const role = req.role;
  if (role === "admin") {
    return next();
  } else {
    return res.sendStatus(403);
  }
};
