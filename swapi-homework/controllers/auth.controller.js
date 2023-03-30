import {
  createAccessToken,
  createRefreshToken,
  verifyRefreshToken,
} from "../const/jwt.const.js";

import { AuthModel } from "../models/auth.model.js";

export class AuthController {
  // 1. Register user
  static async registerUser(req, res) {
    try {
      const newUser = await AuthModel.registerUser(req.body);
      return res.status(201).json(newUser);
    } catch (error) {
      console.log(error);
      return res.status(400).send({ msg: error.message });
    }
  }

  //   2. Login user
  static async loginUser(req, res) {
    try {
      const user = await AuthModel.loginUser(req.body);

      const accessToken = createAccessToken(user.id);

      console.log(accessToken);

      res.set("access-token", accessToken);

      const refreshToken = createRefreshToken(user.id);
      await AuthModel.saveRefreshToken(user.id, refreshToken);

      res.set("refresh-token", refreshToken);

      return res.status(200).json(user);
    } catch (error) {
      console.log(error);
      return res.status(401).send({ msg: error.message });
    }
  }

  // 3.Refresh token endpoint
  static async refreshAccesToken(req, res) {
    try {
      const refreshToken = req.headers["refresh-token"];

      if (!refreshToken) throw new Error();

      const { userId } = verifyRefreshToken(refreshToken);

      const foundUser = await AuthModel.getUserById(userId);

      if (refreshToken !== foundUser.refreshToken) throw new Error();

      // Creating new access token
      const accessToken = createAccessToken(foundUser.id);

      res.set("access-token", accessToken);

      return res.sendStatus(204);
    } catch (error) {
      console.log(error);
      return res.sendStatus(403);
    }
  }
  // 4.Logout user
  static async logoutUser(req, res) {
    try {
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  }
}
