const {DataTypes} = require ('sequelize');

const createAuthModel = async (sequelize) => {       // fn to create Model
    const AuthUser = sequelize.define('AuthUser', {  // model 
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            primaryKey: true,
            
        }
    });
    return AuthUser;
}

module.exports = { createAuthModel };