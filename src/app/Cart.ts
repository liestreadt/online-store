import { ProductCart, ProductDetail } from './intefaces/types';

class Cart {
    products: Map<string, ProductCart> | null;

    constructor() {
        this.products = null;
    }
    getTotalPrice() {
        if (!this.products) {
            return null;
        }
    }
    addProduct(product: ProductDetail): void {
        const productCart: ProductCart = {
            ...product,
            amount: 1,
            getProductPrice() {
                return this.price * this.discountPercentage * 0.01 * this.amount;
            },
        };
        this.products?.set(`${product.id}`, productCart);
    }
}

export default Cart;
