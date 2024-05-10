import { Router } from "express";
import userService from "../service/user.service.js";
import adminService from "../service/admin.service.js";
import { adminGuard, authenticateJWT, prueba } from "../middleware/middleware.js";
import { addWord } from "../middleware/middleware.js"
import UserRole from "../utils/enum/user-role.enum.js";

const authRoutes = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Operaciones relacionadas con las autorizaciones
 */


/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Permite iniciar sesión 
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthCreate'
 *     responses:
 *       '201':
 *         description: has iniciado sesión correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthCreate'
 *       '500':
 *         description: Error del servidor
 */
authRoutes.post("/login", async (req, res) => {
    try {
        const { email, password, role } = req.body

        if (role == UserRole.Admin) {
            const result = await adminService.loginAdmin(email, password);
            return res.send(result);
        }
        const result = await userService.loginUser(email, password);
        return res.send(result);

    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Hubo un error en el servidor.');
    }
})



/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Obtiene los detalles del usuario autenticado
 *     tags: [Auth]
 *     security:
 *       - jwtAuth: []
 *     responses:
 *       '200':
 *         description: Detalles del usuario autenticado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthCreate' 
 *       '500':
 *         description: Error del servidor
 */
authRoutes.get("/me", authenticateJWT, async (req, res) => {
    try {
        return res.json(req.user)
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Hubo un error en el servidor.');
    }
})


authRoutes.get("/word", addWord, async (req, res) => {
    try {

        const middlewareResult = req.meta

        // res.send(`hola ${result}, este es tu middleware ${middlewareResult}`);
        const chart = `hola , este es tu middleware ${middlewareResult}`
        const allCombinations = {
            chart,
            middlewareResult
        }
        res.status(200).json(allCombinations)
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Hubo un error en el servidor.');
    }
})


export default authRoutes;