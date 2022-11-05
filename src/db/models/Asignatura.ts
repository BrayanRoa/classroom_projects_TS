import { Model, DataTypes, sequelize } from "../conexion";

class Asignatura extends Model {}

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
