import { GrupoResponse, Materia } from "../../interfaces/materia-response.interface";
import { Model, DataTypes, sequelize } from "../conexion";

class Asignatura extends Model implements Materia{
  declare cod_asignatura: string;
  declare nombre: string;
  declare grupos?: GrupoResponse[];
}

Asignatura.init(
  {
    cod_asignatura: {
      type: DataTypes.STRING(10),
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: "asignatura",
    timestamps: false,
  }
);

export default Asignatura
