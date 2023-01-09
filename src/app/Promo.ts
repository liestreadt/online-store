import { PROMO_CODES, PROMO_ID } from './constants/constants';
import { PromoFields } from './intefaces/types';

class PromoCode implements PromoFields {
    promoKey: string;
    discount: number;
    description: string;

    constructor(code: PromoFields) {
        this.promoKey = code.promoKey;
        this.discount = code.discount;
        this.description = code.description;
    }
    getFullDescription() {
        return `${this.description} - ${this.discount}% `;
    }
}

export class PromoHandler {
    _initialPrice: number;
    avaliableCodes: PromoCode[];
    activeCodes: Set<string>;
    userPromo: string;
    constructor(initialPrice: number) {
        this._initialPrice = initialPrice;
        this.avaliableCodes = PROMO_CODES.map((promo) => {
            return new PromoCode(promo);
        });
        this.activeCodes = new Set();
        this.restore();
        this.userPromo = '';
    }
    getSuggestedPromo() {
        return this.getPromoByPromoKey(this.userPromo);
    }
    getPromoByPromoKey(key: string): PromoCode | null {
        return this.avaliableCodes.find((promo) => promo.promoKey === key) ?? null;
    }
    addPromo(promoKey: string) {
        this.activeCodes.add(promoKey);
        this.save();
    }
    removePromo(promoKey: string) {
        this.activeCodes.delete(promoKey);
        this.save();
    }
    set initialPrice(price: number) {
        this._initialPrice = price;
    }
    get initialPrice(): number {
        return this._initialPrice;
    }
    get promoPrice() {
        const totalDiscount = this.getTotalDiscount();
        return (this.initialPrice * (100 - totalDiscount)) / 100;
    }
    getTotalDiscount(): number {
        let totalDiscount = 0;
        this.activeCodes.forEach((key) => {
            const promo = this.getPromoByPromoKey(key);
            if (promo) {
                totalDiscount += promo.discount;
            }
        });
        return totalDiscount;
    }
    save(): void {
        const saveList: string[] = [];
        this.activeCodes.forEach((key) => {
            saveList.push(key);
        });
        localStorage.setItem(PROMO_ID, JSON.stringify(saveList));
    }
    restore(): void {
        let saveList: string[] = [];
        const list = localStorage.getItem(PROMO_ID);
        if (list) {
            saveList = JSON.parse(list);
            saveList.forEach((promoKey) => {
                this.activeCodes.add(promoKey);
            });
        } else {
            this.activeCodes = new Set();
        }
    }
}
