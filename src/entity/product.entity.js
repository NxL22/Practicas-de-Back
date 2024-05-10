import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';



/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - price
 *         - capacity
 *       properties:
 *         id:
 *           type: integer
 *           description: Identificador único del producto
 *         userId:
 *           type: integer
 *           description: Identificador del usuario propietario del producto
 *         name:
 *           type: string
 *           description: Nombre del producto
 *         price:
 *           type: number
 *           format: float
 *           description: Precio del producto
 *         capacity:
 *           type: integer
 *           description: Capacidad del producto
 *         description:
 *           type: string
 *           description: Descripción del producto
 */
const ProductEntity = sequelize.define('Product', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
    },
    userId:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    capacity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false, 
        validate: {
            len: [1, 255]
        }
    }

});

export default ProductEntity;