import { ProductRepository } from '../repository'

interface IProductService {
    productRepository: typeof ProductRepository
    getProducts(): any
}

class ProductService implements IProductService{
    productRepository: any

    constructor(productRepository){
        this.productRepository = productRepository
    }

    getProducts(){
        return this.productRepository.getProducts()
    }
}

export default ProductService;