import { Component } from '@angular/core';
import { AgendamentoService } from '../../services/agendamento.service';

@Component({
  selector: 'app-agendamentos',
  templateUrl: './agendamentos.component.html',
  styleUrls: []
})
export class AgendamentosComponent {
  agendamentos: any[] = [];

  constructor(private agendamentoService: AgendamentoService) {
    this.listarAgendamentos();
  }

  listarAgendamentos() {
    this.agendamentoService.listarAgendamentos().subscribe(data => {
      this.agendamentos = data;
    });
  }
}
