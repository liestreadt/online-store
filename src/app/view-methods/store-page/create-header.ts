import { PAGES_HASH } from '../../constants/constants';

export default function createHeader(): string {
    return `
        <header class="header">
            <a href="${PAGES_HASH.store}" class="header__logo">
                <span class="header__logo-bag">
                    🛍
                </span>
                <h1 class="header__store-name">Online Store</h1>
            </a>
            <p class="header__total">
                Cart total: <span class="header__total-price">€6,232.00</span>
            </p>
            <a href="${PAGES_HASH.cart}" class="header__goods-number">10</a>
        </header>
    `;
}
