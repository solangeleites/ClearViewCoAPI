import { Router } from 'express';
import { login, register, verifyUser } from '../controllers/auth';
import { check } from 'express-validator';
import { collectbugs } from '../middlewares/collectbugs';
import { existeEmail } from '../helpers/validationsDB';

const router = Router();

router.post(
  '/register',
  [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check(
      'password',
      'La contraseña debe contener mínimo 8 caracteres'
    ).isLength({
      min: 8,
    }),
    // validacion custom
    check('email').custom(existeEmail),
    // middleware custom
    collectbugs,
  ],
  register
);

// patch xq se esta actualizando el usuario en la base de datos

router.patch(
  '/verify',
  [
    check('email', 'El email es requerido').isEmail(),
    check('code', 'El código de verificación es requerido').not().isEmpty(),
    collectbugs,
  ],
  verifyUser
);

router.post(
  '/login',
  check('email', 'El email es requerido').isEmail(),
  check('password', 'La contraseña es requerida').isLength({
    min: 8,
  }),
  collectbugs,
  login
);

export default router;
