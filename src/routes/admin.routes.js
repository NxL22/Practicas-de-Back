import { Router } from "express";
import adminService from "../service/admin.service.js";

const adminRoutes = Router();

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