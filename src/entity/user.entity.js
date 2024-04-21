import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import UserRole from '../utils/enum/user-role.enum.js';

const UserEntity = sequelize.define('User', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: [1, 255]
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            len: [1, 255]
        }
    },
    
    role: {
        type: DataTypes.ENUM(...Object.values(UserRole)),
        allowNull: false
    }

});

export default UserEntity;
