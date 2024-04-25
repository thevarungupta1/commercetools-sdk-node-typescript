import { error } from 'console';
import Client from '../client/Client';
import { ApiRoot } from '@commercetools/platform-sdk';

type CustomerData = {
    email: string
    password: string
    firstName: string
    lastName: string
    countryCode: string
    key: string
}

type ICustomerOptions = {
    anonymousId? : object
}

interface ICustomerRepository {
    apiRoot: ApiRoot,
    projectKey: string,
    createCustomerDraft(customerData: CustomerData): object
    createCustomer(customerData: CustomerData): any | never
    getCustomer({
        email, 
        password,
    }: {
        email: string
        password: string
    },
options: ICustomerOptions): any | never
}

class CustomerRepository implements ICustomerRepository{
    apiRoot: ApiRoot;
  projectKey: string;

  constructor(options) {
    const rootClient = new Client(options);
    this.apiRoot = rootClient.getApiRoot(
      rootClient.getClientFromOption(options)
    );
    this.projectKey = rootClient.getProjectKey();
  }

  createCustomerDraft(customerData: CustomerData): object {
      const { email, password, firstName, lastName, countryCode, key } = customerData 

      return{
        email,
        password,
        key,
        firstName,
        lastName,
        addresses: [
            {
                country: countryCode,
            }
        ],
        defaultShippingAddress: 0
      }
  }

  async createCustomer(customerData: CustomerData) {
      try{
        const customer = await this.apiRoot
            .withProjectKey({projectKey: this.projectKey})
            .customers()
            .post({
                body: this.createCustomerDraft(customerData)
            })
            .execute()

            return customer
      }catch(err){
        return err
      }
  }

  async getCustomer({ email, password, }, options) {
      try{
        const customer = await this.apiRoot
        .withProjectKey({projectKey: this.projectKey})
        .me()
        .login()
        .post({
            body:{
                email,
                password,
                updateProductData: true,
                anonymousId: options?.anonymousId,
                anonymousCartSignInMode: 'MergeWithExistingCustomerCart',
            }
        })
        .execute()

        return customer
      }catch(err){
        return err
      }
  }

  async logoutCustomer(){
    try{
        return null
    }catch(err){
        error
    }
  }
}



export default CustomerRepository;