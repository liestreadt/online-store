import { CURRENCY_SYMBOL, PAGES_HASH } from '../../constants/constants';
import { ModelData } from '../../intefaces/types';

export default function createHeader(modelData: Partial<ModelData>): string {
    return `
        <header class="header">
            <a href="${PAGES_HASH.store}" class="header__logo">
                <span class="header__logo-bag">
                    🛍
                </span>
                <h1 class="header__store-name">Online Store</h1>
            </a>
            <p class="header__total">
                Cart total: <span class="header__total-price">${CURRENCY_SYMBOL}${modelData.cart?.getTotalPrice()}</span>
            </p>
            <a href="${PAGES_HASH.cart}" class="header__goods-number">${modelData.cart?.getTotalAmount()}</a>
        </header>
    `;
}
