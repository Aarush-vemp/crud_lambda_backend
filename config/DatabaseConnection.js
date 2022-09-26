const Sequelize = require("sequelize");
const rds = require("../config.js"); // config file
const sequelizeInstance = new Sequelize(
    rds.DB_NAME,
    rds.DB_USERNAME,
    rds.DB_PASSWORD,
    {
        host: rds.DB_HOST,
        dialect: rds.DIALECT,
        port : rds.DB_PORT,
        pool: {
            max : 5, 
            min : 0,
            acquire: 30000,
            idle : 10000
        }
    }
);

module.exports = sequelizeInstance;