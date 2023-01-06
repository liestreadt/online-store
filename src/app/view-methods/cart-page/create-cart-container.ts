import Cart from '../../Cart';
import createCartItem from './create-cart-item';

export default function createCartContainer(products: Cart['products'] | null): string {
    console.log('products.size', products, products?.size);
    if (!products || products.size === 0) {
        return `
        <section class="cart">
            <h2 class="cart__header header_empty">
                    Cart is Empty
            </h2>
        </section>`;
    }

    return `
        <section class="cart">
            <h2 class="cart__header header_small">
                <div class="cart__title">
                    Products In Cart
                </div>
                <div class="cart__amount">
                    Show by: <input class="cart__amount-num" type="number" min="0">
                </div>
                <div class="cart__pagination">
                    <div class="pagination-text">
                        Page:
                    </div>
                    <a class="pagination-left">
                        ←
                    </a>
                    <div class="pagination-current">
                        1
                    </div>
                    <a class="pagination-right">
                        →
                    </a>
                </div>
            </h2>
            <div class="cart__list">
                ${products.forEach((product) => {
                    createCartItem(product);
                })}
            </div>
        </section>
    `;
}
