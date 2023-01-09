import Cart from '../../Cart';
import { CURRENCY_SYMBOL, PROMO_CODES } from '../../constants/constants';
import { EventTargetsIDEnum, ModelData } from '../../intefaces/types';
import { PromoHandler } from '../../Promo';

function getPriceBlock(cart: Cart, promo: PromoHandler | null): string {
    const isAnyActiveCode = promo?.activeCodes.size;
    const oldPriceModifier = isAnyActiveCode ? `summary__total_promo-applied` : '';
    return `<div class="summary__total ${oldPriceModifier}">
        Total price: <span class="summary__total-price">${CURRENCY_SYMBOL}${cart.getTotalPrice()}</span>
    </div>
    <div class="summary__total-new">
        ${
            isAnyActiveCode
                ? `Total price: <span class="summary__total-price">${CURRENCY_SYMBOL}${promo.promoPrice}</span>`
                : ''
        }
    </div>
    `;
}
function getPromoFound(): string {
    return '';
}
function getPromoApplied(): string {
    return '';
}

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
                ${getPriceBlock(cart, promo)}
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
                    ${getPromoFound()}
                    <div class="summary__example">
                        Test promo-codes: "${PROMO_CODES[0].promoKey}", "${PROMO_CODES[1].promoKey}"
                    </div>
                </div>
                <button class="summary__btn-buy" id="${EventTargetsIDEnum.BUY}">
                    Buy Now
                </button>
            </div>
        </sidebar>
    `;
}
