import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../app/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  showPassword = false;
  email: string = '';
  password: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private authService: AuthService) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  async onLogin(): Promise<void> {
    if (!this.email || !this.password) {
      this.errorMessage = 'Por favor, preencha todos os campos.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    try {
      await this.authService.login(this.email, this.password);
    } catch (error: any) {
      console.error('Erro no login:', error);

      if (error.code === 'auth/user-not-found') {
        this.errorMessage = 'Usuário não encontrado.';
      } else if (error.code === 'auth/wrong-password') {
        this.errorMessage = 'Senha incorreta.';
      } else if (error.code === 'auth/invalid-email') {
        this.errorMessage = 'Email inválido.';
      } else if (error.code === 'auth/too-many-requests') {
        this.errorMessage =
          'Muitas tentativas de login. Tente novamente mais tarde.';
      } else if (error.message.includes('Acesso negado')) {
        this.errorMessage = error.message;
      } else {
        this.errorMessage = 'Erro no login. Tente novamente.';
      }
    } finally {
      this.isLoading = false;
    }
  }

  limparFormulario(): void {
    this.email = '';
    this.password = '';
    this.errorMessage = '';
  }
}
