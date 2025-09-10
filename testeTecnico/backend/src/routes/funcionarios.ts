import { Router } from 'express';
import { FuncionarioController } from '../controllers/FuncionarioController';

const router = Router();
const funcionarioController = new FuncionarioController();

router.get('/', funcionarioController.getAllFuncionarios);

router.get('/search', funcionarioController.searchFuncionarios);

router.get('/:id', funcionarioController.getFuncionarioById);

router.post('/', funcionarioController.createFuncionario);

router.put('/:id', funcionarioController.updateFuncionario);

router.delete('/:id', funcionarioController.deleteFuncionario);

export default router;
