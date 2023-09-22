import { Router } from 'express';
import { postNewIssue } from '../controllers/issues';
import validarJWT from '../middlewares/validarJWT';
import { isAdmin } from '../middlewares/validateRol';
import { check } from 'express-validator';
import { collectbugs } from '../middlewares/collectbugs';

const router = Router();

router.post(
  '/',
  [
    validarJWT,
    isAdmin,
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('description', 'La descripcion es obligatoria').not().isEmpty(),
    check('priority', 'La prioridad es obligatoria').not().isEmpty(),

    collectbugs,
  ],
  postNewIssue
);

export default router;
