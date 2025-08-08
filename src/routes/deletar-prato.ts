import adaptRoute from "../adapters/express-route-adapter";
import { Router } from "express";
import DeletarPratoController from "../controllers/prato/deletar-prato";

export default (router: Router): void => {
  /**
   * @swagger
   * /api/pratos/{id}:
   *   delete:
   *     summary: Deleta um prato
   *     tags: [Pratos]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: ID do prato
   *     responses:
   *       204:
   *         description: Prato deletado com sucesso
   *       404:
   *         description: Prato não encontrado
   *       500:
   *         description: Erro interno
   */
  router.delete("/pratos/:id", adaptRoute(new DeletarPratoController()));
};
