require('dotenv').config();
module.exports = {
  "development": {
    "username": process.env.DEVELOPMENT_DATABASE_CREDENTIALS_USERNAME,
    "password": process.env.DEVELOPMENT_DATABASE_CREDENTIALS_PASSWORD,
    "database": process.env.DEVELOPMENT_DATABASE_CREDENTIALS_DATABASE,
    "host": process.env.DEVELOPMENT_DATABASE_CREDENTIALS_HOST,
    "dialect": process.env.DEVELOPMENT_DATABASE_CREDENTIALS_DIALECT,
    "logging": true
  },
  "test": {
    "username": process.env.TEST_DATABASE_CREDENTIALS_USERNAME,
    "password": process.env.TEST_DATABASE_CREDENTIALS_PASSWORD,
    "database": process.env.TEST_DATABASE_CREDENTIALS_DATABASE,
    "host": process.env.TEST_DATABASE_CREDENTIALS_HOST,
    "dialect": process.env.TEST_DATABASE_CREDENTIALS_DIALECT
  },
  "production": {
    "username": process.env.PRODUCTION_DATABASE_CREDENTIALS_USERNAME,
    "password": process.env.PRODUCTION_DATABASE_CREDENTIALS_PASSWORD,
    "database": process.env.PRODUCTION_DATABASE_CREDENTIALS_DATABASE,
    "host": process.env.PRODUCTION_DATABASE_CREDENTIALS_HOST,
    "dialect": process.env.PRODUCTION_DATABASE_CREDENTIALS_DIALECT,
    logging: false,
  }
}