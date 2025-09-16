import { Model, DataType, DataTypes } from "sequelize";
import sequelize from "../database";
import User from "./user-model";

export class Funcionario extends Model {
    id!: number;
    nome!: string;
    endereco!: string;
    carga!: string  
    telefone!: string;
    userId!: number;
    user!: User
}

Funcionario.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        endereco: {
            type: DataTypes.STRING,
            allowNull: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            },
        },
    },
    {
      sequelize,
      modelName: 'Funcionario'  
    }
)
Funcionario.belongsTo(User, {foreignKey: 'userId', as: 'user'});
export default Funcionario