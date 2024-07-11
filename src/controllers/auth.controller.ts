import { Request, Response } from "express";
import validate from "../validate/validate";
import { loginValidate } from "../validate/login.validate";
import userModel from "../models/user.model";
import { hashPassword, isPasswordMatch } from "../utils/passwordHelper";
import { signToken } from "../utils/jwt";
import AppConfig from "../config/AppConfig";
import { registerValidate } from "../validate/register.validate";
import { User } from "../interfaces/user.interface";
import { RoleEnum } from "../utils/enums";

export default class AuthController {
  static logout(req: Request, res: Response) {
    res.clearCookie("accessToken");
    res.redirect("/login");
  }

  static async loginPage(req: Request, res: Response) {
    if (res.locals.user) return res.redirect("/");
    return res.render("./login");
  }

  static async login(req: Request, res: Response) {
    const errorMap = await validate(loginValidate)(req);

    if (errorMap) {
      return res.render("./login", {
        validationError: errorMap,
        ...req.body,
      });
    }

    const { username, password } = req.body;
    const user = await userModel.findOne({ username });
    if (!user) {
      return res.render("./login", {
        errorMessage: "Username does not exist or password is incorrect",
        ...req.body,
      });
    }
    const isMatch = await isPasswordMatch(password, user.password);

    if (!isMatch) {
      return res.render("./login", {
        errorMessage: "Username does not exist or password is incorrect",
        ...req.body,
      });
    }
    const token = signToken({ userId: user._id });
    res.cookie("accessToken", token, { maxAge: AppConfig.JWT_EXPIRE });
    return res.redirect("/");
  }

  static registerPage(req: Request, res: Response) {
    if (res.locals.user) return res.redirect("/");
    return res.render("./register");
  }

  static async register(req: Request, res: Response) {
    const errorMap = await validate(registerValidate)(req);

    if (errorMap) {
      return res.render("./register", {
        validationError: errorMap,
        ...req.body,
      });
    }
    const { username, password } = req.body;
    const registerDTO: User = {
      username,
      password,
    };
    const existUser = await userModel.findOne({
      username,
    });
    if (existUser)
      return res.render("./register", {
        errorMessage: "Username already exist",
        ...req.body,
      });

    registerDTO.password = await hashPassword(registerDTO.password);
    await userModel.create(registerDTO);
    res.redirect("/login");
  }
  //API part
  static async loginApi(req: Request, res: Response) {
    try {
      const errorMap = await validate(loginValidate)(req);

      if (errorMap) {
        return res.status(400).json({
          error: errorMap,
        });
      }

      const { username, password } = req.body;
      const user = await userModel.findOne({ username });
      if (!user) {
        return res.status(400).json({
          errorMessage: "Username does not exist or password is incorrect",
        });
      }
      const isMatch = await isPasswordMatch(password, user.password);

      if (!isMatch) {
        return res.status(400).json({
          error: "Username does not exist or password is incorrect",
        });
      }
      const token = signToken({ userId: user._id });
      return res.json({
        message: "Login successfullly",
        data: {
          accessToken: token,
        },
      });
    } catch (err) {
      return res.status(500).json({
        errorMessage: err.message,
      });
    }
  }
  static async logoutApi(req: Request, res: Response) {
    res.clearCookie("accessToken");
    return res.json({
      message: "Logout successfully",
    });
  }
  static async registerApi(req: Request, res: Response) {
    try {
      const errorMap = await validate(registerValidate)(req);

      if (errorMap) {
        return res.status(400).json({
          error: errorMap,
        });
      }
      const { username, password } = req.body;
      const registerDTO: User = {
        username,
        password,
      };
      const existUser = await userModel.findOne({
        username,
      });
      if (existUser)
        return res.status(400).json({
          errorMessage: "Username already exist",
        });

      registerDTO.password = await hashPassword(registerDTO.password);
      await userModel.create(registerDTO);
      return res.json({
        message: "Register successfully",
      });
    } catch (err) {
      return res.status(500).json({
        errorMessage: err.message,
      });
    }
  }
}
