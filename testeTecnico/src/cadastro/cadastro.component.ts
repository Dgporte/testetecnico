import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FirestoreFuncionarioService,
  Funcionario,
} from '../app/services/firestore-funcionario.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-cadastro',
  imports: [NavbarComponent, CommonModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css',
})
export class CadastroComponent implements OnInit {
  private http = inject(HttpClient);
  private funcionarioService = inject(FirestoreFuncionarioService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  isLoading = false;
  selectedPhoto: string | null = null;
  isEditMode = false;
  funcionarioId: string | null = null;
  funcionario: Funcionario | null = null;

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params['id']) {
        this.isEditMode = true;
        this.funcionarioId = params['id'];
        if (this.funcionarioId) {
          this.carregarFuncionario(this.funcionarioId);
        }
      }
    });
  }

  carregarFuncionario(id: string) {
    this.isLoading = true;
    this.funcionarioService.obterFuncionario(id).subscribe({
      next: (funcionario: Funcionario) => {
        this.funcionario = funcionario;
        this.preencherFormulario(funcionario);
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Erro ao carregar funcionário:', error);
        alert('Erro ao carregar dados do funcionário.');
        this.router.navigate(['/lista-funcionarios']);
        this.isLoading = false;
      },
    });
  }

  preencherFormulario(funcionario: Funcionario) {
    setTimeout(() => {
      const nomeInput = document.getElementById('nome') as HTMLInputElement;
      const emailInput = document.getElementById('email') as HTMLInputElement;
      const telefoneInput = document.getElementById(
        'telefone'
      ) as HTMLInputElement;
      const cpfInput = document.getElementById('cpf') as HTMLInputElement;
      const cargoInput = document.getElementById('cargo') as HTMLInputElement;
      const salarioInput = document.getElementById(
        'salario'
      ) as HTMLInputElement;
      const dataAdmissaoInput = document.getElementById(
        'dataAdmissao'
      ) as HTMLInputElement;
      const cepInput = document.getElementById('cep') as HTMLInputElement;
      const ruaInput = document.getElementById('rua') as HTMLInputElement;
      const numeroInput = document.getElementById('numero') as HTMLInputElement;
      const complementoInput = document.getElementById(
        'complemento'
      ) as HTMLInputElement;
      const bairroInput = document.getElementById('bairro') as HTMLInputElement;
      const cidadeInput = document.getElementById('cidade') as HTMLInputElement;
      const estadoSelect = document.getElementById(
        'estado'
      ) as HTMLSelectElement;
      const ativoSelect = document.getElementById('ativo') as HTMLSelectElement;

      if (nomeInput) nomeInput.value = funcionario.nome || '';
      if (emailInput) emailInput.value = funcionario.email || '';
      if (telefoneInput) telefoneInput.value = funcionario.telefone || '';
      if (cpfInput) cpfInput.value = funcionario.cpf || '';
      if (cargoInput) cargoInput.value = funcionario.cargo || '';
      if (salarioInput)
        salarioInput.value = this.formatarSalarioParaInput(
          funcionario.salario || 0
        );
      if (dataAdmissaoInput)
        dataAdmissaoInput.value = funcionario.dataNascimento || '';
      if (cepInput) cepInput.value = funcionario.cep || '';
      if (ruaInput) ruaInput.value = funcionario.endereco || '';
      if (numeroInput) numeroInput.value = funcionario.numero || '';
      if (complementoInput)
        complementoInput.value = funcionario.complemento || '';
      if (bairroInput) bairroInput.value = funcionario.bairro || '';
      if (cidadeInput) cidadeInput.value = funcionario.cidade || '';
      if (estadoSelect) estadoSelect.value = funcionario.estado || '';
      if (ativoSelect) ativoSelect.value = funcionario.ativo || 'ativo';

      this.selectedPhoto = funcionario.foto || null;
    }, 100);
  }

  formatarSalarioParaInput(salario: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(salario);
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          this.selectedPhoto = reader.result as string;
        };
        reader.readAsDataURL(file);
      } else {
        alert('Por favor, selecione apenas arquivos de imagem.');
        event.target.value = '';
        this.selectedPhoto = null;
      }
    }
  }

  removePhoto() {
    this.selectedPhoto = null;
    const fileInput = document.getElementById('foto') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

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

  formatarCpf(event: any) {
    let cpf = event.target.value.replace(/\D/g, '');
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    event.target.value = cpf;
  }

  formatarTelefone(event: any) {
    let telefone = event.target.value.replace(/\D/g, '');
    telefone = telefone.replace(/(\d{2})(\d)/, '($1) $2');
    telefone = telefone.replace(/(\d{5})(\d)/, '$1-$2');
    event.target.value = telefone;
  }

  formatarSalario(event: any) {
    let valor = event.target.value.replace(/\D/g, '');
    valor = (parseFloat(valor) / 100).toFixed(2);
    valor = valor.replace('.', ',');
    valor = valor.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    event.target.value = 'R$ ' + valor;
  }

  cadastrarFuncionario() {
    if (this.isLoading) return;

    const nomeInput = document.getElementById('nome') as HTMLInputElement;
    const emailInput = document.getElementById('email') as HTMLInputElement;
    const telefoneInput = document.getElementById(
      'telefone'
    ) as HTMLInputElement;
    const cpfInput = document.getElementById('cpf') as HTMLInputElement;
    const cargoInput = document.getElementById('cargo') as HTMLInputElement;
    const salarioInput = document.getElementById('salario') as HTMLInputElement;
    const dataAdmissaoInput = document.getElementById(
      'dataAdmissao'
    ) as HTMLInputElement;
    const cepInput = document.getElementById('cep') as HTMLInputElement;
    const ruaInput = document.getElementById('rua') as HTMLInputElement;
    const numeroInput = document.getElementById('numero') as HTMLInputElement;
    const complementoInput = document.getElementById(
      'complemento'
    ) as HTMLInputElement;
    const bairroInput = document.getElementById('bairro') as HTMLInputElement;
    const cidadeInput = document.getElementById('cidade') as HTMLInputElement;
    const estadoSelect = document.getElementById('estado') as HTMLSelectElement;
    const ativoSelect = document.getElementById('ativo') as HTMLSelectElement;

    if (!nomeInput?.value || !emailInput?.value || !cpfInput?.value) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const funcionarioData: Funcionario = {
      nome: nomeInput.value,
      email: emailInput.value,
      telefone: telefoneInput.value,
      cpf: cpfInput.value,
      cargo: cargoInput.value,
      salario: this.parseSalario(salarioInput.value),
      dataNascimento: dataAdmissaoInput.value,
      cep: cepInput.value,
      endereco: ruaInput.value,
      numero: numeroInput.value,
      complemento: complementoInput.value || undefined,
      bairro: bairroInput.value,
      cidade: cidadeInput.value,
      estado: estadoSelect.value,
      ativo: ativoSelect.value,
      foto: this.selectedPhoto || '',
    };

    this.isLoading = true;

    if (this.isEditMode && this.funcionarioId) {
      // Modo de edição - atualizar funcionário existente
      this.funcionarioService
        .atualizarFuncionario(this.funcionarioId, funcionarioData)
        .subscribe({
          next: () => {
            this.isLoading = false;
            alert('Funcionário atualizado com sucesso!');
            this.router.navigate(['/lista-funcionarios']);
          },
          error: (error: any) => {
            this.isLoading = false;
            console.error('Erro ao atualizar:', error);
            alert('Erro ao atualizar funcionário. Tente novamente.');
          },
        });
    } else {
      this.funcionarioService.adicionarFuncionario(funcionarioData).subscribe({
        next: (id: string) => {
          this.isLoading = false;
          alert('Funcionário cadastrado com sucesso!');
          this.router.navigate(['/lista-funcionarios']);
        },
        error: (error: any) => {
          this.isLoading = false;
          console.error('Erro ao cadastrar:', error);
          alert('Erro ao cadastrar funcionário. Tente novamente.');
        },
      });
    }
  }

  private parseSalario(salarioStr: string): number {
    const numeroStr = salarioStr
      .replace(/R\$\s?/g, '')
      .replace(/\./g, '')
      .replace(',', '.');
    return parseFloat(numeroStr) || 0;
  }

  limparFormulario() {
    const form = document.querySelector('form') as HTMLFormElement;
    if (form) {
      form.reset();
    }
  }
}
