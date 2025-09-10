import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  FirestoreFuncionarioService,
  Funcionario,
} from '../app/services/firestore-funcionario.service';

@Component({
  selector: 'app-lista-funcionarios',
  imports: [CommonModule, FormsModule],
  templateUrl: './lista-funcionarios.component.html',
  styleUrl: './lista-funcionarios.component.css',
})
export class ListaFuncionariosComponent implements OnInit {
  private funcionarioService = inject(FirestoreFuncionarioService);
  private router = inject(Router);

  funcionarios: Funcionario[] = [];
  isLoading = true;
  searchTerm = '';

  ngOnInit() {
    this.carregarFuncionarios();
  }

  carregarFuncionarios() {
    this.isLoading = true;
    this.funcionarioService.listarFuncionarios().subscribe({
      next: (funcionarios: Funcionario[]) => {
        this.funcionarios = funcionarios;
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Erro ao carregar funcionários:', error);
        this.isLoading = false;
        alert('Erro ao carregar lista de funcionários.');
      },
    });
  }

  pesquisarFuncionarios() {
    if (!this.searchTerm.trim()) {
      this.carregarFuncionarios();
      return;
    }

    this.isLoading = true;
    this.funcionarioService.buscarFuncionarios(this.searchTerm).subscribe({
      next: (funcionarios: Funcionario[]) => {
        this.funcionarios = funcionarios;
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Erro ao pesquisar funcionários:', error);
        this.isLoading = false;
      },
    });
  }

  editarFuncionario(id: string) {
    console.log('Editar funcionário:', id);
    alert('Funcionalidade de edição será implementada em breve!');
  }

  excluirFuncionario(funcionario: Funcionario) {
    if (
      confirm(
        `Tem certeza que deseja excluir o funcionário ${funcionario.nome}?`
      )
    ) {
      this.funcionarioService.deletarFuncionario(funcionario.id!).subscribe({
        next: () => {
          alert('Funcionário excluído com sucesso!');
          this.carregarFuncionarios();
        },
        error: (error: any) => {
          console.error('Erro ao excluir funcionário:', error);
          alert('Erro ao excluir funcionário. Tente novamente.');
        },
      });
    }
  }

  adicionarFuncionario() {
    this.router.navigate(['/cadastro']);
  }

  formatarData(data: string): string {
    return new Date(data).toLocaleDateString('pt-BR');
  }

  formatarSalario(salario: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(salario);
  }

  onSearchInput(event: any) {
    this.searchTerm = event.target.value;
    if (this.searchTerm === '') {
      this.carregarFuncionarios();
    }
  }

  onSearchSubmit() {
    this.pesquisarFuncionarios();
  }
}
