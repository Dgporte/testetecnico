import { v4 as uuidv4 } from "uuid";
import { Funcionario } from "../models/Funcionario";

class FuncionarioService {
  private funcionarios: Funcionario[] = [
    {
      id: "1",
      ativo: true,
      nome: "João Silva",
      email: "joao.silva@empresa.com",
      cpf: "123.456.789-00",
      dataContratacao: "2023-01-15",
      foto: undefined,
      endereco: {
        rua: "Rua das Flores, 123",
        cep: "01234-567",
        bairro: "Centro",
        cidade: "São Paulo",
        estado: "SP",
      },
      dataCriacao: new Date().toISOString(),
      dataAtualizacao: new Date().toISOString(),
    },
    {
      id: "2",
      ativo: false,
      nome: "Maria Santos",
      email: "maria.santos@empresa.com",
      cpf: "987.654.321-00",
      dataContratacao: "2023-03-22",
      foto: undefined,
      endereco: {
        rua: "Av. Paulista, 456",
        cep: "01310-100",
        bairro: "Bela Vista",
        cidade: "São Paulo",
        estado: "SP",
      },
      dataCriacao: new Date().toISOString(),
      dataAtualizacao: new Date().toISOString(),
    },
  ];

  // GET - Listar todos os funcionários
  getAllFuncionarios(): Funcionario[] {
    return this.funcionarios;
  }

  // GET - Buscar funcionário por ID
  getFuncionarioById(id: string): Funcionario | undefined {
    return this.funcionarios.find((f) => f.id === id);
  }

  // POST - Criar novo funcionário
  createFuncionario(
    funcionarioData: Omit<Funcionario, "id" | "dataCriacao" | "dataAtualizacao">
  ): Funcionario {
    const novoFuncionario: Funcionario = {
      ...funcionarioData,
      id: uuidv4(),
      dataCriacao: new Date().toISOString(),
      dataAtualizacao: new Date().toISOString(),
    };

    this.funcionarios.push(novoFuncionario);
    return novoFuncionario;
  }

  // PUT - Atualizar funcionário
  updateFuncionario(
    id: string,
    funcionarioData: Partial<
      Omit<Funcionario, "id" | "dataCriacao" | "dataAtualizacao">
    >
  ): Funcionario | null {
    const index = this.funcionarios.findIndex((f) => f.id === id);

    if (index === -1) {
      return null;
    }

    this.funcionarios[index] = {
      ...this.funcionarios[index],
      ...funcionarioData,
      dataAtualizacao: new Date().toISOString(),
    };

    return this.funcionarios[index];
  }

  // DELETE - Excluir funcionário
  deleteFuncionario(id: string): boolean {
    const index = this.funcionarios.findIndex((f) => f.id === id);

    if (index === -1) {
      return false;
    }

    this.funcionarios.splice(index, 1);
    return true;
  }

  // GET - Buscar funcionários por status
  getFuncionariosByStatus(ativo: boolean): Funcionario[] {
    return this.funcionarios.filter((f) => f.ativo === ativo);
  }
}

export default new FuncionarioService();
