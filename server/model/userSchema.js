const { DataTypes } = require ('sequelize');

// We want to make TODO related to Employee data. Making the function async, qki db banane me time lag skta hai jaha pe import karenge. aur waha pe 'await' kara denge
const createUserModel = async(sequelize) =>{         // sequelize here is the instance that we created in postgre.js
    const User = sequelize.define('User', {     // User model associated to User table
        name: {
            type: DataTypes.STRING,
            allowNull:false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            isLowercase: true,
            unique: true
        },
        designation: {
            type: DataTypes.STRING,
            allowNull: false
        },
        empId: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    });
    return User;
}

module.exports = {
    createUserModel
};
