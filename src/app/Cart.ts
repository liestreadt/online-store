import { CART_ID } from './constants/constants';
import { ProductCart, ProductDetail } from './intefaces/types';

class Cart {
    products: Map<string, ProductCart>;
    saveList: string | null;

    constructor() {
        this.products = new Map();
        this.saveList = null;
    }
    init() {
        const list = localStorage.getItem(CART_ID);
        if (list) {
            this.saveList = JSON.parse(list);
        }
    }
    save() {
        localStorage.setItem(CART_ID, JSON.stringify(this.saveList));
    }
    getTotalPrice(): number {
        let totalPrice = 0;
        this.products.forEach((product) => {
            totalPrice += product.getProductTotalPrice();
        });
        return totalPrice;
    }
    getTotalAmount(): number {
        let totalAmount = 0;
        this.products.forEach((product) => {
            totalAmount += product.amount;
        });
        return totalAmount;
    }
    addNew(product: ProductDetail): void {
        const productCart: ProductCart = {
            ...product,
            amount: 1,
            getProductTotalPrice() {
                return this.price * this.amount;
            },
        };
        this.products?.set(`${product.id}`, productCart);
    }
    increaseAmount(id: string): void {
        const product = this.products.get(id);
        if (product && product.stock < product.amount) {
            product.amount += 1;
        }
    }
    decreaseAmount(id: string): void {
        const product = this.products.get(id);
        if (product && product.amount > 1) {
            product.amount -= 1;
        }
        if (product && product.amount === 1) {
            this.drop(id);
        }
    }
    drop(id: string) {
        this.products.delete(id);
    }
    checkProductInCart(id: string): boolean {
        return this.products.has(id);
    }
}

export default Cart;
