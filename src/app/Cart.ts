import { CART_ID } from './constants/constants';
import { ProductCart, ProductDetail, ProductShort } from './intefaces/types';

class Cart {
    productsAll: ProductDetail[] | null;
    products: Map<string, ProductCart>;

    constructor(productsAll: ProductDetail[] | null) {
        this.productsAll = productsAll;
        this.products = new Map();
        this.restore();
    }
    restore(): void {
        let saveList: ProductShort[] = [];
        const list = localStorage.getItem(CART_ID);
        if (list) {
            saveList = JSON.parse(list);
            saveList.forEach((info) => {
                const product = this.getProduct(info);
                if (product) {
                    this.products.set(`${info.id}`, product);
                }
            });
        }
    }
    getProduct(info: ProductShort): ProductCart | null {
        const product: ProductDetail | null =
            this.productsAll?.find((product) => {
                return product.id === info.id;
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
    private save(): void {
        const saveList: ProductShort[] = [];
        this.products.forEach((product) => {
            saveList.push({
                id: product.id,
                amount: product.amount,
            });
        });
        localStorage.setItem(CART_ID, JSON.stringify(saveList));
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
    addNew(id: string): void {
        const product: ProductDetail | null =
            this.productsAll?.find((product) => {
                return product.id === +id;
            }) || null;
        if (!product) {
            throw new Error('product ID is not find!');
        }
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
        if (product && product.stock > product.amount) {
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
