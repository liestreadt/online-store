import { CART_ID } from './constants/constants';
import { ProductCart, ProductDetail, ProductShort } from './intefaces/types';

class Cart {
    productsAll: ProductDetail[];
    products: Map<string, ProductCart>;
    saveList: ProductShort[];

    constructor(productsAll: ProductDetail[]) {
        this.productsAll = productsAll;
        this.products = new Map();
        this.saveList = [];
        this.restore();
    }
    restore(): void {
        const list = localStorage.getItem(CART_ID);
        if (list) {
            this.saveList = JSON.parse(list);
            this.saveList.forEach((info) => {
                const product = this.getProduct(info);
                if (product) {
                    this.products.set(`${info.id}`, product);
                }
            });
        } else {
            this.saveList = [];
        }
    }
    getProduct(info: ProductShort): ProductCart | null {
        const product: ProductDetail | null =
            this.productsAll.find((product) => {
                product.id === info.id;
            }) || null;
        if (product) {
            return {
                ...product,
                amount: info.amount,
                getProductTotalPrice() {
                    return this.price * this.amount;
                },
            };
        }
        return null;
    }
    save(): void {
        this.products.forEach((product) => {
            this.saveList.push({
                id: product.id,
                amount: product.amount,
            });
        });
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
        const productShort: ProductShort = {
            id: productCart.id,
            amount: productCart.amount,
        };
        this.products?.set(`${product.id}`, productCart);
        this.save();
    }
    increaseAmount(id: string): void {
        const product = this.products.get(id);
        if (product && product.stock < product.amount) {
            product.amount += 1;
            this.save();
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
        this.save();
    }
    drop(id: string): void {
        this.products.delete(id);
        this.save();
    }
    checkProductInCart(id: string): boolean {
        return this.products.has(id);
    }
}

export default Cart;
