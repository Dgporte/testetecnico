import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

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

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  total?: number;
}

@Injectable({
  providedIn: 'root',
})
export class FuncionarioService {
  private readonly apiUrl = 'http://localhost:3000/api/funcionarios';

  constructor(private http: HttpClient) {}

  getFuncionarios(): Observable<ApiResponse<Funcionario[]>> {
    return this.http.get<ApiResponse<Funcionario[]>>(this.apiUrl);
  }

  getFuncionarioById(id: string): Observable<ApiResponse<Funcionario>> {
    return this.http.get<ApiResponse<Funcionario>>(`${this.apiUrl}/${id}`);
  }

  createFuncionario(
    funcionario: CreateFuncionarioDto
  ): Observable<ApiResponse<Funcionario>> {
    return this.http.post<ApiResponse<Funcionario>>(this.apiUrl, funcionario);
  }

  updateFuncionario(
    id: string,
    funcionario: Partial<CreateFuncionarioDto>
  ): Observable<ApiResponse<Funcionario>> {
    return this.http.put<ApiResponse<Funcionario>>(
      `${this.apiUrl}/${id}`,
      funcionario
    );
  }

  deleteFuncionario(id: string): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/${id}`);
  }

  searchFuncionarios(termo: string): Observable<ApiResponse<Funcionario[]>> {
    const params = new HttpParams().set('q', termo);
    return this.http.get<ApiResponse<Funcionario[]>>(`${this.apiUrl}/search`, {
      params,
    });
  }

  healthCheck(): Observable<any> {
    return this.http.get('http://localhost:3000/api/health');
  }
}
