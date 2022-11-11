import { Model, DataTypes, sequelize } from '../conexion'
import Rol from './Rol'
import TipoDocumento from './TipoDocumento'
import { PersonaResponse } from '../../interfaces/persona-response.interface';

class Persona extends Model implements PersonaResponse{
  declare correo_institucional: string;
  declare nombres: string;
  declare apellidos: string;
  declare cod_tipo_doc: number | null;
  declare cod_rol: number;
  declare codigo: string;
  declare correo_personal: string | null;
  declare documento: string | null;
  declare celular: string | null;
  declare semestres: number | null;
  declare img: string;
  declare perfil_completado: boolean;
}

Persona.init(
    {
        correo_institucional: {
          type: DataTypes.STRING(100),
          allowNull: false,
          primaryKey: true,
        },
        nombres: {
          type: DataTypes.STRING(30),
          allowNull: false,
        },
        apellidos: {
          type: DataTypes.STRING(30),
          allowNull: false,
        },
        cod_tipo_doc: {
          type: DataTypes.INTEGER,
          references: {
            model: TipoDocumento,
            key: 'cod_tipo_doc',
          },
        },
        cod_rol: {
          type: DataTypes.INTEGER,
          references:{
            model:Rol,
            key:'cod_rol'
          }
        },
        codigo: {
          type: DataTypes.STRING(10),
          allowNull:false,
          unique: true,
        },
        correo_personal: {
          type: DataTypes.STRING(100),
          unique: true,
          allowNull: true,
        },
        documento: {
          type: DataTypes.STRING(12),
          allowNull: true,
          unique: true,
        },
        celular: {
          type: DataTypes.STRING(10),
          allowNull: true,
        },
        semestres: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        img: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        perfil_completado: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
    },
    {
        sequelize,
        modelName:'persona',
        timestamps:false
    }
)

export default Persona