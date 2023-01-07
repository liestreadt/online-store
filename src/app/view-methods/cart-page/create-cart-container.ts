import Cart from '../../Cart';
import { EventTargetsIDEnum } from '../../intefaces/types';
import createCartItem from './create-cart-item';

function createList(cart: Cart): string {
    const productsToShow = cart.productsToShow;
    const list: string[] = [];

    if (!productsToShow) {
        return '';
    }
    productsToShow.forEach((product, index) => {
        list.push(createCartItem(product, index, cart));
    });
    return list.join('');
}
export default function createCartContainer(cart: Cart | null): string {
    const products = cart?.products;

    if (!cart || !products || products.size === 0) {
        return `
        <section class="cart">
            <h2 class="cart__header header_empty">
                    Cart is empty
            </h2>
        </section>`;
    }

    const { limit, listPage } = cart?.showProperties;

    return `
        <section class="cart">
            <h2 class="cart__header header_small">
                <div class="cart__title">
                    Products In Cart
                </div>
                <div class="cart__amount">
                    Show by: <input
                        class="cart__amount-num"
                        id="${EventTargetsIDEnum.LIST_LIMIT}"
                        type="number"
                        min="1"
                        max="${products?.size ?? 1}"
                        value="${limit ?? 3}">
                </div>
                <div class="cart__pagination">
                    <div class="pagination-text">
                        Page:
                    </div>
                    <a class="pagination-left" id="${EventTargetsIDEnum.PAGE_BACK}">
                        ←
                    </a>
                    <div class="pagination-current">
                        ${listPage}
                    </div>
                    <a class="pagination-right" id="${EventTargetsIDEnum.PAGE_FORWARD}">
                        →
                    </a>
                </div>
            </h2>
            <div class="cart__list" id="${EventTargetsIDEnum.CART_LIST}">
                ${createList(cart)}
            </div>
        </section>
    `;
}
