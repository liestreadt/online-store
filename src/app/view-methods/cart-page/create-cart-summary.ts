import Cart from '../../Cart';
import { CURRENCY_SYMBOL } from '../../constants/constants';
import { EventTargetsIDEnum } from '../../intefaces/types';

export default function createCartSummary(cart: Cart): string {
    if (!cart.products.size) {
        return '';
    }
    return `
        <sidebar class="summary">
            <h2 class="summary__header">
                Summary
            </h2>
            <div class="summary__body">
                <div class="summary__left-side">
                    <div class="summary__amount">
                        Products in your cart: <span class="summary__prod-amount">${cart.getTotalAmount()}</span>
                    </div>
                    <div class="summary__total">
                        Total price: <span class="summary__total-price">${CURRENCY_SYMBOL}${cart.getTotalPrice()}</span>
                    </div>
                </div>
                <div class="summary__right-side">
                    <div class="summary__promo">
                        <input
                            type="search"
                            placeholder="Enter promo code"
                            class="summary__promo-input"
                            id="${EventTargetsIDEnum.PROMO}"
                        >
                    </div>
                    <div class="summary__example">
                        Test promo-codes: "rss", "epam"
                    </div>
                </div>
                <button id="${EventTargetsIDEnum.BUY}" class="summary__btn-buy" id="${EventTargetsIDEnum.BUY}">
                    Buy Now
                </button>
            </div>
        </sidebar>
    `;
}
