import { Request, Response } from 'express';
import { FuncionarioService } from '../services/FuncionarioService';

export class FuncionarioController {
  private funcionarioService: FuncionarioService;

  constructor() {
    this.funcionarioService = new FuncionarioService();
  }

  getAllFuncionarios = (req: Request, res: Response): void => {
    try {
      const funcionarios = this.funcionarioService.getAllFuncionarios();
      res.json({
        success: true,
        data: funcionarios,
        total: funcionarios.length,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar funcionários',
        error: error instanceof Error ? error.message : 'Erro desconhecido',
      });
    }
  };

  getFuncionarioById = (req: Request, res: Response): void => {
    try {
      const { id } = req.params;
      const funcionario = this.funcionarioService.getFuncionarioById(id);

      if (!funcionario) {
        res.status(404).json({
          success: false,
          message: 'Funcionário não encontrado',
        });
        return;
      }

      res.json({
        success: true,
        data: funcionario,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar funcionário',
        error: error instanceof Error ? error.message : 'Erro desconhecido',
      });
    }
  };

  createFuncionario = (req: Request, res: Response): void => {
    try {
      const funcionario = this.funcionarioService.createFuncionario(req.body);

      res.status(201).json({
        success: true,
        message: 'Funcionário criado com sucesso',
        data: funcionario,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Erro ao criar funcionário',
        error: error instanceof Error ? error.message : 'Erro desconhecido',
      });
    }
  };

  updateFuncionario = (req: Request, res: Response): void => {
    try {
      const { id } = req.params;
      const funcionario = this.funcionarioService.updateFuncionario(
        id,
        req.body
      );

      if (!funcionario) {
        res.status(404).json({
          success: false,
          message: 'Funcionário não encontrado',
        });
        return;
      }

      res.json({
        success: true,
        message: 'Funcionário atualizado com sucesso',
        data: funcionario,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Erro ao atualizar funcionário',
        error: error instanceof Error ? error.message : 'Erro desconhecido',
      });
    }
  };

  deleteFuncionario = (req: Request, res: Response): void => {
    try {
      const { id } = req.params;
      const deleted = this.funcionarioService.deleteFuncionario(id);

      if (!deleted) {
        res.status(404).json({
          success: false,
          message: 'Funcionário não encontrado',
        });
        return;
      }

      res.json({
        success: true,
        message: 'Funcionário excluído com sucesso',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao excluir funcionário',
        error: error instanceof Error ? error.message : 'Erro desconhecido',
      });
    }
  };

  searchFuncionarios = (req: Request, res: Response): void => {
    try {
      const { q } = req.query;

      if (!q || typeof q !== 'string') {
        res.status(400).json({
          success: false,
          message: 'Parâmetro de busca é obrigatório',
        });
        return;
      }

      const funcionarios = this.funcionarioService.searchFuncionarios(q);

      res.json({
        success: true,
        data: funcionarios,
        total: funcionarios.length,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao pesquisar funcionários',
        error: error instanceof Error ? error.message : 'Erro desconhecido',
      });
    }
  };
}
