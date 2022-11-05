import { Model, sequelize, DataTypes } from "../conexion";

class TipoDocumento extends Model {}

TipoDocumento.init(
  {
    cod_tipo_doc: {
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
    modelName: "tipo_documento",
    timestamps: false,
  }
);

export default TipoDocumento
