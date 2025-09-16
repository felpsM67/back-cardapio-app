import jwt, { SignOptions } from 'jsonwebtoken';
import Cliente from '../models/cliente-model'
import User from '../models/user-model'
import bcrypt from  'bcrypt'
import { ENV } from "../config/env"
import { where } from 'sequelize';
import Gerente from '../models/gerente-model';


export class LoginService {
    async login({ email, senha}: { email: string; senha: string}): Promise<null | number>{
        const user = await User.findOne({ where: { email }});
        const senhaEhValida = await bcrypt.compare(senha, user.senha);
        if (!senhaEhValida) {
            return null
        }
        return user.id;
    }
    async buscarPerfilPorUserId(userId: number) {
        const user = await User.findByPk(userId);
        if(!user) {
            return null;
        }
        if (user.role === 'Funcionario') {
          return Funcionario.findOne({ where: { userId }, include: [ User ]}) 
        } else if (user.role === 'Cliente') {
          return Cliente.findOne({where: { userId }, include: [User]})
        } else if (user.role === 'Gerente') {
          return Gerente.findOne({where: { userId }, include: [User]})
          }
        return null;
        // return Cliente.findOne({ where: {userId}, include:[User] });
    }

    gerarTokens(user: User) {
        const accessTokenOptions: SignOptions = {
            expiresIn: (ENV.JWT_EXPIRES_IN as SignOptions['expiresIn']) || '15m'
        };

        const refreshTokenOptions : SignOptions = {
            expiresIn: (ENV.JWT_REFRESH_EXPIRES_IN as SignOptions['expiresIN']) || '7d',
        };

        const token = jwt.sign(
            {id: user.id, email: user.email, role: user.role}
            ENV.JWT_SECRET || 'default_secret',
            accessTokenOptions
        );
        const refreshToken = jwt.sign(
            { id: user.id},
            ENV.JWT_REFRESH_SECRET || 'default_refresh_secret',
            refreshTokenOptions
        );
        return {token, refreshToken}
    }
}