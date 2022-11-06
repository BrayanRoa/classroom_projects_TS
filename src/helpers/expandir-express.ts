import Persona from "../db/models/Persona";

declare global {
  namespace Express {
    interface Request {
      persona: Persona;
      uid: string;
    }
  }
}

console.log('GOLLLLAAAA');
