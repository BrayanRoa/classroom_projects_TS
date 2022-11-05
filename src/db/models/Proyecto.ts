import { sequelize, Model, DataTypes } from "../conexion";

class Proyecto extends Model {}

Proyecto.init(
  {
    cod_proyecto: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombres: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    estado: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    descripcion: {
      type: DataTypes.TEXT,
    },
    cantidad_alumnos: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: "proyecto",
    timestamps: false,
  }
);

export default Proyecto