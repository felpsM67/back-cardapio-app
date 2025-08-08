import adaptRoute from "../adapters/express-route-adapter";
import { Router } from "express";
import EditarPratoController from "../controllers/prato/editar-prato";

export default (router: Router): void => {
  /**
   * @swagger
   * /api/pratos/{id}:
   *   put:
   *     summary: Edita um prato existente
   *     tags: [Pratos]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: ID do prato
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Prato'
   *     responses:
   *       200:
   *         description: Prato atualizado com sucesso
   *       404:
   *         description: Prato não encontrado
   *       500:
   *         description: Erro interno
   */
  router.put("/pratos/:id", adaptRoute(new EditarPratoController()));
};
