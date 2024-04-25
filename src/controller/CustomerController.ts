import { Request, Response } from 'express'
import CustomerRepository from "../repository/CustomerRepository";
import ResponseHandler from "../utlis/Response";
import { getOptions } from "../utlis/options";

class CustomerController {
    constructor(){}


    async createCustomer(req: Request, res: Response){
        const options = getOptions(req.headers)
        const data = await new CustomerRepository(options).createCustomer(req.body)

        if(data?.statusCode == 201){
            return ResponseHandler.successResponse(
                res,
                data.statusCode || data.body.statusCode,
                data.message || data.body.message,
                data.body
            )
        }
        return ResponseHandler.errorResponse(
            res,
            data.statusCode || data.body.statusCode,
            data.message || data.body.message,
            data.body
        )
    }

    async getCustomer(req: Request, res: Response){
        const { email: username, password } = req.body
        const options = getOptions(req.headers, { username, password })
        const data = await new CustomerRepository(options).getCustomer(
            req.body,
            req.locals
        )

        if(data.statusCode == 200){
            data.body.token = data.body?.customer.id
            return ResponseHandler.successResponse(
                res,
                data.statusCode || data.body.statusCode,
                data.message || data.body.message,
                data.body
            )
        }
        return ResponseHandler.errorResponse(
            res,
            data.statusCode || data.body.statusCode,
            data.message || data.body.message,
            data.body
        )
    }

    async logoutCustomer(req: Request, res: Response){
        const { email: username, password } = req.body
        const options = getOptions(req.headers)
        const data = await new CustomerRepository(options).logoutCustomer()

        if(data == null){
            return ResponseHandler.successResponse(res, 200, 'user logout', data)
        }
        return ResponseHandler.errorResponse(
            res,
            data.statusCode || data.body.statusCode,
            data.message || data.body.message,
            data.body
        )
    }

}
export default CustomerController