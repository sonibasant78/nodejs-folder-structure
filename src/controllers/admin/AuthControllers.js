const { Op, Sequelize } = require("sequelize");
const Joi = require("joi");
const jwToken = require("../../services/jwtToken");
const { Admin } = require("../../models");
const bcrypt = require("bcrypt");
const moment = require("moment");
const path = require("path");
const ApiError = require("../../error/ApiError");
const Response = require("../../services/Response");
const Constant = require("../../services/Constant");

module.exports = {
  loginAuth: async (req, res, next) => {
    try {
      //  validations

      console.log("username,password,email", req.body.username, req.body.password);
      const reqObj = {
        username: Joi.string().required().messages({
          "any.required": `please enter Username`,
        }),
        password: Joi.string().required().messages({
          "any.required": `please enter password`,
        }),
      };
      const schema = Joi.object(reqObj);
      const { error } = schema.validate(req.body);
      if (error) {
        throw new Error(`{validation}&&${error.details[0].message}`);
      }

      //   finding admin by username
      let user;
      user = await Admin.findOne({
        where: {
          username: req.body.username,
        },
      });
      if (!user) {
        throw new Error(Constant.ERRORS_LIST.userNotExists);
      }

      // comparing password
      let result = bcrypt.compareSync(req.body.password, user.password);

      if (!result) {
        throw new Error(Constant.ERRORS_LIST.incorrectPassword);
      }

      //   issueing new token
      const token = jwToken.issueAdmin({
        id: user.id,
        username: user.username,
      });

      user.token = token;
      await user.save();
      delete user.dataValues.password;
      return Response.successResponseData(res, user, "Logged in successfully");
    } catch (error) {
      console.log("error::", error);
      // this will handle validation errors, handled errors, unHandled errors
      next(ApiError.catchHandel(error));
    }
  },

  logOut: async (req, res) => {
    res.clearCookie("x-token");
    res.redirect("/admin/login");
  },
};
