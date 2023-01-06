import Cart from '../../Cart';
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

    const maxPage = cart?.maxPage();
    const { limit, listPage } = cart?.showProperties;
    console.log('products.size', products, products?.size);
    console.log('maxPage', maxPage);

    return `
        <section class="cart">
            <h2 class="cart__header header_small">
                <div class="cart__title">
                    Products In Cart
                </div>
                <div class="cart__amount">
                    Show by: <input
                        class="cart__amount-num"
                        type="number"
                        min="1"
                        max="${maxPage ?? 1}"
                        value="${limit ?? 3}">
                </div>
                <div class="cart__pagination">
                    <div class="pagination-text">
                        Page:
                    </div>
                    <a class="pagination-left">
                        ←
                    </a>
                    <div class="pagination-current">
                        ${listPage}
                    </div>
                    <a class="pagination-right">
                        →
                    </a>
                </div>
            </h2>
            <div class="cart__list">
                ${createList(cart)}
            </div>
        </section>
    `;
}
