import Cart from '../../Cart';
import { CURRENCY_SYMBOL, PROMO_ADD_ID } from '../../constants/constants';
import { PromoHandler } from '../../Promo';

export class SummaryUpdater {
    promo: PromoHandler | null;
    cart: Cart | null;
    constructor(promo: PromoHandler | null, cart: Cart | null) {
        this.promo = promo;
        this.cart = cart;
    }
    getActivePromoList(promo: PromoHandler): [string[], string[]] {
        const list: string[] = [];
        const keys: string[] = [];
        promo.activeCodes.forEach((key) => {
            list.push(promo.getPromoByPromoKey(key)?.getFullDescription() ?? '');
            keys.push(key);
        });
        return [list, keys];
    }
    updateActiveCodes(): void {
        const activeCodeContainer = document.querySelector('.summary__active-codes');
        if (activeCodeContainer && this.promo) {
            const [list, keys] = this.getActivePromoList(this.promo);
            activeCodeContainer.innerHTML = `
            ${list.reduce((fullList, description, index) => {
                const key = keys[index];
                fullList = `${fullList}
                <div class="summary__code">
                    ${description}
                    <button class="summary__drop-promo" data-promo-key="${key}">DROP</button>
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
            ${
                !isActivePromoCode && isPromoCode
                    ? `<button class="summary__add-promo" id="${PROMO_ADD_ID}">ADD</button>`
                    : ''
            }
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
        const oldPriceModifier = `summary__total_promo-applied`;

        const oldPriceContainer = document.querySelector('.summary__total');
        const newPriceContainer = document.querySelector('.summary__total-new');

        if (oldPriceContainer) {
            if (isAnyActiveCode) {
                oldPriceContainer.classList.add(oldPriceModifier);
            } else {
                oldPriceContainer.classList.remove(oldPriceModifier);
            }

            oldPriceContainer.innerHTML = `
                Total price: <span class="summary__total-price">${CURRENCY_SYMBOL}${this.cart?.getTotalPrice()}</span>
            `;
        } else {
            console.error('no price container!');
        }
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
    updateFieldsAndListeners() {
        this.updateActiveCodes();
        this.updatePriceBlock();
        this.updateSuggested();

        const addButton = document.querySelector(`#${PROMO_ADD_ID}`);
        addButton?.addEventListener('click', () => {
            this.promo?.addPromo(this.promo.userPromo);
            this.updateFieldsAndListeners();
        });

        const dropButtons = document.querySelectorAll('.summary__drop-promo');
        dropButtons.forEach((button) => {
            button.addEventListener('click', (event: Event) => {
                if (event.target instanceof HTMLButtonElement) {
                    const promoKey = event.target.dataset.promoKey;
                    promoKey && this.promo?.removePromo(promoKey);
                    this.updateFieldsAndListeners();
                }
            });
        });
    }
}
