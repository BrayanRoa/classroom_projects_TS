import { Model, sequelize, DataTypes } from "../conexion";
import { GrupoResponse } from '../../interfaces/materia-response.interface';

class Grupo extends Model implements GrupoResponse{
  declare cod_grupo: number;
  declare nombre: string;
  declare cod_asignatura: string;
  declare cantidad_alumnos: number;
}

Grupo.init(
  {
    cod_grupo: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING(1),
      allowNull: false,
    },
    cod_asignatura: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    cantidad_alumnos: {
      type: DataTypes.TINYINT,
      defaultValue: 20,
    },
  },
  {
    sequelize,
    modelName: "grupo",
    timestamps: false,
  }
);

export default Grupo