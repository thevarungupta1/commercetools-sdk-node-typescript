import Client from "../client/Client";
import { ApiRoot } from "@commercetools/platform-sdk";

interface ICart {
  apiRoot: ApiRoot;
  projectKey: string;
  createCartFormCurrentCustomer(cartDraft): object;
  getActiveCart(): object;
}

type CartDraft = {
  currency: string;
  customerEmail?: string;
};

type MyCartUpdate = {
  version: number;
  actions: Array<MyCartUpdateAction>;
};

type MyCartUpdateAction = {
  readonly action: "addLineItem";
  readonly productId?: string;
  readonly variantId?: number;
  readonly quantity?: number;
};

type MyCartRemoveItem = {
  version: number;
  actions: Array<MyCartRemoveLineItemAction>;
};

type MyCartRemoveLineItemAction = {
  readonly action: "removeLineItem";
  readonly lineItemId: string;
  readonly quantity?: number;
};

class CartRepository implements ICart {
  apiRoot: ApiRoot;
  projectKey: string;

  constructor(options) {
    const rootClient = new Client(options);
    this.apiRoot = rootClient.getApiRoot(
      rootClient.getClientFromOption(options)
    );
    this.projectKey = rootClient.getProjectKey();
  }

  private createCustomerCartDraft(cartData){
    const { currency, customerEmail } = cartData

    return {
        currency,
        customerEmail
    }
  }

  async createCartForCurrentCustomer(cartDraft: CartDraft){
    try{
        const cart = await this.getActiveCart()
        if(cart?.statusCode == 200) return cart
        return this.apiRoot
        .withProjectKey({projectKey: this.projectKey})
        .me()
        .carts()
        .post({
            body: this.createCustomerCartDraft(cartDraft),
        })
        .execute()

    }catch(err){
        return err
    }
  }
  
  async getActiveCart(){
    try{
        const activeCart = await this.apiRoot
        .withProjectKey({projectKey: this.projectKey})
        .me()
        .activeCart()
        .get()
        .execute()

        return activeCart
    }
  }


}
