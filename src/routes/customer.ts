import { Router } from 'express'
import { CustomerController } from '../controller'
import Validator from '../middleware/Validator';

const customerController = new CustomerController();

const router = Router();

const { createCustomer, getCustomer, logoutCustomer  } = customerController
const { validateLogin, validateSignup } = Validator;

function forwardID(req, res, next){
    res.locals.anonymousId = req.headers.token
    next()
}

router.post(
    '/login',
    validateLogin,
    forwardID,
    getCustomer.bind(customerController)
)
router.post(
    '/register',
    validateSignup,
    createCustomer.bind(customerController),
)

router.post('/logout', logoutCustomer.bind(customerController))

export default router;