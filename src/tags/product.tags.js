/**
 * @swagger
 * /product/create:
 *   post:
 *     summary: Crea un nuevo producto
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del producto
 *               price:
 *                 type: number
 *                 format: float
 *                 description: Precio del producto
 *               capacity:
 *                 type: integer
 *                 description: Capacidad del producto
 *               description:
 *                 type: string
 *                 description: Descripción del producto
 *     responses:
 *       '201':
 *         description: Producto creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       '500':
 *         description: Error del servidor
 */
