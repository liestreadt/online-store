import { ProductDetails } from '../../intefaces/types';
import createCartItem from './create-cart-item';

export default function createCartContainer(data: ProductDetails): string {
    return `
        <section class="cart">
            <h2 class="cart__header header_medium">
                <div class="cart__title">
                    Products In Cart
                </div>
                <div class="cart__amount">
                    Items in cart: <span class="cart__amount-num">2</span>
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
                ${createCartItem(data)}
            </div>
        </section>
    `;
}
