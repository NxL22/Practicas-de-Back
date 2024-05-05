import { Router } from "express";
import UserService from "../service/user.service.js";
import { authenticateJWT } from "../middleware/middleware.js";

const userRoutes = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Operaciones relacionadas con los usuarios
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     JWT:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */


/**
 * @swagger
 * /user/create:
 *   post:
 *     summary: Crea un nuevo usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserCreate'
 *     responses:
 *       '201':
 *         description: Usuario creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '500':
 *         description: Error del servidor
 */
userRoutes.post("/create", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const newUser = await UserService.createUser({ name, email, password });
        return res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


/**
 * @swagger
 * /user:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     tags: [Users]
 *     security:
 *       - JWT: []
 *     responses:
 *       '200':
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       '500':
 *         description: Error del servidor
 */
userRoutes.get("/", authenticateJWT, async (_req, res) => {
    try {
        const users = await UserService.getUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Obtiene un usuario por ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '500':
 *         description: Error del servidor
 */
userRoutes.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const user = await UserService.getUserById(id);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /users/email:
 *   get:
 *     summary: Obtiene un usuario por correo electrónico
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '500':
 *         description: Error del servidor
 */
userRoutes.get("/email", async (req, res) => {
    try {
        const { email } = req.query;
        const user = await UserService.getUserByEmail(email);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



/**
 * @swagger
 * /user/update/{id}:
 *   put:
 *     summary: Actualiza un usuario por ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserUpdate'
 *     responses:
 *       '200':
 *         description: Usuario actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '500':
 *         description: Error del servidor
 */
userRoutes.put("/update/:id", async (req, res) => {
    try {
        const { id } = req.params;
        console.log(typeof id);
        const { name, email, password } = req.body;
        const user = await UserService.updateUser(id, { name, email, password });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /users/delete/{id}:
 *   delete:
 *     summary: Elimina un usuario por ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Usuario eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '500':
 *         description: Error del servidor
 */
userRoutes.delete("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const user = await UserService.deleteUser(id);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default userRoutes;