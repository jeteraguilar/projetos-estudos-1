import { Cliente } from "./cliente.model";
import { Profissional } from "./profissional.model";

export class Agendamento {
  id!: number;
  cliente!: Cliente;
  profissional!: Profissional;
  dataHora!: Date;
}
