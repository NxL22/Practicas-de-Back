import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import UserRole from '../utils/enum/user-role.enum.js';


/**
 * @swagger
 * components:
 *   schemas:
 *     Admin:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID del admin
 *           example: 1
 *         name:
 *           type: string
 *           description: Nombre del admin
 *         email:
 *           type: string
 *           format: email
 *           description: Correo electrónico del admin
 *         password:
 *           type: string
 *           format: password
 *           description: Contraseña del admin
 *         role:
 *           type: string
 *           enum:
 *             - ADMIN
 *             - USER
 *           description: Rol del usuario
 */
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