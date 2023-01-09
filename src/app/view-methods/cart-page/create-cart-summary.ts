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
function getPromoFound(promo: PromoHandler | null): string {
    const suggestedPromo = promo?.getSuggestedPromo() ?? null;
    const userKey = promo?.userPromo;
    const isUserKeyApplied = promo?.getPromoByPromoKey(userKey ?? '');

    if (suggestedPromo) {
        return `
        <div class="summary__suggested">
        <span class="summary__suggested-description">
            ${suggestedPromo.getFullDescription()}
        </span>
        ${isUserKeyApplied ? '' : `<button class="summary__add-promo">ADD</button>`}
        </div>
        `;
    }
    return '';
}
function getPromoApplied(promo: PromoHandler | null): string {
    const isAnyActiveCode = promo?.activeCodes.size;
    if (isAnyActiveCode) {
        return `
        <div class="summary__active-codes">
            ${getActivePromoList(promo).reduce((fullList, description) => {
                fullList = `${fullList}
                <div class="summary__code">
                    ${description}
                    <button class="summary__add-promo">DROP</button>
                </div>`;
                return fullList;
            }, '')}
        </div>
        `;
    }
    return '';
}
function getActivePromoList(promo: PromoHandler): string[] {
    const list: string[] = [];
    promo.activeCodes.forEach((key) => {
        list.push(promo.getPromoByPromoKey(key)?.getFullDescription() ?? '');
    });
    return list;
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
                    <h3 class="summary__promo-header">
                        Promo codes
                    </h3>
                    ${getPromoApplied(promo)}

                    <div class="summary__promo">
                        <input
                            type="search"
                            placeholder="Enter promo code"
                            class="summary__promo-input"
                            id="${EventTargetsIDEnum.PROMO}"
                            value="${promo?.userPromo}"
                        >
                    </div>
                    ${getPromoFound(promo)}
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
