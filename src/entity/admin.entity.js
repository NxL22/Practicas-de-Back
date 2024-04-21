import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import UserRole from '../utils/enum/user-role.enum.js';

// Aqui admin esta en mayuscula y en la otra en minuscula
const AdminEntity = sequelize.define('Admin', {

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
    role: {
        type: DataTypes.ENUM(...Object.values(UserRole)),

        allowNull: false
    }
    

});

export default AdminEntity;