import { error } from "console";
import { Controller, HttpRequest, HttpResponse } from "../../interfaces";
import Prato from "../../models/prato-models";

class ListarPratosController implements Controller {
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const pratoId = httpRequest.params.id
            const prato = await Prato.findByPk(pratoId);
            if (!prato && pratoId != '{id}' && pratoId !== undefined) {
                return {
                    statusCode: 404,
                    body: { message: 'Prato não encontrado' }
                };
            } else if (pratoId !== '{id}'  && pratoId !== undefined){
              return {
                statusCode: 200,
                body: prato,
              };
            }
            const pratos = await Prato.findAll();
            if (pratos.length === 0 ) {
                return {
                    statusCode: 404,
                    body: { error: 'Nenhum usuário encontrado' },
                };
            }
            return {
                statusCode: 200,
                body: pratos,
            };
        } catch (error: any) {
          return {
            statusCode: 500,
            body: { error: error.message}
          }
        }
    }
}

export default ListarPratosController