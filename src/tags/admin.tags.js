/**
 * @swagger
 * components:
 *   schemas:
 *     AdminCreate:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - token
 *       properties:
 *         name:
 *           type: string
 *           description: Nombre del usuario
 *         email:
 *           type: string
 *           format: email
 *           description: Correo electrónico del usuario
 *         password:
 *           type: string
 *           format: password
 *           description: Contraseña del usuario
 *         token:
 *           type: string
 *           description: Token del usuario
 */

