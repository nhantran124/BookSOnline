require('../utils/MongooseUtil');
// Model datatbase trong models
const Models = require('./Model');

const AdminDAO = {
  async selectByUsernameAndPassword(username, password) {
    const query = { username: username, password: password };
    const admin = await Models.Admin.findOne(query);
    return admin;
  }
};
module.exports = AdminDAO;