import Asignatura from "./models/Asignatura";
import Avance from "./models/Avance";
import Grupo from "./models/Grupo";
import Persona from "./models/Persona";
import Proyecto from "./models/Proyecto";


//* MUCHOS A MUCHOS
Persona.belongsToMany(Asignatura, {through: 'persona_asignaturas', timestamps:false})
Asignatura.belongsToMany(Persona, {through: 'persona_asignaturas', timestamps:false})

//* MUCHOS A MUCHOS
Grupo.belongsToMany(Persona, {through:'grupo_personas', timestamps:false})
Persona.belongsToMany(Grupo, {through:'grupo_personas', timestamps:false})

//* UNO A MUCHOS
Asignatura.hasMany(Grupo, {foreignKey:'cod_asignatura'})
Grupo.belongsTo(Asignatura, {foreignKey:'cod_asignatura'})

//* MUCHOS A MUCHOS
Asignatura.belongsToMany(Proyecto, {through:'asignatura_proyecto', timestamps: false})
Proyecto.belongsToMany(Asignatura, {through:'asignatura_proyecto', timestamps: false})

//* MUCHOS A MUCHOS
Persona.belongsToMany(Proyecto, {through: 'persona_proyecto', timestamps: false})
Proyecto.belongsToMany(Persona, {through: 'persona_proyecto', timestamps: false})

//* UNO A MUCHOS
Proyecto.hasMany(Avance, {foreignKey:'cod_proyecto'})
Avance.belongsTo(Proyecto, {foreignKey: 'cod_proyecto'})