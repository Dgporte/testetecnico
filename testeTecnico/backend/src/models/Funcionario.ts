export interface Funcionario {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  cargo: string;
  salario: number;
  dataAdmissao: string;
  status: 'ativo' | 'inativo';
  endereco: {
    cep: string;
    logradouro: string;
    numero: string;
    complemento?: string;
    bairro: string;
    cidade: string;
    uf: string;
  };
  foto?: string;
  dataCriacao: string;
  dataAtualizacao: string;
}

export interface CreateFuncionarioDto {
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  cargo: string;
  salario: number;
  dataAdmissao: string;
  endereco: {
    cep: string;
    logradouro: string;
    numero: string;
    complemento?: string;
    bairro: string;
    cidade: string;
    uf: string;
  };
  foto?: string;
}

export interface UpdateFuncionarioDto extends Partial<CreateFuncionarioDto> {
  status?: 'ativo' | 'inativo';
}
