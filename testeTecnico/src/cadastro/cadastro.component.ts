import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';

@Component({
  selector: 'app-cadastro',
  imports: [],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css',
})
export class CadastroComponent {
  private http = inject(HttpClient);

  buscarCep(cep: string) {
    const cepLimpo = cep.replace(/\D/g, '');

    if (cepLimpo.length === 8) {
      const cepInput = document.getElementById('cep') as HTMLInputElement;

      cepInput.classList.add('loading');

      this.http.get(`https://viacep.com.br/ws/${cepLimpo}/json/`).subscribe({
        next: (dados: any) => {
          cepInput.classList.remove('loading');

          if (!dados.erro) {
            const ruaInput = document.getElementById('rua') as HTMLInputElement;
            const bairroInput = document.getElementById(
              'bairro'
            ) as HTMLInputElement;
            const cidadeInput = document.getElementById(
              'cidade'
            ) as HTMLInputElement;
            const estadoSelect = document.getElementById(
              'estado'
            ) as HTMLSelectElement;

            if (ruaInput) ruaInput.value = dados.logradouro || '';
            if (bairroInput) bairroInput.value = dados.bairro || '';
            if (cidadeInput) cidadeInput.value = dados.localidade || '';
            if (estadoSelect) estadoSelect.value = dados.uf || '';

            if (!dados.logradouro && ruaInput) {
              ruaInput.focus();
            }
          } else {
            alert('CEP não encontrado!');
          }
        },
        error: (error) => {
          cepInput.classList.remove('loading');
          console.error('Erro ao buscar CEP:', error);
          alert('Erro ao buscar CEP. Tente novamente.');
        },
      });
    }
  }

  onCepChange(event: any) {
    const cep = event.target.value;
    this.buscarCep(cep);
  }

  formatarCep(event: any) {
    let cep = event.target.value.replace(/\D/g, '');
    cep = cep.replace(/(\d{5})(\d)/, '$1-$2');
    event.target.value = cep;
  }
}
