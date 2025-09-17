import { Controller, HttpRequest } from "../../interfaces";
import Pedido from "../../models/pedido-models";

export class CriarPedidosController implements Controller {
    async handle(httpRequest: HttpRequest): Promise<HttpRequest> {

        try {
            const {nome, cozinha, descricao_resumida, descricao_detalhada, imagem, valor} = httpRequest
        }
    }
}