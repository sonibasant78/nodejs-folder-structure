'use strict';

/** @type {import('sequelize-cli').Migration} */
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwToken = require("../services/jwtToken");


const { Admin } = require('../models'); 

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const password = 'password123456'; 
    const hashedPassword = await bcrypt.hash(password, 10);

    const adminUser = {
      email: 'admin@admin.com',
      password: hashedPassword,
      username:'admin'
    };

    const createdUser = await Admin.create(adminUser);
    const token = jwToken.issueAdmin({
      id: createdUser.id,
      username: createdUser.username,
    });
    createdUser.token = token;
    await createdUser.save() 

    console.log(`Admin created with token: ${token}`);
  },

  down: async (queryInterface, Sequelize) => {
    await Admin.destroy({ where: { email: 'admin@admin.com' } });
  },
};

