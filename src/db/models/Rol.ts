import { Model, sequelize, DataTypes } from "../conexion";

class Rol extends Model {}

Rol.init(
  {
    cod_rol: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "rol",
    timestamps: false,
  }
);


export default Rol;