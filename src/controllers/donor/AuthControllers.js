const { Op, Sequelize } = require("sequelize");
const Joi = require("joi");
const jwToken = require("../../services/jwtToken");
const { Donor } = require("../../models");
const bcrypt = require("bcrypt");
const moment = require("moment");
const path = require("path");
const Response = require("../../services/Response");
const CONSTANTS = require("../../services/Constant");
const ApiError = require("../../error/ApiError");
const Constant = require("../../services/Constant");

module.exports = {
  signUp: async (req, res, next) => {
    try {
      // validations
      const reqObj = {
        phone: Joi.string().pattern(/^[0-9]{10}$/).trim().required().messages({
          "any.required": "please enter mobile number",
          'string.pattern.base': 'please enter a valid mobile number',
        }),
        name: Joi.string().trim().max(50).required().messages({
          "any.required": "please enter name",
        }),
        blood_type: Joi.string().valid('A_positive', 'A_negative', 'B_positive', 'B_negative', 'AB_positive', 'AB_negative', 'O_positive', 'O_negative').messages({
          "any.required": "please enter blood type",
          'any.only': 'please enter a valid blood type',
        }),
        
        aadhar: Joi.string().pattern(/^[0-9]{12}$/).required().messages({
          "any.required": "please enter aadhar number",
          'string.pattern.base': 'please insert a valid aadhar number',
        }),
        password: Joi.string().required().messages({
          "any.required": "please enter password",
        }),
        confirm_password: Joi.any()
          .valid(Joi.ref("password"))
          .required()
          .label("Password")
          .messages({
            "any.only": "Password and Confirm Password are not same",
            "any.required": "please enter Confirm Password",
          }),
      };

      const schema = Joi.object(reqObj);
      const { error } = schema.validate(req.body);
      if (error) {
        throw new Error(`{validation}&&${error.details[0].message}`);
      }

      
      let donor;
          donor = await Donor.findOne({
            where: {
              [Op.or]:{
                phone: req.body.phone,
                aadhar: req.body.aadhar
              }
            },
          });
          if (donor) {
            throw new Error(Constant.ERRORS_LIST.donorExists);
          }

      const passwordHash = bcrypt.hashSync(req.body.password, 10);
      let donorObj = {
        password: passwordHash,
        phone: req.body.phone,
        name: req.body.name,
        blood_type: req.body.blood_type,
        aadhar: req.body.aadhar,
      };

      let donorCreated = await Donor.create(donorObj)
      const token = jwToken.issueDonor({
        id: donorCreated.id,
        aadhar: donorCreated.aadhar,
      });

      donorCreated.token = token;
      donorCreated.save();
      delete donorCreated.dataValues.password;

      return Response.successResponseData(
        res,
        donorCreated,
        "Account auccessfully created"
      );
    } catch (error) {
      console.log("error::", error);
      // this will handle validation errors, handled errors, unHandled errors
      next(ApiError.catchHandel(error));
    }
  },
  loginDonor: async (req, res, next) => {
    try {
      //  validations
      console.log("phone_aadhar,password", req.body.phone_aadhar, req.body.password);
      const reqObj = {
        phone_aadhar: Joi.string().required().messages({
          "any.required": `please enter Mobile number or Aadhar number`,
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
      let donor;
      donor = await Donor.findOne({
        where: {
          [Op.or]:{
            aadhar: req.body.phone_aadhar,
            phone:req.body.phone_aadhar,
          }
        },
      });
      if (!donor) {
        throw new Error(Constant.ERRORS_LIST.donorNotExists);
      }

      // comparing password
      let result = bcrypt.compareSync(req.body.password, donor.password);

      if (!result) {
        throw new Error(Constant.ERRORS_LIST.incorrectPassword);
      }

      //   issueing new token
      const token = jwToken.issueDonor({
        id: donor.id,
        aadhar: donor.aadhar,
      });

      donor.token = token;
      await donor.save();
      delete donor.dataValues.password;
      return Response.successResponseData(res, donor, "Logged in successfully");
    } catch (error) {
      console.log("error::", error);
      // this will handle validation errors, handled errors, unHandled errors
      next(ApiError.catchHandel(error));
    }
  },
};
