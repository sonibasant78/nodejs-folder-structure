const { Op, Sequelize } = require("sequelize");
const Joi = require("joi");
const jwToken = require("../../services/jwtToken");
const { Certificate, sequelize, BloodStock } = require("../../models");
const bcrypt = require("bcrypt");
const moment = require("moment");
const path = require("path");
const ApiError = require("../../error/ApiError");
const Response = require("../../services/Response");
const Constant = require("../../services/Constant");
const fs = require("fs");
const PDFDocument = require("pdfkit");
const pdf = require("html-pdf");
const ejs = require("ejs");

module.exports = {
  issueCertificate: async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
      //  validations

      const reqObj = {
        aadhar: Joi.string()
          .pattern(/^[0-9]{12}$/)
          .required()
          .messages({
            "any.required": "please enter aadhar number",
            "string.pattern.base": "please insert a valid aadhar number",
          }),
        name: Joi.string().required().messages({
          "any.required": "please enter name of donor",
        }),
        volume: Joi.string().required().messages({
          "any.required": `please enter vloume of blood`,
        }),
        blood_type: Joi.string()
          .valid(
            "A_positive",
            "A_negative",
            "B_positive",
            "B_negative",
            "AB_positive",
            "AB_negative",
            "O_positive",
            "O_negative"
          )
          .messages({
            "any.required": "please enter mobile number",
            "any.only": "please enter a valid blood type",
          }),
        date_time: Joi.string().required().messages({
          "any.required": `please enter Date Time of donation`,
        }),
        place: Joi.string().required().messages({
          "any.required": `please enter place of donation`,
        }),
      };
      const schema = Joi.object(reqObj);
      const { error } = schema.validate(req.body);
      if (error) {
        throw new Error(`{validation}&&${error.details[0].message}`);
      }

      let certificateObj = {
        aadhar: req.body.aadhar,
        name: req.body.name,
        blood_bank_id: req.authUserId,
        volume: req.body.volume,
        blood_type: req.body.blood_type,
        date_time: req.body.date_time,
        place: req.body.place,
      };

      const createdCertificate = await Certificate.create(certificateObj, {
        t,
      });
      let bloodStockEntry = await BloodStock.findOne({
        where: { blood_bank_id: req.authUserId },
      });
      if (bloodStockEntry) {
        let updateObj = {};
        updateObj[req.body.blood_type] =
          Number(bloodStockEntry[req.body.blood_type]) +
          Number(req.body.volume);
        await bloodStockEntry.update(updateObj, { t });
      } else {
        await BloodStock.create({ blood_bank_id: req.authUserId }, { t });
      }

      let error_temp;
      // creating file location
      let now = moment();
      const unixTime = now.unix();
      const fileName = `${unixTime}.pdf`;
      const filePath = "src/public/certificates/" + fileName;

      // Render the EJS template with the variable name
      ejs.renderFile(
        "src/views/certificate.ejs",
        {
          donor_name: req.body.name,
          volume: req.body.volume,
          blood_bank_name: req.authUserName,
          place: req.body.place,
          date_time: req.body.date_time,
        },
        (err, html) => {
          if (err) {
            console.log("error::", err);
            error_temp = err;
            return;
          }

          // Convert the HTML to a PDF and write it to the PDF document
          pdf.create(html).toFile(filePath, function (err, data) {
            if (err) {
              console.log("error::", err);
              error_temp = err;
              return;
            }
          });
        }
      );
      if (error_temp) {
        console.log("error::", error_temp);
        throw new Error(Constant.ERRORS_LIST.userNotExists);
      }
      await Certificate.update(
        { pdf: fileName },
        { where: { id: createdCertificate.id }, transaction: t }
      );
      await t.commit();
      return Response.successResponseData(
        res,
        createdCertificate,
        "Certificate Created SuccessFully"
      );
    } catch (error) {
      await t.rollback();
      console.log("error::", error);
      // this will handle validation errors, handled errors, unHandled errors
      next(ApiError.catchHandel(error));
    }
  },
};
