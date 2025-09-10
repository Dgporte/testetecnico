import { v4 as uuidv4 } from 'uuid';
import {
  Funcionario,
  CreateFuncionarioDto,
  UpdateFuncionarioDto,
} from '../models/Funcionario';

export class FuncionarioService {
  private funcionarios: Funcionario[] = [];

  getAllFuncionarios(): Funcionario[] {
    return this.funcionarios;
  }

  getFuncionarioById(id: string): Funcionario | undefined {
    return this.funcionarios.find((f) => f.id === id);
  }

  createFuncionario(data: CreateFuncionarioDto): Funcionario {
    const novoFuncionario: Funcionario = {
      id: uuidv4(),
      ...data,
      status: 'ativo',
      dataCriacao: new Date().toISOString(),
      dataAtualizacao: new Date().toISOString(),
    };

    this.funcionarios.push(novoFuncionario);
    return novoFuncionario;
  }

  updateFuncionario(
    id: string,
    data: UpdateFuncionarioDto
  ): Funcionario | null {
    const index = this.funcionarios.findIndex((f) => f.id === id);

    if (index === -1) {
      return null;
    }

    this.funcionarios[index] = {
      ...this.funcionarios[index],
      ...data,
      dataAtualizacao: new Date().toISOString(),
    };

    return this.funcionarios[index];
  }

  deleteFuncionario(id: string): boolean {
    const index = this.funcionarios.findIndex((f) => f.id === id);

    if (index === -1) {
      return false;
    }

    this.funcionarios.splice(index, 1);
    return true;
  }

  searchFuncionarios(termo: string): Funcionario[] {
    const termoLower = termo.toLowerCase();
    return this.funcionarios.filter(
      (f) =>
        f.nome.toLowerCase().includes(termoLower) ||
        f.email.toLowerCase().includes(termoLower) ||
        f.cargo.toLowerCase().includes(termoLower) ||
        f.cpf.includes(termo)
    );
  }
}
