import { Router } from "express";
import adminService from "../service/admin.service.js";

const adminRoutes = Router();

/**
 * @swagger
 * tags:
 *   name: Admins
 *   description: Operaciones relacionadas con los admins
 */

/**
 * @swagger
 * /admin/create:
 *   post:
 *     summary: Crea un nuevo administrador
 *     tags: [Admins]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AdminCreate'
 *     responses:
 *       '201':
 *         description: Admin creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties: 
 *                 name:
 *                   type: string
 *                   description: Nombre del administrador.
 *                 email:
 *                   type: string
 *                   format: email
 *                   description: Dirección de correo electrónico del administrador.
 *                 token:
 *                    type: string
 *  
 *       '500':
 *         description: Error del servidor
 */

adminRoutes.post("/create", async (req, res) => {
  try {
    const response = await adminService.createAdmin(req.body);
    return res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})


adminRoutes.get("/", async (_req, res) => {
  const response = await adminService.getAdmin();
  res.json(response);
});



export default adminRoutes;



/* Crear una entity de producto, una ruta producto, un servicio producto
y conectarlo a la ruta express 
el orden es ruta - conectarla al enrutador - hacer hello world desde la ruta-
hello desde el servicio- crear la entity y luego un producto de la entity*/