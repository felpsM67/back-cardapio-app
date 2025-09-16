import adaptRoute from "../adapters/express-route-adapter";
import { Router } from "express";
import ListarPratosController from "../controllers/prato/listar-prato";

export default (router: Router): void => {
  /**
   * @swagger
   * /api/pratos/{id}:
   *   get:
   *     summary: Lista todos os pratos ou um prato específico
   *     tags: [Pratos]
   *     parameters:
   *       - in: query
   *         name: id
   *         schema:
   *           type: string
   *         required: false
   *         description: ID do prato para buscar individualmente
   *     responses:
   *       200:
   *         description: Lista de pratos ou prato específico
   *       404:
   *         description: Prato não encontrado
   *       500:
   *         description: Erro interno
   */
  router.get("/pratos{/:id}", adaptRoute(new ListarPratosController()));
};
