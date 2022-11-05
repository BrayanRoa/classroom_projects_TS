import { Model, sequelize, DataTypes } from "../conexion";

class Avance extends Model {}

Avance.init(
  {
    cod_avance: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre_avance: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    cod_proyecto: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
    },
    enlace: {
      type: DataTypes.STRING,
    },
    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    fecha_entrega: {
      type: DataTypes.DATEONLY,
    },
  },
  {
    sequelize,
    modelName: "avance",
    timestamps: false,
  }
);


export default Avance