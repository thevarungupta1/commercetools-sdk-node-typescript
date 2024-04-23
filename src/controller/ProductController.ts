import { Request, Response } from 'express';
import { ProductRepository } from '../repository';
import ResponseHandler from '../utlis/Response';
import { getOptions } from '../utlis/options';


class ProductController{
    constructor(){}

    async getProducts(req: Request, res: Response){
        const options = getOptions(req.header)
        const data = await new ProductRepository(options).getProducts();

        if(data.statusCode == 200){
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
}

export default ProductController;