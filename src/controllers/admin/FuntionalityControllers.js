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


module.exports ={
    createBloodBank: async (req, res, next) => {
        try {
          //  validations
    
          console.log("name,password", req.body.name, req.body.email);
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
    
          //   finding bloodBank already exists by this username
          let bloodBank;
          bloodBank = await BloodBank.findOne({
            where: {
              name: req.body.name,
            },
          });
          if (bloodBank) {
            throw new Error(Constant.ERRORS_LIST.bloodBankExists);
          }

        // creeating data for new blood bank  
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        bloodBank = {
        name: req.body.name,
        password: hashedPassword,
        };

        const createdBloodBank = await BloodBank.create(bloodBank);
        const token = jwToken.issueUser({
        id: createdBloodBank.id,
        username: createdBloodBank.name,
        });
        createdBloodBank.token = token;
        await createdBloodBank.save() 

        return Response.successResponseData(res, createdBloodBank, "Blood Bank Created SuccessFully");
        } catch (error) {
          console.log("error::", error);
          // this will handle validation errors, handled errors, unHandled errors
          next(ApiError.catchHandel(error));
        }
      },
}
