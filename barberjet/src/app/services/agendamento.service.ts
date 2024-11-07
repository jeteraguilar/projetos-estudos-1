import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Agendamento } from '../models/agendamento.model';


@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {
  private baseUrl = 'http://localhost:8080/api/agendamentos';

  constructor(private http: HttpClient) {}

  listarAgendamentos(): Observable<Agendamento[]> {
    return this.http.get<Agendamento[]>(this.baseUrl);
  }

  cadastrarAgendamento(agendamento: Agendamento): Observable<Agendamento> {
    return this.http.post<Agendamento>(this.baseUrl, agendamento);
  }
}
