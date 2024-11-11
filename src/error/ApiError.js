const CONSTANTS = require("../services/Constant");
class ApiError {
    constructor(code, message) {
      this.code = code;
      this.message = message;
    }
  
    static badRequest(msg) {
      return new ApiError(400, msg);
    }
    static catchHandel(error){
      const response = {
        message:CONSTANTS.INTERNAL_SERVER_ERROR_MESSAGE
      }
      
      // for validation errors
      if ((error.message.split('&&').length>1)) {
        response.message = error.message.split('&&')[1]
        
        return new ApiError(CONSTANTS.ERROR_CODES.BAD_REQUEST, response);
      }

      // for handled errors
      if (CONSTANTS.HANDELED_ERRORS.includes(error.message)) {
        response.message = error.message
        return new ApiError(CONSTANTS.ERROR_CODES.BAD_REQUEST,response );
      }

      // for unHandled errors
      return new ApiError(500, response);
    }
    static refrence(msg) {
        return new ApiError(400, msg);
    }
    static internal(msg) {
      return new ApiError(500, msg);
    }
  }
  
  module.exports = ApiError;
  