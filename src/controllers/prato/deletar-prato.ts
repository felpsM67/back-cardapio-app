import { Controller, HttpRequest, HttpResponse } from '../../interfaces';
import User from '../../models/user-model';

class DeletarPratoController implements Controller {
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const id = httpRequest.params;
        try {
            const Prato = await User.findByPk(id);

            if(!Prato) {
                return {
                    statusCode: 404,
                    body: {error: 'Usuario não encontrado'}
                }
            };

            await Prato.destroy();
            return {
                statusCode: 204,
                body: {}
            };
        } catch (error: any) {
            return {
                statusCode: 500,
                body: {error: 'Erro ao deletar o usuario'}
            };
        }
    }
}

export default DeletarPratoController; 