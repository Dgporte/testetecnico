import { Injectable } from '@angular/core';
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../firebase.config';
import { Observable, from, map } from 'rxjs';

export interface Funcionario {
  id?: string;
  nome: string;
  email: string;
  cpf: string;
  telefone: string;
  dataNascimento: string;
  cargo: string;
  salario: number;
  cep: string;
  endereco: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  estado: string;
  foto?: string;
  ativo?: string;
  dataCadastro?: Date;
}

@Injectable({
  providedIn: 'root',
})
export class FirestoreFuncionarioService {
  private collectionName = 'funcionarios';

  constructor() {}

  adicionarFuncionario(funcionario: Funcionario): Observable<string> {
    const funcionarioData = {
      ...funcionario,
      dataCadastro: Timestamp.now(),
    };

    return from(
      addDoc(collection(db, this.collectionName), funcionarioData)
    ).pipe(map((docRef) => docRef.id));
  }

  listarFuncionarios(): Observable<Funcionario[]> {
    const q = query(
      collection(db, this.collectionName),
      orderBy('dataCadastro', 'desc')
    );

    return from(getDocs(q)).pipe(
      map((querySnapshot) => {
        const funcionarios: Funcionario[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          funcionarios.push({
            id: doc.id,
            ...data,
            dataCadastro: data['dataCadastro']?.toDate(),
          } as Funcionario);
        });
        return funcionarios;
      })
    );
  }

  obterFuncionario(id: string): Observable<Funcionario> {
    const docRef = doc(db, this.collectionName, id);
    return from(getDoc(docRef)).pipe(
      map((docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          return {
            id: docSnap.id,
            ...data,
            dataCadastro: data['dataCadastro']?.toDate(),
          } as Funcionario;
        } else {
          throw new Error('Funcionário não encontrado');
        }
      })
    );
  }

  buscarFuncionarios(termo: string): Observable<Funcionario[]> {
    return this.listarFuncionarios().pipe(
      map((funcionarios) =>
        funcionarios.filter(
          (funcionario) =>
            funcionario.nome.toLowerCase().includes(termo.toLowerCase()) ||
            funcionario.email.toLowerCase().includes(termo.toLowerCase()) ||
            funcionario.cpf.includes(termo) ||
            funcionario.cargo.toLowerCase().includes(termo.toLowerCase())
        )
      )
    );
  }

  atualizarFuncionario(
    id: string,
    funcionario: Partial<Funcionario>
  ): Observable<void> {
    const docRef = doc(db, this.collectionName, id);
    return from(updateDoc(docRef, funcionario));
  }

  deletarFuncionario(id: string): Observable<void> {
    const docRef = doc(db, this.collectionName, id);
    return from(deleteDoc(docRef));
  }

  buscarPorCpf(cpf: string): Observable<Funcionario[]> {
    const q = query(
      collection(db, this.collectionName),
      where('cpf', '==', cpf)
    );

    return from(getDocs(q)).pipe(
      map((querySnapshot) => {
        const funcionarios: Funcionario[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          funcionarios.push({
            id: doc.id,
            ...data,
            dataCadastro: data['dataCadastro']?.toDate(),
          } as Funcionario);
        });
        return funcionarios;
      })
    );
  }

  buscarPorEmail(email: string): Observable<Funcionario[]> {
    const q = query(
      collection(db, this.collectionName),
      where('email', '==', email)
    );

    return from(getDocs(q)).pipe(
      map((querySnapshot) => {
        const funcionários: Funcionario[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          funcionários.push({
            id: doc.id,
            ...data,
            dataCadastro: data['dataCadastro']?.toDate(),
          } as Funcionario);
        });
        return funcionários;
      })
    );
  }
}
