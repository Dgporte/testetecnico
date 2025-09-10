export interface Endereco {
  rua: string;
  cep: string;
  bairro: string;
  cidade: string;
  estado: string;
}

export interface Funcionario {
  id: string;
  ativo: boolean;
  foto?: string;
  nome: string;
  email: string;
  dataContratacao: string;
  cpf: string;
  endereco: Endereco;
  dataCriacao: string;
  dataAtualizacao: string;
}
