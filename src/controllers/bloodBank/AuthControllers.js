const { Op, Sequelize } = require("sequelize");
const Joi = require("joi");
const jwToken = require("../../services/jwtToken");
const { BloodBank } = require("../../models");
const bcrypt = require("bcrypt");
const moment = require("moment");
const path = require("path");
const ApiError = require("../../error/ApiError");
const Response = require("../../services/Response");
const Constant = require("../../services/Constant");

module.exports = {
  loginBloodBank: async (req, res, next) => {
    try {

      //  validations
      console.log("name,password", req.body.name, req.body.password);
      const reqObj = {
        name: Joi.string().required().messages({
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

      //  finding BloodBank by username
      let bloodBank;
      bloodBank = await BloodBank.findOne({
        where: {
          name: req.body.name,
        },
      });
      if (!bloodBank) {
        throw new Error(Constant.ERRORS_LIST.userNotExists);
      }

      // comparing password
      let result = bcrypt.compareSync(req.body.password, bloodBank.password);

      if (!result) {
        throw new Error(Constant.ERRORS_LIST.incorrectPassword);
      }

      //   issueing new token
      const token = jwToken.issueBloodBank({
        id: bloodBank.id,
        name: bloodBank.name,
      });

      bloodBank.token = token;
      await bloodBank.save();
      delete bloodBank.dataValues.password;
      return Response.successResponseData(res, bloodBank, "Logged in successfully");
    } catch (error) {
      console.log("error::", error);
      // this will handle validation errors, handled errors, unHandled errors
      next(ApiError.catchHandel(error));
    }
  },

};
