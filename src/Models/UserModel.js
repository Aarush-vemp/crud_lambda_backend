const sequelizeInstance = require("../../config/DatabaseConnection");
const { DataTypes } = require('sequelize');

const initUserTable = async () => {
     const UserModel = await sequelizeInstance.define("user_details", {
        userName : {
            type : DataTypes.STRING(30),
            allowNull : false
        }, 
        email: {
            type : DataTypes.STRING(255),
            validate: {
                isEmail: true
            },
            allowNull : false
        },
        password : {
            type : DataTypes.STRING(20),
            allowNull : false
        }
    });
    await UserModel.sync({
        alter : true
    });

    return UserModel;
}
    
module.exports = initUserTable;