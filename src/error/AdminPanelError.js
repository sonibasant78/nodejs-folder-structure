class AdminPanelError {
    constructor(status, message) {
        this.status = status
      this.message = message;
    }
  
    static badRequestAdmin(status,msg) {
      return new AdminPanelError(status, msg);
    }
    static refrenceAdmin(status, msg) {
        return new AdminPanelError(status, msg);
      }
    static internalAdmin(status, msg) {
      return new AdminPanelError(status, msg);
    }
  }
  
  module.exports = AdminPanelError;
  