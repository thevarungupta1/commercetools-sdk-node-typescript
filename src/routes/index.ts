import { Router } from 'express'
import product from './product';
import customer from './customer';

const router = Router();

router.use(product);
router.use(customer);

export default router;