import { Component } from '@angular/core';

import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent {
  email: string = '';
  senha: string = '';

  constructor(private clienteService: ClienteService) {}

  login() {
    // Lógica para autenticar o cliente
    console.log(`Email: ${this.email}, Senha: ${this.senha}`);
  }
}
