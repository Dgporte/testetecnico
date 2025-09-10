import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista-funcionarios',
  imports: [CommonModule],
  templateUrl: './lista-funcionarios.component.html',
  styleUrl: './lista-funcionarios.component.css',
})
export class ListaFuncionariosComponent {
  funcionarios = [
    {
      id: 1,
      nome: 'João Silva',
      email: 'joao.silva@empresa.com',
      cpf: '123.456.789-00',
      dataContratacao: '2023-01-15',
      ativo: true,
      foto: null,
      endereco: {
        rua: 'Rua das Flores, 123',
        cep: '01234-567',
        bairro: 'Centro',
        cidade: 'São Paulo',
        estado: 'SP',
      },
    },
    {
      id: 2,
      nome: 'Maria Santos',
      email: 'maria.santos@empresa.com',
      cpf: '987.654.321-00',
      dataContratacao: '2023-03-22',
      ativo: false,
      foto: null,
      endereco: {
        rua: 'Av. Paulista, 456',
        cep: '01310-100',
        bairro: 'Bela Vista',
        cidade: 'São Paulo',
        estado: 'SP',
      },
    },
  ];

  editarFuncionario(id: number) {
    console.log('Editar funcionário:', id);
  }

  excluirFuncionario(id: number) {
    if (confirm('Tem certeza que deseja excluir este funcionário?')) {
      this.funcionarios = this.funcionarios.filter((f) => f.id !== id);
    }
  }

  adicionarFuncionario() {
    console.log('Adicionar novo funcionário');
  }
}
