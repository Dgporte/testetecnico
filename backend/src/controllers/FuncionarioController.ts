import { Request, Response } from "express";
import FuncionarioService from "../services/FuncionarioService";

export class FuncionarioController {
  getAllFuncionarios = (req: Request, res: Response) => {
    try {
      const funcionarios = FuncionarioService.getAllFuncionarios();
      res.json({
        success: true,
        data: funcionarios,
        total: funcionarios.length,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Erro interno do servidor",
        error: error instanceof Error ? error.message : "Erro desconhecido",
      });
    }
  };

  getFuncionarioById = (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const funcionario = FuncionarioService.getFuncionarioById(id);

      if (!funcionario) {
        return res.status(404).json({
          success: false,
          message: "Funcionário não encontrado",
        });
      }

      res.json({
        success: true,
        data: funcionario,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Erro interno do servidor",
        error: error instanceof Error ? error.message : "Erro desconhecido",
      });
    }
  };

  createFuncionario = (req: Request, res: Response) => {
    try {
      const funcionarioData = req.body;

      if (
        !funcionarioData.nome ||
        !funcionarioData.email ||
        !funcionarioData.cpf
      ) {
        return res.status(400).json({
          success: false,
          message: "Campos obrigatórios: nome, email, cpf",
        });
      }

      const novoFuncionario =
        FuncionarioService.createFuncionario(funcionarioData);

      res.status(201).json({
        success: true,
        message: "Funcionário criado com sucesso",
        data: novoFuncionario,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Erro interno do servidor",
        error: error instanceof Error ? error.message : "Erro desconhecido",
      });
    }
  };

  updateFuncionario = (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const funcionarioData = req.body;

      const funcionarioAtualizado = FuncionarioService.updateFuncionario(
        id,
        funcionarioData
      );

      if (!funcionarioAtualizado) {
        return res.status(404).json({
          success: false,
          message: "Funcionário não encontrado",
        });
      }

      res.json({
        success: true,
        message: "Funcionário atualizado com sucesso",
        data: funcionarioAtualizado,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Erro interno do servidor",
        error: error instanceof Error ? error.message : "Erro desconhecido",
      });
    }
  };

  deleteFuncionario = (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deletado = FuncionarioService.deleteFuncionario(id);

      if (!deletado) {
        return res.status(404).json({
          success: false,
          message: "Funcionário não encontrado",
        });
      }

      res.json({
        success: true,
        message: "Funcionário excluído com sucesso",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Erro interno do servidor",
        error: error instanceof Error ? error.message : "Erro desconhecido",
      });
    }
  };

  getFuncionariosByStatus = (req: Request, res: Response) => {
    try {
      const { ativo } = req.params;
      const isAtivo = ativo === "true";
      const funcionarios = FuncionarioService.getFuncionariosByStatus(isAtivo);

      res.json({
        success: true,
        data: funcionarios,
        total: funcionarios.length,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Erro interno do servidor",
        error: error instanceof Error ? error.message : "Erro desconhecido",
      });
    }
  };
}
