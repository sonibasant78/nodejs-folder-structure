const jwToken = require("../services/jwtToken");
const Response = require("../services/Response");
const {Admin,BloodBank} = require("../models");
const {INACTIVE, ACTIVE , UN_VERIFY , UNAUTHORIZED} = require("../services/Constant");
const ApiError = require("../error/ApiError");
const Constant = require("../services/Constant");

module.exports = {

    validateAdmin: async(req, res, next) => {
        try{
            const token = req.headers.authorization;
            if (!token) {
                return Response.errorResponseWithoutData(res, 'authorizationError', UNAUTHORIZED)
            } 
                const tokenData = await jwToken.decode(token)
                if (tokenData) {
                    jwToken.verify(tokenData, (err, decoded) => {
                        if (err) {
                          return  Response.errorResponseWithoutData(res, 'invalidToken', UNAUTHORIZED)
                        }
                        if (decoded.id) {
                            req.authUserId = decoded.id
                            Admin.findOne({
                                where: {
                                    id: req.authUserId,
                                    username:decoded.username
                                },
                            }).then((result) => {
                                if (result) {
                                    return next()
                                } else {
                                    return Response.errorResponseWithoutData(
                                        res,
                                        'invalidToken',
                                        UNAUTHORIZED
                                    )
                                }
                            })
                        } else {
                            Response.errorResponseWithoutData(res,'invalidToken', UNAUTHORIZED)
                        }
                    })
                } else {
                    Response.errorResponseWithoutData(res,'invalidToken', UNAUTHORIZED)
                }
        }catch{
            console.log("error::", error);
      // this will handle validation errors, handled errors, unHandled errors
      next(ApiError.catchHandel(error));
        }
        
    },
    validateBloodBank: async(req, res, next) => {
        try{
            const token = req.headers.authorization;
            if (!token) {
                return Response.errorResponseWithoutData(res, 'authorizationError', UNAUTHORIZED)
            } 
                const tokenData = await jwToken.decode(token)
                if (tokenData) {
                    jwToken.verify(tokenData, (err, decoded) => {
                        if (err) {
                          return  Response.errorResponseWithoutData(res, 'invalidToken', UNAUTHORIZED)
                        }
                        if (decoded.id) {
                            req.authUserId = decoded.id
                            req.authUserName = decoded.name
                            BloodBank.findOne({
                                where: {
                                    id: req.authUserId,
                                    name:req.authUserName 
                                },
                            }).then((result) => {
                                if (result) {
                                    return next()
                                } else {
                                    return Response.errorResponseWithoutData(
                                        res,
                                        'invalidToken',
                                        UNAUTHORIZED
                                    )
                                }
                            })
                        } else {
                            Response.errorResponseWithoutData(res,'invalidToken', UNAUTHORIZED)
                        }
                    })
                } else {
                    Response.errorResponseWithoutData(res,'invalidToken', UNAUTHORIZED)
                }
        }catch{
            console.log("error::", error);
      // this will handle validation errors, handled errors, unHandled errors
      next(ApiError.catchHandel(error));
        }
        
    },

};
