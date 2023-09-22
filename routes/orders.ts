import { Router } from 'express';
import { getOrdenes, createOrder } from '../controllers/orders';
import { collectbugs } from '../middlewares/collectbugs';
import validarJWT from '../middlewares/validarJWT';
import { isVerified } from '../middlewares/verificacion';
import { check } from 'express-validator';

const router = Router();

router.get('/', [validarJWT, collectbugs], getOrdenes);

router.post(
  '/',
  [
    validarJWT,
    isVerified,
    check('price', 'El precio es obligatorio').not().isEmpty(),

    check('shippingCost', 'El costo de envio es obligatorio').not().isEmpty(),

    check('total', 'El total es obligatorio').not().isEmpty(),

    check('shippingDetails', 'Los detalles de envio son obligatorios')
      .not()
      .isEmpty(),

    check('items', 'El array de productos son obligatorios').not().isEmpty(),

    collectbugs,
  ],
  createOrder
);

export default router;
