import Cart from '../../Cart';
import { CURRENCY_SYMBOL, PROMO_CODES } from '../../constants/constants';
import { EventTargetsIDEnum, ModelData } from '../../intefaces/types';
import { PromoHandler } from '../../Promo';

export default function createCartSummary(modelData: Partial<ModelData>): string {
    const cart = modelData.cart ?? null;
    const promo = modelData.promo ?? null;
    const isEmptyCart = !cart || !cart.products.size;

    if (isEmptyCart) {
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
                    </div>
                    <div class="summary__total-new">
                    </div>
                </div>
                <div class="summary__right-side">
                    <h3 class="summary__promo-header">
                        Promo codes
                    </h3>
                    <div class="summary__active-codes">
                    </div>

                    <div class="summary__promo">
                        <input
                            type="search"
                            placeholder="Enter promo code"
                            class="summary__promo-input"
                            id="${EventTargetsIDEnum.PROMO}"
                            value="${promo?.userPromo}"
                        >
                    </div>
                    <div class="summary__suggested">
                    </div>
                    <div class="summary__example">
                        Test promo-codes: "${PROMO_CODES[0].promoKey}", "${PROMO_CODES[1].promoKey}"
                    </div>
                </div>
                <button id="${EventTargetsIDEnum.BUY}" class="summary__btn-buy" id="${EventTargetsIDEnum.BUY}">
                    Buy Now
                </button>
            </div>
        </sidebar>
    `;
}
