import Cart from '../../Cart';
import { CURRENCY_SYMBOL } from '../../constants/constants';
import { PromoHandler } from '../../Promo';

export class SummaryUpdater {
    promo: PromoHandler | null;
    cart: Cart | null;
    constructor(promo: PromoHandler | null, cart: Cart | null) {
        this.promo = promo;
        this.cart = cart;
    }
    getActivePromoList(promo: PromoHandler): string[] {
        const list: string[] = [];
        promo.activeCodes.forEach((key) => {
            list.push(promo.getPromoByPromoKey(key)?.getFullDescription() ?? '');
        });
        return list;
    }
    updateActiveCodes(): void {
        const activeCodeContainer = document.querySelector('.summary__active-codes');

        if (activeCodeContainer && this.promo) {
            activeCodeContainer.innerHTML = `
            ${this.getActivePromoList(this.promo).reduce((fullList, description) => {
                fullList = `${fullList}
                <div class="summary__code">
                    ${description}
                    <button class="summary__add-promo">DROP</button>
                </div>`;
                return fullList;
            }, '')}
            `;
        }
    }
    updateSuggested(): void {
        const suggestContainer = document.querySelector('.summary__suggested');
        if (suggestContainer && this.promo) {
            const suggestedPromo = this.promo.getSuggestedPromo();
            const userKey = this.promo.userPromo;
            const isActivePromoCode = this.promo.activeCodes.has(userKey);
            const isPromoCode = this.promo.checkKeyPromo(userKey);

            suggestContainer.innerHTML = `
            <span class="summary__suggested-description">
                ${suggestedPromo?.getFullDescription() ?? ''}
            </span>
            ${!isActivePromoCode && isPromoCode ? `<button class="summary__add-promo">ADD</button>` : ''}
            `;
        } else {
            console.error('no suggestContainer', suggestContainer, ' or\n this.promo', this.promo);
        }
    }
    updatePriceBlock() {
        if (this.promo && this.cart) {
            this.promo.initialPrice = this.cart.getTotalPrice();
        }
        const isAnyActiveCode = this.promo?.activeCodes.size;
        const oldPriceModifier = isAnyActiveCode ? `summary__total_promo-applied` : '';

        const oldPriceContainer = document.querySelector('.summary__total');
        const newPriceContainer = document.querySelector('.summary__total-new');

        if (oldPriceContainer) {
            oldPriceContainer.classList.add(oldPriceModifier);

            oldPriceContainer.innerHTML = `
            <div class="summary__total ${oldPriceModifier}">
                Total price: <span class="summary__total-price">${CURRENCY_SYMBOL}${this.cart?.getTotalPrice()}</span>
            </div>
            `;
        } else {
            console.error('no price container!');
        }
        console.log('this.promo?.promoPric', this.promo?.promoPrice);
        if (newPriceContainer) {
            newPriceContainer.innerHTML = `
            ${
                isAnyActiveCode
                    ? `Total price: <span class="summary__total-price">${CURRENCY_SYMBOL}${this.promo?.promoPrice}</span>`
                    : ''
            }
            `;
        } else {
            console.error('no new price container!');
        }
    }
}
